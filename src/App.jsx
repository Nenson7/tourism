/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import DestinationCard from './components/DestinationCard'
import PackageCard from './components/PackageCard'
import TeaCulture from './components/TeaCulture'
import destinationsData from './data/destinations.json'
import packagesData from './data/packages.json'
import servicesData from './data/services.json'

function App() {
  const [destinations, setDestinations] = useState([])
  const [packages, setPackages] = useState([])
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Validate data structure
        if (!destinationsData?.destinations || !Array.isArray(destinationsData.destinations)) {
          throw new Error('Invalid destinations data structure')
        }
        if (!packagesData?.packages || !Array.isArray(packagesData.packages)) {
          throw new Error('Invalid packages data structure')
        }
        if (!servicesData?.services || !Array.isArray(servicesData.services)) {
          throw new Error('Invalid services data structure')
        }

        // Transform data to match component props
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
        setIsLoading(false)
      } catch (err) {
        console.error('Error loading data:', err)
        setError('Failed to load data. Please try again later.')
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

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

  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      element.style.animation = 'none'
      element.offsetHeight
      element.style.animation = ''
    }
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        setIsHeroVisible(rect.top >= -100 && rect.bottom <= window.innerHeight + 100)
      }

      // Update active section based on scroll position
      const sections = ['hero', 'featured-destinations', 'travel-packages', 'services', 'about']
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
              {[
                { id: 'hero', label: 'Home' },
                { id: 'featured-destinations', label: 'Attractions' },
                { id: 'travel-packages', label: 'Packages' },
                { id: 'services', label: 'Services' },
                { id: 'about', label: 'About Ilam' },
                { id: 'footer', label: 'Contact' }
              ].map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`font-medium transition-colors duration-300 ${
                      isHeroVisible 
                        ? 'text-white hover:text-green-400' 
                        : 'text-gray-800 hover:text-green-600'
                    } ${activeSection === item.id ? 'text-green-600' : ''}`}
                  >
                    {item.label}
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
                  {[
                    { id: 'hero', label: 'Home' },
                    { id: 'featured-destinations', label: 'Attractions' },
                    { id: 'travel-packages', label: 'Packages' },
                    { id: 'services', label: 'Services' },
                    { id: 'about', label: 'About Ilam' },
                    { id: 'footer', label: 'Contact' }
                  ].map((item) => (
                    <li key={item.id}>
                      <a 
                        href={`#${item.id}`} 
                        onClick={(e) => {
                          handleNavClick(e, item.id)
                          setIsMenuOpen(false)
                        }}
                        className={`text-xl font-medium transition-colors duration-300 ${
                          isHeroVisible 
                            ? 'text-white hover:text-green-400' 
                            : 'text-gray-800 hover:text-green-600'
                        } ${activeSection === item.id ? 'text-green-600' : ''}`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </nav>
        </header>

        <main>
          <motion.section 
            id="hero" 
            className="h-screen bg-cover bg-center flex items-center justify-center text-center px-4 md:px-8 relative" 
            style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCX7bdtCH0MwZ0t1mLLxE4xAYEiGm8DUFdgA&s")'}}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="max-w-4xl px-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 text-white drop-shadow-lg">Discover Ilam, Nepal</h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-10 text-white drop-shadow">Experience the beauty of green tea gardens, misty mountains, and rich culture</p>
              <motion.button 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(null, 'featured-destinations')}
              >
                Explore Ilam
              </motion.button>
            </motion.div>
          </motion.section>

          <motion.section 
            id="tea-culture" 
            className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto bg-gray-50"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Tea Culture</h2>
            <TeaCulture 
              title="Ilam's Tea Heritage"
              description="Ilam is renowned for its tea production, with a history dating back to the 19th century. The region's unique climate and fertile soil create the perfect conditions for growing high-quality tea leaves."
              image="https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=800"
              facts={[
                "Ilam produces some of the finest organic tea in the world",
                "The tea gardens cover over 2,700 hectares of land",
                "Tea production is a major source of income for local communities",
                "The region hosts an annual tea festival celebrating its tea culture",
                "Ilam tea is known for its unique flavor and aroma"
              ]}
            />
          </motion.section>

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
                >
                  <DestinationCard {...destination} />
                </motion.div>
              ))}
            </div>
          </motion.section>

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
                >
                  <PackageCard {...package_} />
                </motion.div>
              ))}
            </div>
          </motion.section>

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
                  className="card"
                >
                  <div className="card-content">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 text-green-600">
                      <i className={`fas ${service.icon} text-2xl`}></i>
                    </div>
                    <h3 className="card-title text-center">{service.name}</h3>
                    <p className="card-description text-center">{service.description}</p>
                    <div className="text-center">
                      <span className="card-price">{service.price} {service.currency}</span>
                      <span className="text-gray-500 ml-2">/ {service.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            id="about" 
            className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto bg-gray-50"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gray-800">About Ilam</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <motion.div 
                className="space-y-4 sm:space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Ilam is a beautiful district in eastern Nepal, known for its tea gardens, natural beauty, and cultural heritage. The region produces some of the finest organic tea in the world, with lush green tea gardens covering the rolling hills.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Beyond tea, Ilam offers stunning views of the Himalayas, including Mt. Everest and Kanchenjunga, beautiful lakes like Mai Pokhari, and rich biodiversity with rare species of birds and plants.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  The local culture is vibrant, with traditional festivals, music, and cuisine that reflect the diverse ethnic groups living in the region.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="aspect-w-16 aspect-h-9"
              >
                <img 
                  src="https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Ilam Tea Gardens" 
                  className="rounded-xl shadow-xl w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </motion.section>
        </main>

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
                {[
                  { id: 'hero', label: 'Home' },
                  { id: 'featured-destinations', label: 'Attractions' },
                  { id: 'travel-packages', label: 'Packages' },
                  { id: 'services', label: 'Services' },
                  { id: 'about', label: 'About Ilam' },
                  { id: 'footer', label: 'Contact' }
                ].map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`} 
                      onClick={(e) => handleNavClick(e, item.id)}
                      className="hover:text-green-400 transition-colors"
                    >
                      {item.label}
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
