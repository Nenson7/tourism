/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import destinationsData from './data/destinations.json'
import packagesData from './data/packages.json'
import servicesData from './data/services.json'
import ilamProfileData from './data/ilamProfile.json'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import AboutIlam from './components/AboutIlam'
import DestinationCard from './components/DestinationCard'
import PackageCard from './components/PackageCard'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [destinations, setDestinations] = useState([])
  const [packages, setPackages] = useState([])
  const [ilamProfile, setIlamProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!destinationsData?.destinations || !Array.isArray(destinationsData.destinations)) {
          throw new Error('Invalid destinations data structure')
        }
        if (!packagesData?.packages || !Array.isArray(packagesData.packages)) {
          throw new Error('Invalid packages data structure')
        }
        if (!servicesData?.services || !Array.isArray(servicesData.services)) {
          throw new Error('Invalid services data structure')
        }

        const transformedDestinations = destinationsData.destinations.map(dest => ({
          ...dest,
          image: dest.image || 'https://via.placeholder.com/400x300',
          price: parseInt(dest.price) || 0,
          rating: dest.rating || 4.5,
          reviews: dest.reviews || 0,
          details: dest.details || {
            altitude: 'N/A',
            bestSeason: 'All Seasons',
            address: 'Ilam',
            distance: 'N/A',
            attraction: dest.description,
            significance: 'A beautiful destination in Ilam'
          }
        }))

        const transformedPackages = packagesData.packages.map(pkg => ({
          ...pkg,
          image: pkg.image || 'https://via.placeholder.com/400x300',
          price: parseInt(pkg.price) || 0,
          features: pkg.inclusions || [],
          isAuthenticated: false
        }))

        setDestinations(transformedDestinations)
        setPackages(transformedPackages)
        setIlamProfile(ilamProfileData.ilamProfile)
        setIsLoading(false)
      } catch (err) {
        console.error('Error loading data:', err)
        setError('Failed to load data. Please try again later.')
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        setIsHeroVisible(rect.bottom > window.innerHeight * 0.2)
      }

      const sections = ['hero', 'about-ilam', 'featured-destinations', 'travel-packages', 'services', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, section) => {
    e.preventDefault()
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(section)
    }
  }

  const fadeInVariants = {
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation 
        isHeroVisible={isHeroVisible} 
        activeSection={activeSection} 
        handleNavClick={handleNavClick} 
      />
      
      <Hero />

      <AboutIlam />

      <section id="featured-destinations" className="section-padding">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            variants={fadeInVariants}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Destinations</h2>
            <p className="section-subtitle">
              Explore the most beautiful places in Ilam
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      <section id="travel-packages" className="section-padding bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            variants={fadeInVariants}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Travel Packages</h2>
            <p className="section-subtitle">
              Choose from our curated selection of travel packages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section-padding">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            variants={fadeInVariants}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              We provide comprehensive services for your Ilam experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.services.map((service) => (
              <motion.div 
                key={service.id}
                className="bg-white p-8 rounded-lg shadow-lg"
                initial="hidden"
                whileInView="visible"
                variants={fadeInVariants}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <i className={`fas ${service.icon} text-2xl text-green-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold">{service.currency} {service.price} {service.duration}</span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  )
}

export default App
