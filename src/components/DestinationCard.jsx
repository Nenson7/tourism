import { motion, AnimatePresence } from 'framer-motion';
import { useState, memo } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaMountain, FaInfoCircle, FaUsers, FaIndustry, FaLeaf, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ImageWithPlaceholder from './ImageWithPlaceholder';
import Modal from './Modal';

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

// Dummy images for slideshow (lower resolution)
const dummyImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=60',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=60',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=60',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=60'
];

const DestinationCard = memo(({ destination }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dummyImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + dummyImages.length) % dummyImages.length);
  };

  return (
    <>
      <motion.article
        className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col h-full"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="mb-3 text-xl font-bold text-gray-800" itemProp="name">{destination.name}</h3>

          {/* Description */}
          <p className="mb-4 text-gray-600 line-clamp-2" itemProp="description">
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
          <div className="mt-auto border-t border-gray-200 pt-4">
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-300"
              whileHover={imageHoverVariants.hover}
              whileTap={imageHoverVariants.tap}
            >
              Explore More
            </motion.button>
          </div>
        </div>
      </motion.article>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex w-[1000px] max-h-[700px]">
          {/* Left Side - Slideshow */}
          <div className="w-1/2">
            <div className="relative h-full min-h-[500px] rounded-l-2xl overflow-hidden">
              <ImageWithPlaceholder
                src={dummyImages[currentSlide]}
                alt={`${destination.name} - View ${currentSlide + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 transition-colors duration-300"
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 transition-colors duration-300"
              >
                <FaChevronRight size={20} />
              </button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {dummyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                      currentSlide === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="w-1/2 overflow-y-auto p-8">
            <h2 className="text-3xl font-bold text-gray-800">{destination.name}</h2>
            <p className="mt-3 text-gray-600 text-lg">{destination.description}</p>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-gray-50 p-4">
                <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <FaInfoCircle className="text-green-500" />
                  Attraction
                </h4>
                <p className="text-gray-600">{destination.details.attraction}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <FaIndustry className="text-blue-500" />
                  Significance
                </h4>
                <p className="text-gray-600">{destination.details.significance}</p>
              </div>

              {destination.details.workers && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <FaUsers className="text-purple-500" />
                    Workers
                  </h4>
                  <p className="text-gray-600">{destination.details.workers}</p>
                </div>
              )}

              {destination.details.production && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <FaLeaf className="text-yellow-500" />
                    Production
                  </h4>
                  <p className="text-gray-600">{destination.details.production}</p>
                </div>
              )}

              {destination.details.impact && (
                <div className="rounded-xl bg-gray-50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <FaInfoCircle className="text-red-500" />
                    Impact
                  </h4>
                  <p className="text-gray-600">{destination.details.impact}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
});

DestinationCard.displayName = 'DestinationCard';

export default DestinationCard; 