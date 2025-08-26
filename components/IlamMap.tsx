'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon, LatLngTuple } from 'leaflet'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Marker icon setup
const icon = new Icon({
  iconUrl: '/markers/marker-icon.png',
  shadowUrl: '/markers/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Map bounds (Ilam district area)
const ILAM_BOUNDS: [LatLngTuple, LatLngTuple] = [
  [26.65, 87.65], // SW
  [27.15, 88.15]  // NE
]

interface IlamLocation {
  name: string
  coordinates: LatLngTuple
  description: string
  type: string
  bestTime: string
  highlights: string[]
  zoom?: number
}

const ILAM_LOCATIONS: IlamLocation[] = [
  { name: "Ilam Bazaar", coordinates: [26.9087, 87.9272], description: "The main market area of Ilam, known for its local products and vibrant atmosphere", type: "Market", bestTime: "Morning", highlights: ["Local market", "Traditional shops", "Local cuisine"], zoom: 13 },
  { name: "Sandakpur", coordinates: [27.0167, 87.9167], description: "Highest point in Ilam with panoramic views of Mt. Kanchenjunga and surrounding peaks", type: "Viewpoint", bestTime: "Sunrise", highlights: ["Mountain views", "Sunrise point", "Trekking"], zoom: 13 },
  { name: "Mai Pokhari", coordinates: [26.9167, 87.9167], description: "Sacred lake and religious site surrounded by beautiful rhododendron forests", type: "Religious Site", bestTime: "Morning", highlights: ["Sacred lake", "Temple", "Nature walk"], zoom: 13 },
  { name: "Kanyam Tea Garden", coordinates: [26.8833, 87.9], description: "Famous tea garden and tourist attraction with guided tours and tea tasting", type: "Tea Garden", bestTime: "Afternoon", highlights: ["Tea plantation", "Tea tasting", "Photo spots"], zoom: 13 },
  { name: "Chhintapu", coordinates: [26.95, 87.9333], description: "Beautiful viewpoint and picnic spot with stunning valley views", type: "Viewpoint", bestTime: "Sunset", highlights: ["Valley views", "Picnic spot", "Nature trails"], zoom: 13 },
  { name: "Antu Danda", coordinates: [26.9667, 87.9167], description: "Famous viewpoint for sunrise and sunset with panoramic mountain views", type: "Viewpoint", bestTime: "Sunrise/Sunset", highlights: ["Sunrise view", "Mountain panorama", "Photography"], zoom: 13 },
  { name: "Siddhi Thumka", coordinates: [26.9333, 87.9167], description: "Religious site with ancient temple and meditation center", type: "Religious Site", bestTime: "Morning", highlights: ["Temple", "Meditation", "Peaceful atmosphere"], zoom: 13 },
  { name: "Mangalbare", coordinates: [26.9, 87.9167], description: "Traditional village known for its cultural heritage and local crafts", type: "Cultural Site", bestTime: "Daytime", highlights: ["Local crafts", "Cultural shows", "Traditional houses"], zoom: 13 },
  { name: "Pashupatinagar", coordinates: [26.8833, 87.9333], description: "Border town with unique cultural blend and shopping opportunities", type: "Market", bestTime: "Daytime", highlights: ["Border market", "Cultural diversity", "Shopping"], zoom: 13 }
]

// Component to change map view
interface ChangeViewProps {
  center?: LatLngTuple
  zoom?: number
  reset?: boolean
}

const ChangeView: React.FC<ChangeViewProps> = ({ center, zoom, reset }) => {
  const map = useMap()
  useEffect(() => {
    if (reset) {
      map.fitBounds(ILAM_BOUNDS, { padding: [20, 20], animate: true, duration: 0.8 })
    } else if (center && zoom) {
      map.setView(center, zoom, { animate: true })
    }
  }, [map, center, zoom, reset])
  return null
}

// Component to enforce bounds on load
const MapBounds: React.FC = () => {
  const map = useMap()
  useEffect(() => {
    map.fitBounds(ILAM_BOUNDS, { padding: [20, 20] })
  }, [map])
  return null
}

export default function IlamMap() {
  const [selectedLocation, setSelectedLocation] = useState<IlamLocation | null>(null)
  const [resetTrigger, setResetTrigger] = useState(0)

  const handleLocationClick = (location: IlamLocation) => {
    setSelectedLocation(location)
  }

  const handleResetView = () => {
    setSelectedLocation(null)
    setResetTrigger(prev => prev + 1)
  }

  return (
    <>
      {/* Map */}
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
          zoomControl
          scrollWheelZoom
          doubleClickZoom
          dragging
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapBounds />

          <ChangeView
            center={selectedLocation?.coordinates}
            zoom={selectedLocation?.zoom ?? 13}
            reset={!selectedLocation && resetTrigger > 0}
          />

          {ILAM_LOCATIONS.map((loc, idx) => (
            <Marker key={idx} position={loc.coordinates} icon={icon}>
              <Popup>
                <div className="p-1.5">
                  <h3 className="font-bold text-base mb-1">{loc.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{loc.description}</p>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {loc.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-block bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded">
                    Best time: {loc.bestTime}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>

      {/* Reset button */}
      <div className="text-center mt-4">
        <button
          onClick={handleResetView}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-md"
        >
          Reset Map View
        </button>
      </div>

      {/* Location Cards */}
      <motion.div
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {ILAM_LOCATIONS.map((loc, idx) => (
          <div
            key={idx}
            onClick={() => handleLocationClick(loc)}
            className={`bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border-2 ${
              selectedLocation?.name === loc.name
                ? 'border-green-500 bg-green-50'
                : 'border-transparent hover:border-green-200'
            }`}
          >
            <h3 className="font-bold text-sm sm:text-base mb-1">{loc.name}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-1 line-clamp-2">{loc.description}</p>
            <div className="flex flex-wrap gap-1 mb-1">
              {loc.highlights.map((h, i) => (
                <span
                  key={i}
                  className="inline-block bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded"
                >
                  {h}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <span className="inline-block bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded">
                {loc.type}
              </span>
              <span className="text-xs text-gray-500">Best: {loc.bestTime}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  )
}
