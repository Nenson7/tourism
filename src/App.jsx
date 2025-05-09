/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { useState, useEffect, useMemo, useCallback } from 'react'
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
import Map from './components/Map'

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

function App() {
  const [destinations, setDestinations] = useState([])
  const [packages, setPackages] = useState([])
  const [ilamProfile, setIlamProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')

  // Memoized data transformation
  const transformedData = useMemo(() => {
    if (!destinationsData?.destinations || !packagesData?.packages || !servicesData?.services) {
      return { destinations: [], packages: [] };
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
    }));

    const transformedPackages = packagesData.packages.map(pkg => ({
      ...pkg,
      image: pkg.image || 'https://via.placeholder.com/400x300',
      price: parseInt(pkg.price) || 0,
      features: pkg.inclusions || [],
      isAuthenticated: false
    }));

    return { destinations: transformedDestinations, packages: transformedPackages };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setDestinations(transformedData.destinations);
        setPackages(transformedData.packages);
        setIlamProfile(ilamProfileData.ilamProfile);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again later.');
        setIsLoading(false);
      }
    };

    loadData();
  }, [transformedData]);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(throttle(() => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      setIsHeroVisible(rect.bottom > window.innerHeight * 0.2);
    }

    // Get all sections
    const sections = ['hero', 'about-ilam', 'featured-destinations', 'travel-packages', 'services', 'map', 'contact'];
    
    // Find the current section using Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
      }
    );

    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup observer
    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, 100), []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Memoized navigation click handler
  const handleNavClick = useCallback((e, section) => {
    e.preventDefault();
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section);
    }
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren"
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
    <div className="min-h-screen bg-gray-100">
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
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="section-title">Destinations</h2>
            <p className="section-subtitle">
              Explore the most beautiful places in Ilam
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      <Map />

      <section id="contact" className="section-padding">
        <Contact />
      </section>

      <Footer />
    </div>
  )
}

export default App
