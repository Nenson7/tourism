'use client'

import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

// Dynamically import the Map component, disable SSR
const MapSection = dynamic(() => import('@/components/IlamMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] sm:h-[500px] md:h-[550px] flex items-center justify-center bg-gray-200 rounded-lg shadow-md">
      <p className="text-gray-600">Loading map...</p>
    </div>
  ),
})

export default function MapPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation isHeroVisible={false} activeSection="" handleNavClick={() => { }} />

      <section className="section-padding bg-gray-50 relative pt-20">
        <div className="container mx-auto px-4 py-10">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">
              Explore Ilam District
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-4">
              Discover the beautiful locations within Ilam district on our interactive map.
            </p>
          </motion.div>

          {/* Map Component */}
          <MapSection />
        </div>
      </section>

      <Footer />
    </div>
  )
}
