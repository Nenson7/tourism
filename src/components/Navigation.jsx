import { motion } from 'framer-motion'
import { useState } from 'react'

const Navigation = ({ isHeroVisible, activeSection, handleNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
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
  )
}

export default Navigation 