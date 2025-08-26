'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function HotelsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation isHeroVisible={false} activeSection="" handleNavClick={() => {}} />

      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-16">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mx-auto mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-600 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4h2v4a1 1 0 001 1m-4 0h4"
              />
            </svg>
          </motion.div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hotel</h1>
          <p className="text-lg text-gray-600 mb-4">
            {`We're working hard to bring you the best list of hotels in Ilam.`}  
          </p>
          <p className="text-lg text-gray-600 mb-6">{`Stay tuned — it's coming soon!`}</p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="animate-bounce">
              <span className="inline-block bg-green-600 text-white text-sm font-medium py-2 px-6 rounded-full shadow-md">
                Coming Soon
              </span>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
