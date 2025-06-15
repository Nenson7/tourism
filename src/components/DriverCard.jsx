import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaStar, FaCar, FaLanguage } from 'react-icons/fa';
import Modal from './Modal';
import ImageGallery from './ImageGallery';

const DriverCard = ({ driver }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, photo, experience, vehicleType, rating, reviews, basePrice, routes, languages, certifications, description } = driver;

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
              <FaCar className="text-blue-400" />
              <span className="text-sm">{vehicleType}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {routes.slice(0, 2).map((route, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-1"
              >
                <FaCar className="text-green-500" />
                {route}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <FaCar className="text-green-500" />
              <span className="text-sm text-gray-600">Vehicle: {vehicleType}</span>
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
          <Modal onClose={() => setIsModalOpen(false)} size="lg">
            <div className="overflow-y-auto">
              <ImageGallery images={images} alt={name} />
              
              <div className="p-6 md:p-8">
                <h2 className="text-3xl font-bold mb-6">{name}</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-medium">{experience}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Vehicle Type</p>
                      <div className="flex items-center gap-2">
                        <FaCar className="text-blue-600" />
                        <span className="font-medium">{vehicleType}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-xl">
                    <FaStar className="text-yellow-400 w-8 h-8" />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">{rating}</span>
                        <span className="text-gray-500">({reviews} reviews)</span>
                      </div>
                      <p className="text-green-600 font-medium">Excellent</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
                      >
                        <FaLanguage />
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Routes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {routes.map((route, index) => (
                      <div key={index} className="flex items-center gap-2 bg-green-50 p-3 rounded-lg">
                        <FaCar className="text-green-600 w-5 h-5" />
                        <span className="text-sm">{route}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Certifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2 bg-yellow-50 p-3 rounded-lg">
                        <FaStar className="text-yellow-500 w-5 h-5" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">About</h3>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>

                <div className="flex items-center justify-end pt-6 border-t">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
                  >
                    Contact Driver
                  </motion.button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default DriverCard; 