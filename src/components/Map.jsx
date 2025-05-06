import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'

// Fix for default marker icon
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const locations = [
  {
    name: "Ilam Bazaar",
    position: [26.9083, 87.9282],
    description: "The main town of Ilam district"
  },
  {
    name: "Sandakpur",
    position: [27.0167, 87.9167],
    description: "Highest point in Ilam with panoramic views"
  },
  {
    name: "Mai Pokhari",
    position: [26.9167, 87.9333],
    description: "Famous lake and religious site"
  },
  {
    name: "Antu Danda",
    position: [26.9333, 87.9167],
    description: "Popular viewpoint for sunrise and sunset"
  }
]

const Map = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Fix for Leaflet default icon
    if (typeof window !== 'undefined') {
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
      })
    }
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="h-[600px] rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <section id="map" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Ilam</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the beautiful locations of Ilam on our interactive map
          </p>
        </div>
        
        <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
          {typeof window !== 'undefined' && (
            <MapContainer 
              center={[26.9083, 87.9282]} 
              zoom={11} 
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {locations.map((location, index) => (
                <Marker 
                  key={index}
                  position={location.position}
                  icon={defaultIcon}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-gray-900">{location.name}</h3>
                      <p className="text-gray-600">{location.description}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </section>
  )
}

export default Map 