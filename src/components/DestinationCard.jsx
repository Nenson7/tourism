import { motion, AnimatePresence } from 'framer-motion';
import { useState, memo, useCallback, useMemo } from 'react';
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaMountain, 
  FaInfoCircle, 
  FaUsers, 
  FaIndustry, 
  FaLeaf, 
  FaChevronLeft, 
  FaChevronRight,
  FaClock,
  FaMoneyBillWave,
  FaUserFriends,
  FaStar
} from 'react-icons/fa';
import ImageWithPlaceholder from './ImageWithPlaceholder';
import Modal from './Modal';
import ImageGallery from './ImageGallery';

// Motion variants for animations
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren"
    }
  }
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.98 }
};

// Default image if none provided
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=60';

const DestinationCard = memo(({ destination = {} }) => {
  // Provide default values for all required properties
  const {
    name = 'Destination',
    description = 'No description available',
    image = DEFAULT_IMAGE,
    details = {
      distance: 'Not specified',
      bestSeason: 'Any time',
      altitude: 'Not specified',
      significance: 'Not specified'
    },
    reviews = 0,
    rating = 0
  } = destination;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Create an array of images with similar alternatives if not provided
  const images = useMemo(() => {
    try {
      return [
        image,
        `https://images.unsplash.com/photo-${image.split('photo-')[1].split('?')[0]}?w=1280&h=720&q=80`,
        DEFAULT_IMAGE
      ];
    } catch (error) {
      return [image, DEFAULT_IMAGE, DEFAULT_IMAGE];
    }
  }, [image]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  return (
    <>
      <motion.div
        className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500 mt-1">{details.distance}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400 w-4 h-4" />
              <div>
                <p className="text-xs text-gray-500">Rating</p>
                <p className="text-sm font-medium flex items-center gap-1">
                  {rating} <span className="text-xs text-gray-500">({reviews} reviews)</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaMountain className="text-blue-400 w-4 h-4" />
              <div>
                <p className="text-xs text-gray-500">Altitude</p>
                <p className="text-sm font-medium">{details.altitude}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
              <div>
                <p className="text-xs text-gray-500">Distance</p>
                <p className="text-sm font-medium">{details.distance}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-purple-400 w-4 h-4" />
              <div>
                <p className="text-xs text-gray-500">Best Season</p>
                <p className="text-sm font-medium">{details.bestSeason}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-green-500" />
              <span className="text-sm text-gray-600">Best time: {details.bestSeason}</span>
            </div>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white text-sm sm:text-base rounded-full hover:bg-green-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </motion.div>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        destination={destination}
      />
    </>
  );
});

DestinationCard.displayName = 'DestinationCard';

export default DestinationCard; 