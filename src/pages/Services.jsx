import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: "fa-utensils",
    title: "Tea Tasting",
    description: "Experience the finest organic tea from Ilam's famous tea gardens with guided tasting sessions."
  },
  {
    icon: "fa-hotel",
    title: "Accommodation",
    description: "Stay in comfortable homestays and hotels with stunning views of tea gardens and mountains."
  },
  {
    icon: "fa-hiking",
    title: "Trekking Tours",
    description: "Explore the beautiful landscapes of Ilam with guided trekking tours to various destinations."
  },
  {
    icon: "fa-car",
    title: "Transportation",
    description: "Reliable transportation services for all your travel needs within Ilam and surrounding areas."
  },
  {
    icon: "fa-camera",
    title: "Photography Tours",
    description: "Capture the beauty of Ilam with guided photography tours to the most picturesque locations."
  },
  {
    icon: "fa-map-marked-alt",
    title: "Guided Tours",
    description: "Expert local guides to help you explore and understand Ilam's culture and heritage."
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore the wide range of services we offer to make your Ilam experience unforgettable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 text-green-600">
                    <i className={`fas ${service.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Services; 