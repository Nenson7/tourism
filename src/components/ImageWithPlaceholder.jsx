import { useState } from 'react';
import { motion } from 'framer-motion';

const ImageWithPlaceholder = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const placeholderSrc = "https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=50";

  return (
    <div className="relative overflow-hidden">
      {/* Placeholder */}
      <motion.img
        src={placeholderSrc}
        alt=""
        className={`${className} blur-sm scale-110`}
        style={{ filter: 'blur(10px)', transform: 'scale(1.1)' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main Image */}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} absolute inset-0`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default ImageWithPlaceholder; 