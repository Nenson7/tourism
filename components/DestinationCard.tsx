"use client"

import { useState, memo } from "react"
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import DestinationModal from "@/components/DestinationModal"
import type { Destination } from "@/types"

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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1, duration: 0.2, ease: "easeOut" },
  }),
}

const DestinationCard = memo<DestinationCardProps>(
  ({ destination = DEFAULT_DESTINATION }) => {
    const { name, image, details } = destination
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
      <>
        <motion.div
          className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={destination.id}
        >
          {/* Image */}
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              priority={destination.id < 3} // preload first few
              placeholder="blur"
              blurDataURL="/static/blur-placeholder.png"
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 50vw,
                     33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl sm:text-2xl font-bold drop-shadow-md">
                {name}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="text-gray-600 text-sm mb-2">
              Best time:{" "}
              <span className="font-semibold text-green-700">
                {details.bestSeason}
              </span>
            </p>
            <p className="text-gray-700 text-sm line-clamp-2 mb-4">
              Attraction:{" "}
              <span className="font-medium text-gray-900">
                {details.attraction}
              </span>
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700 hover:scale-105 active:scale-95 transition-all"
            >
              Learn More
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Modal */}
        <DestinationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          destination={destination}
        />
      </>
    )
  }
)

DestinationCard.displayName = "DestinationCard"

export default DestinationCard
