import React from 'react';

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
    if (!src) {
        return (
            <div className={`bg-gray-200 flex items-center justify-center ${className}`} {...props}>
                <span className="text-gray-500 text-sm">No image provided</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading={priority ? 'eager' : loading}
            onLoad={onLoad}
            onError={onError}
            {...props}
        />
    );
};

export default OptimizedImage;