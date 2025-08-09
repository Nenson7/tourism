import { motion } from 'framer-motion';
import { useState, memo } from 'react';
import Modal from './Modal';

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

const DestinationCard = memo(({ destination = {} }) => {
  // Provide default values for all required properties
  const {
    name = 'Destination',
    image = '/static/ilam_tea_garden.jpg',
    details = {
      bestSeason: 'Any time'
    }
  } = destination;

  const [isModalOpen, setIsModalOpen] = useState(false);

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
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-600 mr-4">Best time to visit: {details.bestSeason}</span>
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