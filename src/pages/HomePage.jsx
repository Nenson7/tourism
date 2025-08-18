import { motion } from 'framer-motion'
import { useState, useEffect, Suspense, lazy } from 'react'
import { useLocation } from 'react-router-dom'
import destinationsData from '../data/destinations.json'
import ilamProfileData from '../data/ilamProfile.json'
import Hero from '../components/Hero'
import AboutIlam from '../components/AboutIlam'
import DestinationCard from '../components/DestinationCard'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const LiveChat = lazy(() => import('../components/LiveChat'))

function HomePage() {
  const [destinations, setDestinations] = useState([])
  const [ilamProfile, setIlamProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const loadData = async () => {
      try {
        setDestinations(destinationsData.destinations);
        setIlamProfile(ilamProfileData.ilamProfile);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again later.');
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Scroll to section if hash is present in URL
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Wait for DOM to update
    } else {
      // Reset to top when no hash is present
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

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
      <main>
        <Hero />
        <section id="about-ilam" className="bg-white py-20 px-4">
          <AboutIlam />
        </section>

        {/* Featured Destinations Section */}
        <section id="featured-destinations" className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Featured Destinations
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the most beautiful and captivating places in Ilam, from scenic tea gardens to breathtaking mountain views.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-10 px-4 bg-white">
          <Contact />
        </section>
      </main>

      <Footer />
      <Suspense fallback={null}>
        <LiveChat />
      </Suspense>
    </div>
  )
}

export default HomePage 