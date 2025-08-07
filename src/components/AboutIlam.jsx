import { motion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import ilamProfileData from '../data/ilamProfile.json'
import OptimizedImage from './OptimizedImage'

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
            className="bg-gray-50 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-8 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-shadow duration-300"
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
            className="bg-gray-50 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-8 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-shadow duration-300"
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

          {/* Seven A Image Section */}
          <motion.div
            className="col-span-1 lg:col-span-2"
            variants={itemVariants}
          >
            <div className="bg-gray-50 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-shadow duration-300">
              <OptimizedImage 
                src="/static/seven_a.png" 
                alt="Seven A Tea Garden" 
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutIlam  