import PropTypes from 'prop-types'
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'

function DestinationCard({ image, title, description, price, isAuthenticated }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      className="card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div 
        className="relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src={image} 
          alt={title} 
          className="card-image"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
      
      <motion.div 
        className="card-content"
        variants={contentVariants}
      >
        <motion.h3 
          className="card-title"
          variants={itemVariants}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="card-description"
          variants={itemVariants}
        >
          {description}
        </motion.p>
        <motion.div 
          className="flex justify-between items-center"
          variants={itemVariants}
        >
          <span className="card-price">Rs {price}</span>
          <motion.button 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

DestinationCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

export default DestinationCard 