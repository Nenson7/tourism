import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaStar, FaLanguage, FaMapMarkerAlt, FaPhone, FaUser, FaTint, FaInfoCircle } from 'react-icons/fa';
import Modal from './Modal';
import ImageGallery from './ImageGallery';

const GuideCard = ({ guide }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, photo, address, contact, remarks, bloodGroup } = guide;

  // Create an array of images (in a real app, this would come from the API)
  const images = [photo, photo, photo];

  return (
    <>
      <motion.div
        className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Image Section */}
        <div className="relative h-72 sm:h-76 lg:h-80 overflow-hidden">
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-90"
          />
        </div>

        {/* Content Section */}
        <div className="p-3 sm:p-4">
          <div className="mb-2 sm:mb-3">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <FaUser className="text-green-600 w-3 h-3 sm:w-4 sm:h-4" />
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">{name}</h3>
            </div>
            
            <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500 w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-gray-600">{address}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <FaPhone className="text-green-500 w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-gray-600">{contact || 'Not available'}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <FaInfoCircle className="text-purple-500 w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-gray-600">{remarks}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <FaTint className="text-red-500 w-3 h-3 sm:w-3 sm:h-3 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-gray-600">Blood Group: {bloodGroup || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            guide={guide}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default GuideCard; 