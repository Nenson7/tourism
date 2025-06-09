import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaStar, FaLanguage, FaCertificate } from 'react-icons/fa';
import Modal from './Modal';
import ImageGallery from './ImageGallery';

const GuideCard = ({ guide }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, photo, experience, languages, rating, reviews, basePrice, specialties, certifications, description } = guide;

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
        <div className="relative h-[32rem] overflow-hidden">
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-3xl font-bold mb-3">{name}</h3>
              <div className="flex items-center gap-4 mb-3 text-white/90">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span>{rating}</span>
                  <span className="text-sm">({reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaLanguage className="text-blue-400" />
                  <span>{languages[0]}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {specialties.slice(0, 2).map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
                <div className="text-white font-medium">
                  <FaLanguage className="inline-block mr-2 text-blue-400" />
                  {languages[0]}, {languages[1]}
                </div>
              </div>
            </div>
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
                      <p className="text-sm text-gray-500">Languages</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {languages.map((lang, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1"
                          >
                            <FaLanguage />
                            {lang}
                          </span>
                        ))}
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
                  <h3 className="text-xl font-semibold mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3">Certifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2 bg-yellow-50 p-3 rounded-lg">
                        <FaCertificate className="text-yellow-500 w-5 h-5" />
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
                    Contact Guide
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

export default GuideCard; 