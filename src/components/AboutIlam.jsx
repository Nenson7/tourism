import { motion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import ilamProfileData from '../data/ilamProfile.json'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.15,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

const AboutIlam = () => {
  const [expandedSection, setExpandedSection] = useState(null)
  const { ilamProfile } = ilamProfileData
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <section id="about-ilam" className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{ilamProfile.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {ilamProfile.introduction}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Overview Section */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Overview</h3>
            <p className="text-gray-600 mb-4">{ilamProfile.overview.description}</p>
            <p className="text-gray-600 mb-4">{ilamProfile.overview.location}</p>
            <ul className="space-y-2">
              {ilamProfile.overview.characteristics.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Geography Section */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Geography</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Area</p>
                <p className="font-medium">{ilamProfile.geography.area}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Altitude</p>
                <p className="font-medium">{ilamProfile.geography.altitude}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Borders</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(ilamProfile.geography.borders).map(([direction, place]) => (
                  <div key={direction} className="bg-gray-50 p-2 rounded">
                    <p className="text-sm text-gray-500">{direction}</p>
                    <p className="font-medium">{place}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Biodiversity Section */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Biodiversity</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Birds</h4>
                <div className="flex flex-wrap gap-2">
                  {ilamProfile.biodiversity.birds.map((bird, index) => (
                    <span key={index} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                      {bird}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Animals</h4>
                <div className="flex flex-wrap gap-2">
                  {ilamProfile.biodiversity.animals.map((animal, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {animal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Economy Section */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Economy</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Main Crops</h4>
                <div className="flex flex-wrap gap-2">
                  {ilamProfile.economy.agriculture.mainCrops.map((crop, index) => (
                    <span key={index} className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Famous Products</h4>
                <div className="flex flex-wrap gap-2">
                  {ilamProfile.economy.products.famous.map((product, index) => (
                    <span key={index} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Culture Section */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Culture</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Ethnic Groups</h4>
                <div className="flex flex-wrap gap-2">
                  {ilamProfile.culture.ethnicGroups.map((group, index) => (
                    <span key={index} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">
                      {group}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Traditional Dances</h4>
                <div className="flex flex-wrap gap-2">
                  {ilamProfile.culture.dances.map((dance, index) => (
                    <span key={index} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">
                      {dance}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Attractions Section */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Attractions</h3>
            <div className="grid grid-cols-2 gap-4">
              {ilamProfile.attractions.map((attraction, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-gray-900">{attraction}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Conclusion Section */}
        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{ilamProfile.conclusion.tagline}</h3>
          <p className="text-xl text-gray-600 mb-6">{ilamProfile.conclusion.invitation}</p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{ilamProfile.conclusion.summary}</p>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutIlam 