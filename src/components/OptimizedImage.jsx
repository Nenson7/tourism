import React, { useState, useEffect } from 'react';
import { generateImageSrcset, generateSizes } from '../utils/imageOptimization';

const OptimizedImage = ({ 
    src, 
    alt, 
    className = '', 
    sizes = null,
    loading = 'lazy',
    onLoad,
    onError,
    priority = false,
    ...props 
}) => {
    const [imageSrc, setImageSrc] = useState('');
    const [srcset, setSrcset] = useState({ webp: '', avif: '', original: '' });
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!src) return;

        // Generate optimized image paths and srcsets
        const generatedSrcset = generateImageSrcset(src);
        setSrcset(generatedSrcset);
        setImageSrc(src);
    }, [src]);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        setHasError(true);
        onError?.();
    };

    // Generate sizes attribute if not provided
    const sizesAttr = sizes || generateSizes({
        mobile: '100vw',
        tablet: '50vw',
        desktop: '33vw'
    });

    if (hasError) {
        return (
            <div className={`bg-gray-200 flex items-center justify-center ${className}`} {...props}>
                <span className="text-gray-500 text-sm">Image not available</span>
            </div>
        );
    }

    return (
        <picture className={className}>
            {/* AVIF format - best compression */}
            {srcset.avif && (
                <source
                    type="image/avif"
                    srcSet={srcset.avif}
                    sizes={sizesAttr}
                />
            )}
            
            {/* WebP format - good compression */}
            {srcset.webp && (
                <source
                    type="image/webp"
                    srcSet={srcset.webp}
                    sizes={sizesAttr}
                />
            )}
            
            {/* Original format as fallback */}
            <img
                src={imageSrc}
                alt={alt}
                className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                loading={priority ? 'eager' : loading}
                onLoad={handleLoad}
                onError={handleError}
                {...props}
            />
        </picture>
    );
};

export default OptimizedImage;