import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren",
      duration: 0.4,
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

const scrollIndicatorVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    y: [0, 10, 0],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      delay: 1.2,
      ease: "easeInOut"
    }
  }
}

// Hero images array
const heroImages = [
  '/static/ilam_tea_garden.jpg',
  '/static/ilam_tea_factory.jpg',
  '/static/maipokhari.jpg',
  '/static/sandakpur.jpg',
  '/static/panitar_tea_state.jpg',
  '/static/didi_bahini_jharna.jpg',
  '/static/gajurmukhi_devi_temple.jpg',
  '/static/maisthan_temple.jpg',
  '/static/seti_devi_temple.jpg',
  '/static/sukilumba_devithan.jpg',
  '/static/sukilumba_airport.jpg',
  '/static/gumba_danda.jpg',
  '/static/mangmalung.jpg',
  '/static/ilam_durbar.jpg',
  '/static/ratna_kumar.jpg',
  '/static/bhalu_dhunga.jpg',
  '/static/ilam_view_tower.jpg',
  '/static/narayanthan_temple.jpg',
  '/static/singhabahini.jpg',
  '/static/bouddha_park.jpg',
  '/static/mahabhir_rock_climbing.jpg',
  '/static/sanu_pathivara_temple.jpg',
  '/static/siddhithumka.jpg',
  '/static/sakela_tham.jpg',
  '/static/bhimsenthan.jpg',
  '/static/patenagi.jpg',
  '/static/shree_antu.jpg'
]

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
  }

  const handleExploreClick = () => {
    const destinationsSection = document.getElementById('featured-destinations')
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Hero Image Carousel */}
      <div className="absolute inset-0 bg-black">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -1000, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.5
            }}
            className="absolute inset-0"
          >
            <img 
              src={heroImages[currentImageIndex]}
              alt="Ilam Scenery"
              className="h-full w-full object-cover"
              onLoad={() => setIsLoading(false)}
            />
            {/* Blurred background for images that don't match viewport */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200 backdrop-blur-sm z-20"
          aria-label="Previous image"
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors duration-200 backdrop-blur-sm z-20"
          aria-label="Next image"
        >
          <FaChevronRight className="w-6 h-6" />
        </button>

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.span 
            className="mb-4 inline-block rounded-full bg-green-500/20 px-4 py-1 text-sm font-medium text-green-300"
            variants={itemVariants}
          >
            Welcome to Nepal's Tea Paradise
          </motion.span>
          <motion.h1 
            className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl"
            variants={itemVariants}
          >
            Visit Ilam
          </motion.h1>
          <motion.p 
            className="mb-8 text-lg text-gray-200 md:text-xl"
            variants={itemVariants}
          >
            Your Gateway to Nepal's Tea Paradise
          </motion.p>
          <motion.button
            onClick={handleExploreClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
            className="rounded-full bg-green-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-600 hover:shadow-lg"
          >
            Explore Destinations
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm">Scroll Down</span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}

export default Hero 