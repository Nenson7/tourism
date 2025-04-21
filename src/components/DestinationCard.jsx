import PropTypes from 'prop-types'
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'

function DestinationCard({ image, title, description, price, index, isAuthenticated }) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.img 
        src={image} 
        alt={title} 
        className="w-full h-48 object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="p-6">
        <motion.h3 
          className="text-xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
        <div className="flex justify-between items-center">
          <motion.span 
            className="text-green-600 font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Rs {price}
          </motion.span>
          <motion.button 
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

DestinationCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default DestinationCard 