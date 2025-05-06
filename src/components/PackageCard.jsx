import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

const PackageCard = ({ package: pkg }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      variants={cardVariants}
    >
      <div className="relative h-48">
        <img 
          src={pkg.image} 
          alt={pkg.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
          <p className="text-white/80">{pkg.duration}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{pkg.description}</p>
        <div className="space-y-2 mb-4">
          {pkg.inclusions.map((inclusion, index) => (
            <div key={index} className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600">{inclusion}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-green-600 font-bold">NPR {pkg.price}</span>
          <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-300">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default PackageCard 