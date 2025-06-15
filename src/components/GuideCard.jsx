import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaStar, FaLanguage, FaMapMarkerAlt } from 'react-icons/fa';
import Modal from './Modal';
import ImageGallery from './ImageGallery';

const GuideCard = ({ guide }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, photo, experience, languages, rating, reviews, specialties, certifications, description } = guide;

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
        <div className="relative h-64 overflow-hidden">
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500 mt-1">Experience: {experience}</p>
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="text-sm">{rating}</span>
              <span className="text-xs text-gray-500">({reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <FaLanguage className="text-blue-400" />
              <span className="text-sm">{languages[0]}, {languages[1]}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {specialties.slice(0, 2).map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-1"
              >
                <FaMapMarkerAlt className="text-green-500" />
                {specialty}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <FaLanguage className="text-green-500" />
              <span className="text-sm text-gray-600">Languages: {languages[0]}, {languages[1]}</span>
            </div>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
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