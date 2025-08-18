import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Fix for default marker icon
const icon = new Icon({
  iconUrl: '/markers/marker-icon.png',
  iconRetinaUrl: '/markers/marker-icon-2x.png',
  shadowUrl: '/markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Ilam district boundaries (approximate bounds)
const ILAM_BOUNDS = [
  [26.65, 87.65], // Southwest corner
  [27.15, 88.15]  // Northeast corner
];

// Ilam locations with coordinates
const ILAM_LOCATIONS = [
  {
    name: "Ilam Bazaar",
    coordinates: [26.9087, 87.9272],
    description: "The main market area of Ilam, known for its local products and vibrant atmosphere",
    type: "Market",
    bestTime: "Morning",
    highlights: ["Local market", "Traditional shops", "Local cuisine"]
  },
  {
    name: "Sandakpur",
    coordinates: [27.0167, 87.9167],
    description: "Highest point in Ilam with panoramic views of Mt. Kanchenjunga and surrounding peaks",
    type: "Viewpoint",
    bestTime: "Sunrise",
    highlights: ["Mountain views", "Sunrise point", "Trekking"]
  },
  {
    name: "Mai Pokhari",
    coordinates: [26.9167, 87.9167],
    description: "Sacred lake and religious site surrounded by beautiful rhododendron forests",
    type: "Religious Site",
    bestTime: "Morning",
    highlights: ["Sacred lake", "Temple", "Nature walk"]
  },
  {
    name: "Kanyam Tea Garden",
    coordinates: [26.8833, 87.9000],
    description: "Famous tea garden and tourist attraction with guided tours and tea tasting",
    type: "Tea Garden",
    bestTime: "Afternoon",
    highlights: ["Tea plantation", "Tea tasting", "Photo spots"]
  },
  {
    name: "Chhintapu",
    coordinates: [26.9500, 87.9333],
    description: "Beautiful viewpoint and picnic spot with stunning valley views",
    type: "Viewpoint",
    bestTime: "Sunset",
    highlights: ["Valley views", "Picnic spot", "Nature trails"]
  },
  {
    name: "Antu Danda",
    coordinates: [26.9667, 87.9167],
    description: "Famous viewpoint for sunrise and sunset with panoramic mountain views",
    type: "Viewpoint",
    bestTime: "Sunrise/Sunset",
    highlights: ["Sunrise view", "Mountain panorama", "Photography"]
  },
  {
    name: "Siddhi Thumka",
    coordinates: [26.9333, 87.9167],
    description: "Religious site with ancient temple and meditation center",
    type: "Religious Site",
    bestTime: "Morning",
    highlights: ["Temple", "Meditation", "Peaceful atmosphere"]
  },
  {
    name: "Mangalbare",
    coordinates: [26.9000, 87.9167],
    description: "Traditional village known for its cultural heritage and local crafts",
    type: "Cultural Site",
    bestTime: "Daytime",
    highlights: ["Local crafts", "Cultural shows", "Traditional houses"]
  },
  {
    name: "Pashupatinagar",
    coordinates: [26.8833, 87.9333],
    description: "Border town with unique cultural blend and shopping opportunities",
    type: "Market",
    bestTime: "Daytime",
    highlights: ["Border market", "Cultural diversity", "Shopping"]
  }
];

// Component to handle map view changes and enforce bounds
function ChangeView({ center, zoom, reset }) {
  const map = useMap();
  
  useEffect(() => {
    if (reset) {
      // Reset to full district view
      map.fitBounds(ILAM_BOUNDS, { 
        padding: [20, 20],
        animate: true,
        duration: 0.8
      });
    } else if (center && zoom) {
      // If a specific location is selected, zoom to it but stay within bounds
      map.setView(center, zoom, { animate: true, duration: 0.5 });
    }
  }, [map, center, zoom, reset]);
  
  return null;
}

// Component to restrict map bounds
function MapBounds() {
  const map = useMap();
  
  useEffect(() => {
    // Set strict bounds
    map.setMaxBounds(ILAM_BOUNDS);
    map.setMinZoom(10);
    map.setMaxZoom(16);
    
    // Fit to bounds initially
    map.fitBounds(ILAM_BOUNDS, { padding: [20, 20] });
    
    // Handle map moveend event to keep within bounds
    const handleMoveEnd = () => {
      const bounds = map.getBounds();
      const maxBounds = map.options.maxBounds;
      
      if (maxBounds && !maxBounds.contains(bounds)) {
        map.fitBounds(ILAM_BOUNDS, { padding: [20, 20] });
      }
    };
    
    map.on('moveend', handleMoveEnd);
    
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [map]);
  
  return null;
}

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleLocationClick = (location) => {
    setSelectedLocation({
      coordinates: location.coordinates,
      zoom: 14,
      name: location.name
    });
  };

  const handleResetView = () => {
    setSelectedLocation(null);
    // Increment trigger to force reset
    setResetTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation
        isHeroVisible={false}
        activeSection=""
        handleNavClick={() => { }}
      />

      <section id="map" className="section-padding bg-gray-50 relative pt-20">
        <div className="container mx-auto px-2 sm:px-3 md:px-4 py-10">
          <motion.div
            className="text-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Explore Ilam District</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Discover the beautiful locations within Ilam district on our interactive map
            </p>
            <button
              onClick={handleResetView}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
            >
              Reset Map View
            </button>
          </motion.div>

          <motion.div
            className="h-[400px] sm:h-[500px] md:h-[550px] rounded-lg overflow-hidden shadow-md relative z-0"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <MapContainer
              center={[26.9087, 87.9272]}
              zoom={11}
              style={{ height: '100%', width: '100%' }}
              maxBounds={ILAM_BOUNDS}
              maxBoundsViscosity={1.0}
              minZoom={10}
              maxZoom={16}
              zoomControl={true}
              scrollWheelZoom={true}
              doubleClickZoom={true}
              dragging={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Map bounds enforcement and view change components */}
              <MapBounds />
              
              {/* Always render ChangeView component */}
              <ChangeView
                center={selectedLocation?.coordinates}
                zoom={selectedLocation?.zoom}
                reset={!selectedLocation && resetTrigger > 0}
              />
              
              {ILAM_LOCATIONS.map((location, index) => (
                <Marker
                  key={index}
                  position={location.coordinates}
                  icon={icon}
                >
                  <Popup>
                    <div className="p-1.5">
                      <h3 className="font-bold text-base mb-1">{location.name}</h3>
                      <p className="text-sm text-gray-600 mb-1.5">{location.description}</p>
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        {location.highlights.map((highlight, i) => (
                          <span key={i} className="inline-block bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded">
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded">
                        Best time: {location.bestTime}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              {selectedLocation && selectedLocation.coordinates && (
                <ChangeView
                  center={selectedLocation.coordinates}
                  zoom={14}
                />
              )}
            </MapContainer>
          </motion.div>

          <motion.div
            className="mt-4 sm:mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">
                Map is restricted to Ilam district boundaries. Click on locations below to focus on them.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {ILAM_LOCATIONS.map((location, index) => (
              <div
                key={index}
                onClick={() => handleLocationClick(location)}
                className={`bg-white p-2.5 sm:p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 ${
                  selectedLocation?.name === location.name 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-transparent hover:border-green-200'
                }`}
              >
                <h3 className="font-bold text-sm sm:text-base mb-1.5">{location.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-1.5 line-clamp-2">{location.description}</p>
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {location.highlights.map((highlight, i) => (
                    <span key={i} className="inline-block bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded">
                      {highlight}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded">
                    {location.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    Best time: {location.bestTime}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}