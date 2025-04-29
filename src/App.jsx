/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import DestinationCard from './components/DestinationCard'
import PackageCard from './components/PackageCard'
import TeaCulture from './components/TeaCulture'
import { useState, useEffect } from 'react'


function App() {
  const destinations = [
    {
      image: 'https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Mai Pokhari',
      description: 'A sacred lake surrounded by lush forests and beautiful rhododendron flowers.',
      price: 2500
    },
    {
      image: 'https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Antu Danda',
      description: 'Experience breathtaking sunrise views over the Himalayas and tea gardens.',
      price: 3000
    },
    {
      image: 'https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Sandakpur',
      description: 'Trek to the highest point in Ilam for panoramic views of Mt. Everest and Kanchenjunga.',
      price: 4500
    }
  ]

  const packages = [
    {
      image: 'https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Tea Garden Experience',
      description: 'Immerse yourself in Ilam\'s famous tea culture with this comprehensive package.',
      duration: '3 Days',
      price: 15000,
      features: [
        'Tea garden tour and tasting',
        'Traditional homestay accommodation',
        'Tea plucking experience',
        'Local guide',
        'Traditional meals'
      ]
    },
    {
      image: 'https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Ilam Heritage Trail',
      description: 'Explore the cultural heritage and natural beauty of Ilam.',
      duration: '5 Days',
      price: 25000,
      features: [
        'Visit to Mai Pokhari',
        'Antu Danda sunrise experience',
        'Cultural village tour',
        'Local guide',
        'Traditional accommodation'
      ]
    },
    {
      image: 'https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Himalayan Adventure',
      description: 'Trek through the beautiful landscapes of Ilam with stunning mountain views.',
      duration: '7 Days',
      price: 35000,
      features: [
        'Sandakpur trek',
        'Mountain guide',
        'Camping equipment',
        'All meals included',
        'Transportation'
      ]
    }
  ]

  const teaCulture = {
    title: "Ilam's Tea Heritage",
    description: "Ilam is renowned for producing some of the finest organic tea in the world. The region's unique climate, fertile soil, and traditional farming methods create tea with exceptional flavor and aroma. Tea cultivation in Ilam dates back to the 1860s when the British introduced tea plants to the region.",
    image: "https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=800",
    facts: [
      "Ilam produces over 2 million kg of tea annually",
      "The region has over 40 tea gardens covering thousands of hectares",
      "Ilam tea is known for its delicate flavor and golden color",
      "Most tea gardens are organic and follow sustainable farming practices",
      "Tea plucking is done by hand to ensure the highest quality leaves"
    ]
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
        duration: 0.5
      }
    }
  }

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Force animation to play by resetting the animation state
      element.style.animation = 'none';
      element.offsetHeight; // Trigger reflow
      element.style.animation = '';
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        setIsHeroVisible(rect.top >= -100 && rect.bottom <= window.innerHeight + 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      
      <motion.div 
        className="min-h-screen flex flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={containerVariants}
      >
        <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isHeroVisible ? '' : 'bg-gray-100 shadow-md'}`}>
          <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <motion.div 
              className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${isHeroVisible ? 'text-white' : 'text-gray-800'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Ilam Tea Tourism
            </motion.div>

            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden transition-colors duration-300 ${isHeroVisible ? 'text-white' : 'text-gray-800'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop Navigation */}
            <motion.ul 
              className="hidden md:flex gap-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <li><a href="#home" onClick={(e) => handleNavClick(e, 'hero')} className={`font-medium transition-colors duration-300 ${isHeroVisible ? 'text-white hover:text-green-400' : 'text-gray-800 hover:text-green-600'}`}>Home</a></li>
              <li><a href="#destinations" onClick={(e) => handleNavClick(e, 'featured-destinations')} className={`font-medium transition-colors duration-300 ${isHeroVisible ? 'text-white hover:text-green-400' : 'text-gray-800 hover:text-green-600'}`}>Attractions</a></li>
              <li><a href="#tea-culture" onClick={(e) => handleNavClick(e, 'tea-culture')} className={`font-medium transition-colors duration-300 ${isHeroVisible ? 'text-white hover:text-green-400' : 'text-gray-800 hover:text-green-600'}`}>Tea Culture</a></li>
              <li><a href="#packages" onClick={(e) => handleNavClick(e, 'travel-packages')} className={`font-medium transition-colors duration-300 ${isHeroVisible ? 'text-white hover:text-green-400' : 'text-gray-800 hover:text-green-600'}`}>Packages</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={`font-medium transition-colors duration-300 ${isHeroVisible ? 'text-white hover:text-green-400' : 'text-gray-800 hover:text-green-600'}`}>About Ilam</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, 'footer')} className={`font-medium transition-colors duration-300 ${isHeroVisible ? 'text-white hover:text-green-400' : 'text-gray-800 hover:text-green-600'}`}>Contact</a></li>
            </motion.ul>

            {/* Mobile Navigation */}
            <motion.div 
              className={`md:hidden fixed inset-0 ${isHeroVisible ? 'bg-transparent' : 'bg-white'} z-40 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
              initial={{ x: '100%' }}
              animate={{ x: isMenuOpen ? 0 : '100%' }}
            >
              <div className="flex flex-col h-full p-6">
                <button 
                  className="self-end mb-8"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <ul className="flex flex-col gap-6">
                  <li><a href="#home" onClick={(e) => {handleNavClick(e, 'hero'); setIsMenuOpen(false);}} className={`text-xl font-medium transition-colors duration-300 ${isHeroVisible ? 'text-white hover:text-green-400' : 'text-gray-800 hover:text-green-600'}`}>Home</a></li>
                  <li><a href="#destinations" onClick={(e) => {handleNavClick(e, 'featured-destinations'); setIsMenuOpen(false);}} className={`text-xl font-medium transition-colors duration-300 ${isHeroVisible ? 'text-white hover:text-green-400' : 'text-gray-800 hover:text-green-600'}`}>Attractions</a></li>
                  <li><a href="#tea-culture" onClick={(e) => {handleNavClick(e, 'tea-culture'); setIsMenuOpen(false);}} className={`text-xl font-medium transition-colors duration-300 ${isHeroVisible ? 'text-white hover:text-green-400' : 'text-gray-800 hover:text-green-600'}`}>Tea Culture</a></li>
                  <li><a href="#packages" onClick={(e) => {handleNavClick(e, 'travel-packages'); setIsMenuOpen(false);}} className={`text-xl font-medium transition-colors duration-300 ${isHeroVisible ? 'text-white hover:text-green-400' : 'text-gray-800 hover:text-green-600'}`}>Packages</a></li>
                  <li><a href="#about" onClick={(e) => {handleNavClick(e, 'about'); setIsMenuOpen(false);}} className={`text-xl font-medium transition-colors duration-300 ${isHeroVisible ? 'text-white hover:text-green-400' : 'text-gray-800 hover:text-green-600'}`}>About Ilam</a></li>
                  <li><a href="#contact" onClick={(e) => {handleNavClick(e, 'footer'); setIsMenuOpen(false);}} className={`text-xl font-medium transition-colors duration-300 ${isHeroVisible ? 'text-white hover:text-green-400' : 'text-gray-800 hover:text-green-600'}`}>Contact</a></li>
                </ul>
              </div>
            </motion.div>
          </nav>
        </header>

        <main>
          <motion.section 
            id="hero" 
            className="h-screen bg-cover bg-center flex items-center justify-center text-center px-4 md:px-8" 
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
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 text-white drop-shadow-lg">Discover Ilam, Nepal</h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-10 text-white drop-shadow">Experience the beauty of green tea gardens, misty mountains, and rich culture</p>
              <motion.button 
                className="px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
            <TeaCulture {...teaCulture} />
          </motion.section>

          <motion.section 
            id="featured-destinations" 
            className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto bg-gray-50"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Popular Attractions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
              {destinations.map((destination, index) => (
                <DestinationCard key={index} {...destination} index={index} />
              ))}
            </div>
          </motion.section>

          <motion.section 
            id="travel-packages" 
            className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto bg-gray-100"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gray-800">Travel Packages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
              {packages.map((package_, index) => (
                <PackageCard key={index} {...package_} index={index} />
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
                <img src="https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg?auto=compress&cs=tinysrgb&w=800" 
                     alt="Ilam Tea Gardens" 
                     className="rounded-xl shadow-xl w-full h-full object-cover" />
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
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ilam Tea Tourism</h3>
              <p>Your gateway to Nepal's tea paradise</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-green-400 transition-colors">Home</a></li>
                <li><a href="#destinations" className="hover:text-green-400 transition-colors">Attractions</a></li>
                <li><a href="#tea-culture" className="hover:text-green-400 transition-colors">Tea Culture</a></li>
                <li><a href="#packages" className="hover:text-green-400 transition-colors">Packages</a></li>
                <li><a href="#about" className="hover:text-green-400 transition-colors">About Ilam</a></li>
                <li><a href="#contact" className="hover:text-green-400 transition-colors">Contact</a></li>
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
