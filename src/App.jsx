/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import destinationsData from './data/destinations.json'
import ilamProfileData from './data/ilamProfile.json'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import AboutIlam from './components/AboutIlam'
import DestinationCard from './components/DestinationCard'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Map from './components/Map'
import GuideCard from './components/GuideCard'
import PorterCard from './components/PorterCard'
import DriverCard from './components/DriverCard'
import LiveChat from './components/LiveChat'

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

// Sample data for guides, porters, and drivers
const guides = [
  {
    name: 'Ram Gurung',
    photo: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400',
    experience: '7+ years',
    languages: ['English', 'Nepali', 'Hindi'],
    specialties: ['Trekking', 'Cultural Tours', 'Photography'],
    rating: 4.9,
    reviews: 124,
    certifications: ['Licensed Guide', 'First Aid Certified', 'Mountain Rescue Trained'],
    basePrice: 50,
    description: 'Experienced mountain guide with extensive knowledge of Ilam region and its cultural heritage.'
  },
  {
    name: 'Sita Tamang',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    experience: '5+ years',
    languages: ['English', 'Nepali'],
    specialties: ['Tea Garden Tours', 'Nature Walks', 'Bird Watching'],
    rating: 4.8,
    reviews: 98,
    certifications: ['Licensed Guide', 'Bird Watching Expert', 'Tea Culture Specialist'],
    basePrice: 45,
    description: 'Specialized in tea garden tours and nature experiences around Ilam.'
  },
  {
    name: 'Hari Thapa',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    experience: '6+ years',
    languages: ['English', 'Nepali', 'Japanese'],
    specialties: ['Adventure Tours', 'Rock Climbing', 'Camping'],
    rating: 4.7,
    reviews: 87,
    certifications: ['Adventure Guide', 'Rock Climbing Instructor', 'Wilderness First Aid'],
    basePrice: 55,
    description: 'Adventure specialist with expertise in rock climbing and camping experiences.'
  }
];

const porters = [
  {
    name: 'Krishna Rai',
    photo: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400',
    experience: '4+ years',
    maxWeight: '25kg',
    routes: ['Annapurna Circuit', 'Everest Base Camp', 'Sandakphu Trek'],
    rating: 4.8,
    reviews: 76,
    certifications: ['Certified Porter', 'High Altitude Training', 'First Aid Basic'],
    basePrice: 30,
    description: 'Experienced porter with excellent knowledge of mountain trails and safety protocols.'
  },
  {
    name: 'Pemba Sherpa',
    photo: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?w=400',
    experience: '6+ years',
    maxWeight: '30kg',
    routes: ['Kanchenjunga Base Camp', 'Makalu Base Camp', 'Ilam Tea Garden Trek'],
    rating: 4.9,
    reviews: 92,
    certifications: ['Senior Porter', 'Mountain Safety', 'Load Management Expert'],
    basePrice: 35,
    description: 'Senior porter with extensive experience in high-altitude treks and tea garden routes.'
  },
  {
    name: 'Dawa Tamang',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    experience: '3+ years',
    maxWeight: '22kg',
    routes: ['Mai Pokhari Trek', 'Singalila Ridge', 'Ilam Valley Trek'],
    rating: 4.7,
    reviews: 45,
    certifications: ['Certified Porter', 'Basic First Aid', 'Local Trail Expert'],
    basePrice: 28,
    description: 'Knowledgeable porter specializing in Ilam region trails and tea garden routes.'
  }
];

const drivers = [
  {
    name: 'Rajesh Kumar',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    experience: '8+ years',
    vehicleType: 'SUV',
    routes: ['Ilam City Tour', 'Tea Garden Routes', 'Mountain Viewpoint Circuit'],
    rating: 4.9,
    reviews: 156,
    certifications: ['Professional Driver License', 'Mountain Driving Expert', 'First Aid Certified'],
    basePrice: 40,
    languages: ['English', 'Nepali', 'Hindi'],
    description: 'Professional driver with extensive knowledge of Ilam\'s roads and tourist spots.'
  },
  {
    name: 'Binod Pradhan',
    photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400',
    experience: '6+ years',
    vehicleType: 'Jeep',
    routes: ['Adventure Trails', 'Off-road Experience', 'Scenic Mountain Routes'],
    rating: 4.8,
    reviews: 112,
    certifications: ['Off-road Driving Expert', 'Vehicle Maintenance', 'Safety Specialist'],
    basePrice: 45,
    languages: ['English', 'Nepali'],
    description: 'Specialized in off-road driving and adventure tours around Ilam.'
  },
  {
    name: 'Sunita Shrestha',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    experience: '5+ years',
    vehicleType: 'Van',
    routes: ['Group Tours', 'City Sightseeing', 'Cultural Circuit'],
    rating: 4.7,
    reviews: 89,
    certifications: ['Professional Driver License', 'Tour Guide', 'Customer Service'],
    basePrice: 35,
    languages: ['English', 'Nepali', 'Japanese'],
    description: 'Experienced driver specializing in group tours and cultural experiences.'
  }
];

function App() {
  const [destinations, setDestinations] = useState([])
  const [ilamProfile, setIlamProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')

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

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(throttle(() => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      setIsHeroVisible(rect.bottom > window.innerHeight * 0.2);
    }

    // Get all sections
    const sections = ['hero', 'about-ilam', 'featured-destinations', 'guides', 'porters', 'drivers', 'map', 'contact'];
    
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

        {/* Guides Section */}
        <section id="guides" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Expert Local Guides
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore Ilam with our experienced local guides who know every corner of the region
                and can provide unique insights into the local culture and traditions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide, index) => (
                <GuideCard key={index} guide={guide} />
              ))}
            </div>
          </div>
        </section>

        {/* Porters Section */}
        <section id="porters" className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Reliable Porters
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Make your trekking experience comfortable with our strong and dependable porters
                who are familiar with all the mountain trails.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {porters.map((porter, index) => (
                <PorterCard key={index} porter={porter} />
              ))}
            </div>
          </div>
        </section>

        {/* Drivers Section */}
        <section id="drivers" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Professional Drivers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Travel comfortably with our experienced drivers who know every road and route in Ilam.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {drivers.map((driver, index) => (
                <DriverCard key={index} driver={driver} />
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section id="map" className="py-20 px-4 bg-gray-50">
          <Map />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-white">
          <Contact />
        </section>
      </main>

      <Footer />
      <LiveChat />
    </div>
  )
}

export default App
