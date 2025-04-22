import React from 'react';
import { motion } from 'framer-motion';
import { FaMountain, FaLeaf, FaHandshake } from 'react-icons/fa';

const About = () => {
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
            About Ilam Tea Tourism
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover the rich heritage and natural beauty of Ilam through our sustainable tourism initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 text-indigo-600">
              <FaMountain className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600 text-center">
              To promote sustainable tourism in Ilam while preserving its natural beauty and cultural heritage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 text-indigo-600">
              <FaLeaf className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600 text-center">
              To make Ilam a premier destination for tea tourism and eco-friendly travel experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 text-indigo-600">
              <FaHandshake className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
              Our Values
            </h3>
            <p className="text-gray-600 text-center">
              We are committed to responsible tourism, community development, and environmental conservation.
            </p>
          </motion.div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
          <p className="text-gray-600 mb-4">
            Founded with a passion for showcasing the beauty of Ilam's tea gardens and natural landscapes,
            Ilam Tea Tourism has been providing unforgettable experiences to travelers from around the world.
            Our team of local experts and guides are dedicated to creating meaningful connections between
            visitors and the rich cultural heritage of our region.
          </p>
          <p className="text-gray-600">
            Through our sustainable tourism practices, we aim to support local communities while preserving
            the pristine environment that makes Ilam so special. Join us in exploring the wonders of Ilam
            while making a positive impact on the region and its people.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 