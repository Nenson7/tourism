import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Fix for default marker icon
const icon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

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

// Component to handle map view changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <section id="map" className="section-padding bg-gray-50 relative">
      <div className="container mx-auto px-2 sm:px-3 md:px-4">
        <motion.div 
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">Explore Ilam</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Discover the beautiful locations of Ilam on our interactive map
          </p>
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
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
            {selectedLocation && (
              <ChangeView 
                center={selectedLocation.coordinates} 
                zoom={14} 
              />
            )}
          </MapContainer>
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
              className={`bg-white p-2.5 sm:p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
                selectedLocation?.name === location.name ? 'ring-1 ring-green-500' : ''
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
  );
};

export default Map; 