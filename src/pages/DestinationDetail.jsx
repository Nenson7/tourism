import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMountain,
  FaInfoCircle,
  FaClock,
  FaMoneyBillWave,
  FaUserFriends,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft
} from 'react-icons/fa';
import ImageWithPlaceholder from '../components/ImageWithPlaceholder';

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.98 }
};

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

const DestinationDetail = () => {
  const { id } = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bookingData, setBookingData] = useState({
    date: '',
    guests: 1,
    duration: '1 day'
  });

  // TODO: Fetch destination data based on id
  // This is a placeholder, replace with actual data fetching
  const destination = {
    id,
    name: 'Sample Destination',
    description: 'This is a detailed description of the destination...',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'
    ],
    details: {
      distance: '10 km from city center',
      bestSeason: 'Spring & Fall',
      altitude: '1,200m',
      attraction: 'Natural Beauty',
      significance: 'Historical Site',
      impact: 'Cultural Heritage'
    },
    reviews: 124,
    basePrice: 199
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % destination.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + destination.images.length) % destination.images.length);
  };

  const handleBookingChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log('Booking submitted:', bookingData);
  };

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Back Button */}
      <Link
        to="/"
        className="fixed top-4 left-4 z-50 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-200"
      >
        <FaArrowLeft className="text-gray-800" size={20} />
      </Link>

      {/* Hero Section with Image Slider */}
      <div className="relative h-[60vh] lg:h-[80vh] bg-gray-900">
        <div className="absolute inset-0">
          <ImageWithPlaceholder
            src={destination.images[currentSlide]}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        {destination.images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-800 hover:bg-white transition-colors duration-200 shadow-lg z-10"
              aria-label="Previous image"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-gray-800 hover:bg-white transition-colors duration-200 shadow-lg z-10"
              aria-label="Next image"
            >
              <FaChevronRight size={20} />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-10">
              {destination.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
                    currentSlide === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12 text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">{destination.name}</h1>
          <div className="flex flex-wrap gap-6 text-lg">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span>{destination.details.distance}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMountain />
              <span>{destination.details.altitude}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar />
              <span>{destination.reviews} reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About this destination</h2>
              <p className="text-gray-600 leading-relaxed">{destination.description}</p>
            </section>

            <section className="grid md:grid-cols-2 gap-4">
              {Object.entries(destination.details).map(([key, value]) => (
                <div key={key} className="rounded-xl bg-gray-50 p-4 border border-gray-100">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-800 capitalize">
                    <FaInfoCircle className="text-green-500" />
                    {key}
                  </h4>
                  <p className="text-gray-600">{value}</p>
                </div>
              ))}
            </section>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border border-gray-200 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">${destination.basePrice}</span>
                <span className="text-gray-500">per person</span>
              </div>

              <form onSubmit={handleBookNow} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => handleBookingChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    value={bookingData.guests}
                    onChange={(e) => handleBookingChange('guests', parseInt(e.target.value) || 1)}
                    min="1"
                    max="10"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select
                    value={bookingData.duration}
                    onChange={(e) => handleBookingChange('duration', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="1 day">1 Day</option>
                    <option value="2 days">2 Days</option>
                    <option value="3 days">3 Days</option>
                    <option value="Custom">Custom Package</option>
                  </select>
                </div>

                <div className="pt-4">
                  <motion.button
                    type="submit"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors duration-200"
                  >
                    Book Now
                  </motion.button>
                </div>
              </form>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                    <FaClock size={14} />
                    <span className="text-sm">Duration</span>
                  </div>
                  <p className="font-medium">{bookingData.duration}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
                    <FaUserFriends size={14} />
                    <span className="text-sm">Total</span>
                  </div>
                  <p className="font-medium">
                    ${(destination.basePrice * bookingData.guests).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationDetail; 