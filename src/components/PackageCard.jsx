import { motion } from 'framer-motion'

const PackageCard = ({ package: pkg }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
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