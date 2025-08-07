import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import OptimizedImage from './OptimizedImage';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const modalVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 500
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 }
  }
};

const Modal = ({ isOpen, onClose, destination }) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!destination) return null;

  const {
    name,
    image,
    description,
    details,
    rating,
    reviews
  } = destination;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-[90rem] bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[95vh]"
            variants={modalVariants}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200 backdrop-blur-sm"
              aria-label="Close modal"
            >
              <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex flex-col lg:flex-row h-[95vh] lg:h-[90vh]">
              {/* Left side - Single Image */}
              <div className="lg:w-1/2 h-[35vh] sm:h-[40vh] lg:h-full">
                <div className="relative h-full w-full bg-gray-900">
                  <OptimizedImage
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Right side - Content */}
              <div className="lg:w-1/2 bg-gray-50 p-4 sm:p-6 md:p-8 overflow-y-auto">
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{name}</h2>
                  
                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm sm:text-base text-gray-600">
                      {rating} ({reviews} reviews)
                    </span>
                  </div>

                  {/* Key Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {Object.entries(details).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                        <p className="text-xs sm:text-sm text-gray-500 capitalize">{key}</p>
                        <p className="text-sm sm:text-base font-medium text-gray-900">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">About</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{description}</p>
                  </div>

                  {/* Additional Details */}
                  <div className="space-y-4 sm:space-y-6">
                    {Object.entries(details).slice(4).map(([key, value]) => (
                      <div key={key}>
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 capitalize">{key}</h4>
                        <p className="text-sm sm:text-base text-gray-600">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal; 