// Image optimization utility for generating responsive srcsets
export const generateImageSrcset = (originalSrc, sizes = [400, 800, 1280, 1920]) => {
    if (!originalSrc) return { webp: '', avif: '', original: '' };

    const basePath = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '');
    const extension = originalSrc.match(/\.(jpg|jpeg|png)$/i)?.[1]?.toLowerCase() || 'jpg';

    const srcset = sizes.map(size => {
        const webpPath = `${basePath}-${size}.webp`;
        const avifPath = `${basePath}-${size}.avif`;
        const originalPath = `${basePath}-${size}.${extension}`;
        
        return {
            webp: `${webpPath} ${size}w`,
            avif: `${avifPath} ${size}w`,
            original: `${originalPath} ${size}w`,
            size
        };
    });

    return {
        webp: srcset.map(s => s.webp).join(', '),
        avif: srcset.map(s => s.avif).join(', '),
        original: srcset.map(s => s.original).join(', ')
    };
};

// Generate sizes attribute for responsive images
export const generateSizes = (breakpoints = {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw'
}) => {
    return `(max-width: 768px) ${breakpoints.mobile}, (max-width: 1024px) ${breakpoints.tablet}, ${breakpoints.desktop}`;
};

// Check if browser supports WebP
export const supportsWebP = () => {
    return new Promise((resolve) => {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
            resolve(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
};

// Check if browser supports AVIF
export const supportsAVIF = () => {
    return new Promise((resolve) => {
        const avif = new Image();
        avif.onload = avif.onerror = () => {
            resolve(avif.height === 1);
        };
        avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    });
};

// Get optimal image format based on browser support
export const getOptimalFormat = async () => {
    const [webpSupported, avifSupported] = await Promise.all([
        supportsWebP(),
        supportsAVIF()
    ]);

    if (avifSupported) return 'avif';
    if (webpSupported) return 'webp';
    return 'original';
};

// Preload critical images
export const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};

// Batch preload images
export const preloadImages = async (imageUrls) => {
    const promises = imageUrls.map(url => preloadImage(url).catch(() => null));
    return Promise.all(promises);
}; 