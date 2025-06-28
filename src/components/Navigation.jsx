import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import iconLogo from '/logo.png'

const Navigation = ({ isHeroVisible, activeSection, handleNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const homeSections = [
    { id: 'hero', label: 'Home' },
    { id: 'about-ilam', label: 'About Ilam' },
    { id: 'featured-destinations', label: 'Destinations' },
    { id: 'map', label: 'Map' },
    { id: 'contact', label: 'Contact' }
  ]

  const routeSections = [
    { path: '/guides', label: 'Guides' },
    { path: '/porters', label: 'Porters' },
    { path: '/drivers', label: 'Drivers' }
  ]

  // Helper for section navigation
  const handleSectionNav = (e, id) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Already on home, just scroll
      handleNavClick(e, id)
    } else {
      // Navigate to home and scroll after navigation
      navigate(`/#${id}`)
      setIsMenuOpen(false)
    }
  }

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isHeroVisible ? 'backdrop-blur-sm' : 'bg-white shadow-md'}`}>
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${isHeroVisible ? 'text-white' : 'text-gray-800'}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="hover:text-green-600 transition-colors">
            Visit Ilam
          </Link>
        </motion.div>

        <button
          className={`md:hidden transition-colors duration-300 ${isHeroVisible ? 'text-white' : 'text-gray-800'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-md`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
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
          className="hidden md:flex gap-6 items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Section links (scroll) */}
          {homeSections.map(({ id, label }) => (
            <li key={id}>
              <Link
                to={`/#${id}`}
                onClick={e => handleSectionNav(e, id)}
                className={`font-medium transition-colors duration-300 ${isHeroVisible
                  ? 'text-white hover:text-green-300'
                  : 'text-gray-800 hover:text-green-600'
                  } ${activeSection === id ? 'text-green-600 font-bold border-b-2 border-green-600' : ''}`}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
          {/* Route links (distinct style) */}
          {routeSections.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`ml-2 px-4 py-2 rounded font-semibold transition-colors duration-300 border border-green-600 ${location.pathname === path
                  ? 'bg-green-600 text-white'
                  : isHeroVisible
                    ? 'bg-white/10 text-white hover:bg-green-600 hover:text-white'
                    : 'bg-white text-green-600 hover:bg-green-600 hover:text-white'
                  }`}
                aria-current={location.pathname === path ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </motion.ul>

        <motion.div
          className={`md:hidden fixed inset-0 ${isHeroVisible ? 'bg-black/20 backdrop-blur-sm' : 'bg-white'} z-40 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out ${!isMenuOpen ? 'pointer-events-none' : ''}`}
          initial={{ x: '100%' }}
          animate={{ x: isMenuOpen ? 0 : '100%' }}
        >
          <div className="flex flex-col h-full p-6">
            <button
              className={`self-end mb-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-md ${isHeroVisible ? 'text-white' : 'text-gray-800'}`}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="flex flex-col gap-6">
              {/* Section links (scroll) */}
              {homeSections.map(({ id, label }) => (
                <li key={id}>
                  <Link
                    to={`/#${id}`}
                    onClick={e => { handleSectionNav(e, id); setIsMenuOpen(false); }}
                    className={`text-xl font-medium transition-colors duration-300 ${isHeroVisible
                      ? 'text-white hover:text-green-300'
                      : 'text-gray-800 hover:text-green-600'
                      } ${activeSection === id ? 'text-green-600 font-bold border-b-2 border-green-600' : ''}`}
                    aria-current={activeSection === id ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              {/* Route links (distinct style) */}
              {routeSections.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`mt-2 px-4 py-2 rounded font-semibold transition-colors duration-300 border border-green-600 ${location.pathname === path
                      ? 'bg-green-600 text-white'
                      : isHeroVisible
                        ? 'bg-white/10 text-white hover:bg-green-600 hover:text-white'
                        : 'bg-white text-green-600 hover:bg-green-600 hover:text-white'
                      }`}
                    aria-current={location.pathname === path ? 'page' : undefined}
                  >
                    {label}
                  </Link>
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