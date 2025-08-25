'use client'

import { useState, memo } from 'react'
import Image from 'next/image'
import DestinationModal from '@/components/DestinationModal'
import type { Destination } from '@/types'

interface DestinationCardProps {
  destination?: Destination
}

const DEFAULT_DESTINATION: Destination = {
  id: 0,
  name: "Unknown Destination",
  category: "main",
  image: "/static/placeholder.jpg",
  description: "No description available.",
  rating: 0,
  reviews: 0,
  details: {
    altitude: "Not specified",
    bestSeason: "Any time",
    address: "Not specified",
    distance: "Not specified",
    attraction: "Not specified",
    significance: "Not specified",
    workers: "Not specified",
    production: "Not specified",
    impact: "Not specified",
  },
}

const DestinationCard = memo<DestinationCardProps>(
  ({ destination = DEFAULT_DESTINATION }) => {
  // Provide default values for all required properties
  const { name, image,details}= destination

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{name}</h3>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-600 mr-4">
              Best time to visit: {details.bestSeason}
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white text-sm sm:text-base rounded-full hover:bg-green-700 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <DestinationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        destination={destination}
      />
    </>
  )
})

DestinationCard.displayName = 'DestinationCard'

export default DestinationCard