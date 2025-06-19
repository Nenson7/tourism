import { motion } from 'framer-motion'

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

const Hero = () => {
  const handleExploreClick = () => {
    const destinationsSection = document.getElementById('featured-destinations')
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img 
          src="/static/sandakpur.jpg"
          alt="Sandakpur Ilam"
          className="h-full w-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
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