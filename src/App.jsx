/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import destinationsData from './data/destinations.json'
import packagesData from './data/packages.json'
import servicesData from './data/services.json'
import ilamProfileData from './data/ilamProfile.json'

function App() {
  const [destinations, setDestinations] = useState([])
  const [packages, setPackages] = useState([])
  const [services, setServices] = useState([])
  const [ilamProfile, setIlamProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
          isAuthenticated: false
        }))

        const transformedPackages = packagesData.packages.map(pkg => ({
          ...pkg,
          image: pkg.image || 'https://via.placeholder.com/400x300',
          price: parseInt(pkg.price) || 0,
          features: pkg.inclusions || [],
          isAuthenticated: false
        }))

        const transformedServices = servicesData.services.map(service => ({
          ...service,
          price: parseInt(service.price) || 0,
          icon: service.icon || 'fa-question'
        }))

        setDestinations(transformedDestinations)
        setPackages(transformedPackages)
        setServices(transformedServices)
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
        setIsHeroVisible(rect.top >= -100 && rect.bottom <= window.innerHeight + 100)
      }

      const sections = ['hero', 'about-ilam', 'featured-destinations', 'travel-packages', 'services', 'footer']
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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, sectionId) => {
    if (e) e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const sectionVariants = {
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
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <motion.div 
        className="min-h-screen flex flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={containerVariants}
      >
        {/* Navigation */}
        <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isHeroVisible ? '' : 'bg-white shadow-md'}`}>
          <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <motion.div 
              className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${isHeroVisible ? 'text-white' : 'text-gray-800'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Ilam Tea Tourism
            </motion.div>

            <button 
              className={`md:hidden transition-colors duration-300 ${isHeroVisible ? 'text-white' : 'text-gray-800'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            <motion.ul 
              className="hidden md:flex gap-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {['hero', 'about-ilam', 'featured-destinations', 'travel-packages', 'services', 'footer'].map((section) => (
                <li key={section}>
                  <a 
                    href={`#${section}`} 
                    onClick={(e) => handleNavClick(e, section)}
                    className={`font-medium transition-colors duration-300 ${
                      isHeroVisible 
                        ? 'text-white hover:text-green-400' 
                        : 'text-gray-800 hover:text-green-600'
                    } ${activeSection === section ? 'text-green-600 font-bold border-b-2 border-green-600' : ''}`}
                  >
                    {section === 'hero' ? 'Home' : 
                     section === 'about-ilam' ? 'About Ilam' :
                     section === 'featured-destinations' ? 'Attractions' :
                     section === 'travel-packages' ? 'Packages' :
                     section === 'services' ? 'Services' : 'Contact'}
                  </a>
                </li>
              ))}
            </motion.ul>

            <motion.div 
              className={`md:hidden fixed inset-0 ${isHeroVisible ? 'bg-transparent' : 'bg-white'} z-40 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
              initial={{ x: '100%' }}
              animate={{ x: isMenuOpen ? 0 : '100%' }}
            >
              <div className="flex flex-col h-full p-6">
                <button 
                  className="self-end mb-8"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <ul className="flex flex-col gap-6">
                  {['hero', 'about-ilam', 'featured-destinations', 'travel-packages', 'services', 'footer'].map((section) => (
                    <li key={section}>
                      <a 
                        href={`#${section}`} 
                        onClick={(e) => {
                          handleNavClick(e, section)
                          setIsMenuOpen(false)
                        }}
                        className={`text-xl font-medium transition-colors duration-300 ${
                          isHeroVisible 
                            ? 'text-white hover:text-green-400' 
                            : 'text-gray-800 hover:text-green-600'
                        } ${activeSection === section ? 'text-green-600 font-bold border-b-2 border-green-600' : ''}`}
                      >
                        {section === 'hero' ? 'Home' : 
                         section === 'about-ilam' ? 'About Ilam' :
                         section === 'featured-destinations' ? 'Attractions' :
                         section === 'travel-packages' ? 'Packages' :
                         section === 'services' ? 'Services' : 'Contact'}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <motion.section 
            id="hero" 
            className="relative h-screen flex items-center justify-center bg-gradient-to-b from-green-900 to-green-800 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Discover Ilam's Tea Paradise
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Experience the beauty of Nepal's tea capital
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <a 
                  href="#featured-destinations" 
                  onClick={(e) => handleNavClick(e, 'featured-destinations')}
                  className="inline-block px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Explore Now
                </a>
              </motion.div>
            </div>
          </motion.section>

          {/* About Ilam Section */}
          <motion.section 
            id="about-ilam" 
            className="py-16 px-4 sm:px-6 max-w-7xl mx-auto bg-gray-50"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gray-800">About Ilam</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div 
                className="space-y-6 text-gray-700"
                variants={sectionVariants}
              >
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">{ilamProfile?.introduction.title}</h3>
                  <p className="text-lg leading-relaxed">{ilamProfile?.introduction.description}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">Geography</h3>
                  <p className="text-lg leading-relaxed">
                    Ilam spans {ilamProfile?.geography.area} with altitudes ranging from {ilamProfile?.geography.altitude}. 
                    The district is bordered by {ilamProfile?.geography.borders.east} to the east, {ilamProfile?.geography.borders.west} to the west, 
                    {ilamProfile?.geography.borders.south} to the south, and {ilamProfile?.geography.borders.north} to the north.
                  </p>
                  <p className="text-lg leading-relaxed mt-4">
                    The Mai river and its tributaries ({ilamProfile?.geography.rivers.join(', ')}) flow through the district, 
                    earning it the nickname "Charkhola" (four-river junction).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">Climate</h3>
                  <p className="text-lg leading-relaxed">
                    Ilam enjoys a {ilamProfile?.climate.types.join(', ')} climate with an average rainfall of {ilamProfile?.climate.rainfall}. 
                    While {ilamProfile?.climate.bestSeasons.join(' and ')} are ideal for visiting, {ilamProfile?.climate.winter}.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="space-y-6 text-gray-700"
                variants={sectionVariants}
              >
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">Economy & Agriculture</h3>
                  <p className="text-lg leading-relaxed">
                    Ilam is renowned for its tea production, with {ilamProfile?.economy.agriculture.tea.history}. 
                    The region's {ilamProfile?.economy.agriculture.tea.quality} is complemented by its production of 
                    {ilamProfile?.economy.agriculture.crops.join(', ')} and various food crops.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">Culture & Heritage</h3>
                  <p className="text-lg leading-relaxed">
                    Ilam is home to diverse ethnic groups including {ilamProfile?.culture.ethnicGroups.slice(0, 5).join(', ')} and more. 
                    The district celebrates various traditional dances and festivals like {ilamProfile?.culture.festivals.join(', ')}.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold mb-4 text-green-700">Accessibility</h3>
                  <p className="text-lg leading-relaxed">
                    Ilam is accessible {ilamProfile?.accessibility.byAir} and by road via {ilamProfile?.accessibility.byRoad}. 
                    {ilamProfile?.accessibility.baseCamp} serves as the base camp for exploring the district's wonders.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Featured Destinations Section */}
          <motion.section 
            id="featured-destinations" 
            className="py-12 px-4 sm:px-6 max-w-7xl mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Popular Attractions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {destinations.map((destination) => (
                <motion.div
                  key={destination.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="card bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{destination.name}</h3>
                    <p className="text-gray-600 mb-4">{destination.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-green-600 font-bold">{destination.price} {destination.currency}</span>
                      <span className="text-gray-500">{destination.duration}</span>
                    </div>
                    <div className="space-y-2">
                      {destination.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Travel Packages Section */}
          <motion.section 
            id="travel-packages" 
            className="py-12 px-4 sm:px-6 max-w-7xl mx-auto bg-gray-50"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Travel Packages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {packages.map((package_) => (
                <motion.div
                  key={package_.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="card bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={package_.image} 
                      alt={package_.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{package_.name}</h3>
                    <p className="text-gray-600 mb-4">{package_.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-green-600 font-bold">{package_.price} {package_.currency}</span>
                      <span className="text-gray-500">{package_.duration}</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-700">Package Inclusions:</h4>
                      {package_.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <motion.button 
                      className="w-full mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Now
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Services Section */}
          <motion.section 
            id="services" 
            className="py-12 px-4 sm:px-6 max-w-7xl mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="card bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 text-green-600">
                      <i className={`fas ${service.icon} text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 text-center">{service.name}</h3>
                    <p className="text-gray-600 mb-4 text-center">{service.description}</p>
                    <div className="text-center">
                      <span className="text-green-600 font-bold">{service.price} {service.currency}</span>
                      <span className="text-gray-500 ml-2">/ {service.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>

        {/* Footer */}
        <motion.footer 
          className="bg-gray-800 text-white py-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ilam Tea Tourism</h3>
              <p>Your gateway to Nepal's tea paradise</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['hero', 'about-ilam', 'featured-destinations', 'travel-packages', 'services', 'footer'].map((section) => (
                  <li key={section}>
                    <a 
                      href={`#${section}`} 
                      onClick={(e) => handleNavClick(e, section)}
                      className="hover:text-green-400 transition-colors"
                    >
                      {section === 'hero' ? 'Home' : 
                       section === 'about-ilam' ? 'About Ilam' :
                       section === 'featured-destinations' ? 'Attractions' :
                       section === 'travel-packages' ? 'Packages' :
                       section === 'services' ? 'Services' : 'Contact'}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p>Email: info@ilamteatourism.com</p>
              <p>Phone: +977 27 520 123</p>
              <p>Address: Ilam Bazaar, Ilam, Nepal</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-8 mt-8 pt-8 border-t border-green-600">
            <p className="text-center">&copy; 2024 Ilam Tea Tourism. All rights reserved.</p>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  )
}

export default App
