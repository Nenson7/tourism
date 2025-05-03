import { motion } from 'framer-motion'
import { useState } from 'react'

const DestinationCard = ({ destination }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-80 overflow-hidden">
        <motion.img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: isHovered ? 0.8 : 0.6 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.h3 
            className="text-2xl font-bold text-white mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {destination.name}
          </motion.h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-white ml-1 font-medium">{destination.rating}</span>
            </div>
            <span className="text-white/70">({destination.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <motion.p 
          className="text-gray-600 mb-6 line-clamp-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {destination.description}
        </motion.p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            className="bg-gray-50 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-gray-500 mb-1">Altitude</p>
            <p className="font-medium text-gray-900">{destination.details.altitude}</p>
          </motion.div>
          <motion.div
            className="bg-gray-50 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-gray-500 mb-1">Best Season</p>
            <p className="font-medium text-gray-900">{destination.details.bestSeason}</p>
          </motion.div>
          <motion.div
            className="bg-gray-50 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm text-gray-500 mb-1">Distance</p>
            <p className="font-medium text-gray-900">{destination.details.distance}</p>
          </motion.div>
          <motion.div
            className="bg-gray-50 p-4 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-sm text-gray-500 mb-1">Price</p>
            <p className="font-medium text-gray-900">NPR {destination.price}</p>
          </motion.div>
        </div>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-[1.02]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </motion.button>

        {isExpanded && (
          <motion.div 
            className="mt-6 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-gray-50 p-4 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-semibold text-gray-900 mb-2">Attraction</h4>
              <p className="text-gray-600">{destination.details.attraction}</p>
            </motion.div>
            <motion.div
              className="bg-gray-50 p-4 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-semibold text-gray-900 mb-2">Significance</h4>
              <p className="text-gray-600">{destination.details.significance}</p>
            </motion.div>
            {destination.details.workers && (
              <motion.div
                className="bg-gray-50 p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="font-semibold text-gray-900 mb-2">Workers</h4>
                <p className="text-gray-600">{destination.details.workers}</p>
              </motion.div>
            )}
            {destination.details.production && (
              <motion.div
                className="bg-gray-50 p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="font-semibold text-gray-900 mb-2">Production</h4>
                <p className="text-gray-600">{destination.details.production}</p>
              </motion.div>
            )}
            {destination.details.impact && (
              <motion.div
                className="bg-gray-50 p-4 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="font-semibold text-gray-900 mb-2">Impact</h4>
                <p className="text-gray-600">{destination.details.impact}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default DestinationCard 