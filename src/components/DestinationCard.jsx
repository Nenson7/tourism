import { motion, AnimatePresence } from 'framer-motion';
import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaMountain, FaInfoCircle, FaUsers, FaIndustry, FaLeaf } from 'react-icons/fa';
import ImageWithPlaceholder from './ImageWithPlaceholder';

// Motion variants moved outside component
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

const imageHoverVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.98 }
};

const expandVariants = {
  initial: { height: 0, opacity: 0 },
  animate: { 
    height: 'auto', 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { 
    height: 0, 
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const DestinationCard = memo(({ destination }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
      initial="hidden"
      whileInView="visible"
      variants={cardVariants}
      viewport={{ once: true, amount: 0.2 }}
      itemScope
      itemType="https://schema.org/TouristAttraction"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithPlaceholder
          src={destination.image}
          alt={`${destination.name} - ${destination.description}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={imageHoverVariants.hover}
          whileTap={imageHoverVariants.tap}
          transition={{ duration: 0.3 }}
          itemProp="image"
        />
        {/* Price Tag */}
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-sm font-semibold text-gray-800 shadow-md">
          NPR {destination.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="mb-3 flex items-start justify-between">
          <h3 className="text-lg font-bold text-gray-800" itemProp="name">{destination.name}</h3>
          <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5">
            <FaStar className="text-yellow-400 text-sm" />
            <span className="text-sm font-semibold text-gray-700" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
              <span itemProp="ratingValue">{destination.rating}</span>
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mb-3 line-clamp-2 text-base text-gray-600" itemProp="description">
          {destination.description}
        </p>

        {/* Details Grid */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-1.5 text-gray-600">
            <FaMapMarkerAlt className="text-green-500 text-sm" />
            <span className="text-sm" itemProp="address">{destination.details.distance}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <FaCalendarAlt className="text-blue-500 text-sm" />
            <span className="text-sm" itemProp="season">{destination.details.bestSeason}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <FaMountain className="text-purple-500 text-sm" />
            <span className="text-sm" itemProp="elevation">{destination.details.altitude}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <span className="text-sm" itemProp="reviewCount">{destination.reviews} reviews</span>
          </div>
        </div>

        {/* Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="block w-full rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 text-center text-base font-semibold text-white transition-all duration-300 hover:from-green-600 hover:to-green-700"
          whileHover={imageHoverVariants.hover}
          whileTap={imageHoverVariants.tap}
          aria-expanded={isExpanded}
          aria-controls={`destination-${destination.id}-details`}
        >
          {isExpanded ? 'Show Less' : 'Explore More'}
        </motion.button>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={expandVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-3"
            >
              <div className="rounded-lg bg-gray-50 p-3">
                <h4 className="mb-1.5 flex items-center gap-1.5 text-base font-semibold text-gray-800">
                  <FaInfoCircle className="text-green-500 text-sm" />
                  Attraction
                </h4>
                <p className="text-sm text-gray-600">{destination.details.attraction}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-3">
                <h4 className="mb-1.5 flex items-center gap-1.5 text-base font-semibold text-gray-800">
                  <FaIndustry className="text-blue-500 text-sm" />
                  Significance
                </h4>
                <p className="text-sm text-gray-600">{destination.details.significance}</p>
              </div>

              {destination.details.workers && (
                <div className="rounded-lg bg-gray-50 p-3">
                  <h4 className="mb-1.5 flex items-center gap-1.5 text-base font-semibold text-gray-800">
                    <FaUsers className="text-purple-500 text-sm" />
                    Workers
                  </h4>
                  <p className="text-sm text-gray-600">{destination.details.workers}</p>
                </div>
              )}

              {destination.details.production && (
                <div className="rounded-lg bg-gray-50 p-3">
                  <h4 className="mb-1.5 flex items-center gap-1.5 text-base font-semibold text-gray-800">
                    <FaLeaf className="text-yellow-500 text-sm" />
                    Production
                  </h4>
                  <p className="text-sm text-gray-600">{destination.details.production}</p>
                </div>
              )}

              {destination.details.impact && (
                <div className="rounded-lg bg-gray-50 p-3">
                  <h4 className="mb-1.5 flex items-center gap-1.5 text-base font-semibold text-gray-800">
                    <FaInfoCircle className="text-red-500 text-sm" />
                    Impact
                  </h4>
                  <p className="text-sm text-gray-600">{destination.details.impact}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
});

DestinationCard.displayName = 'DestinationCard';

export default DestinationCard; 