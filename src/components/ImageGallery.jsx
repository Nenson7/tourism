import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ImageWithPlaceholder from './ImageWithPlaceholder';

const ImageGallery = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImages, setFailedImages] = useState(new Set());

  const nextImage = () => {
    const nextIdx = (currentIndex + 1) % images.length;
    if (failedImages.has(nextIdx)) {
      // Skip failed images
      if (failedImages.size < images.length) {
        setCurrentIndex((prev) => (prev + 2) % images.length);
      }
    } else {
      setCurrentIndex(nextIdx);
    }
  };

  const prevImage = () => {
    const prevIdx = (currentIndex - 1 + images.length) % images.length;
    if (failedImages.has(prevIdx)) {
      // Skip failed images
      if (failedImages.size < images.length) {
        setCurrentIndex((prev) => (prev - 2 + images.length) % images.length);
      }
    } else {
      setCurrentIndex(prevIdx);
    }
  };

  const handleImageError = () => {
    setFailedImages(prev => new Set([...prev, currentIndex]));
    if (failedImages.size < images.length - 1) {
      nextImage();
    }
  };

  // Filter out failed images for the dots
  const validImages = images.filter((_, index) => !failedImages.has(index));

  return (
    <div className="relative w-full h-full bg-gray-900">
      <ImageWithPlaceholder
        key={currentIndex}
        src={images[currentIndex]}
        alt={`${alt} - Image ${currentIndex + 1}`}
        className="w-full h-full object-cover"
        onError={handleImageError}
      />
      
      {validImages.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200"
            aria-label="Previous image"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200"
            aria-label="Next image"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageGallery; 