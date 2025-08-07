// Image optimization utility for generating responsive srcsets
export const generateImageSrcset = (originalSrc, sizes = [400, 800, 1280, 1920]) => {
    if (!originalSrc) return { webp: '', avif: '', original: '' };

    // Handle both absolute and relative paths
    const normalizedSrc = originalSrc.startsWith('/') ? originalSrc : `/${originalSrc}`;
    const basePath = normalizedSrc.replace(/\.(jpg|jpeg|png)$/i, '');
    const extension = normalizedSrc.match(/\.(jpg|jpeg|png)$/i)?.[1]?.toLowerCase() || 'jpg';

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