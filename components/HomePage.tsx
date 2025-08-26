'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import destinationsData from '@/data/destinations.json'
import ilamProfileData from '@/data/ilamProfile.json'
import Hero from '@/components/Hero'
import AboutIlam from '@/components/AboutIlam'
import DestinationCard from '@/components/DestinationCard'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

import type { IlamProfile, IlamProfileFile, Destination } from '@/types'

const LiveChat = dynamic(() => import('@/components/LiveChat'), {
  ssr: false,
  loading: () => null,
})


interface DestinationsFile {
  destinations: Destination[]
}

const HomePage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [ilamProfile, setIlamProfile] = useState<IlamProfile | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Strongly type JSON imports
      const typedDestinations = (destinationsData as unknown as DestinationsFile).destinations
      const typedIlamProfile = (ilamProfileData as unknown as  IlamProfileFile).ilamProfile

      setDestinations(typedDestinations)
      setIlamProfile(typedIlamProfile)
    } catch (err) {
      console.error('Error loading data:', err)
      setError('Failed to load data. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Handle hash navigation
  useEffect(() => {
    const handleHashNavigation = (): void => {
      const hash = window.location.hash
      if (hash) {
        const id = hash.replace('#', '')
        setTimeout(() => {
          const element = document.getElementById(id)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        window.scrollTo(0, 0)
      }
    }

    handleHashNavigation()
    window.addEventListener('hashchange', handleHashNavigation)
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation)
    }
  }, [])

  const handleRetry = (): void => {
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600" />
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
            onClick={handleRetry}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <main>
        <Hero />

        <section id="about-ilam" className="bg-white py-20 px-4">
          {ilamProfile && <AboutIlam profile={ilamProfile} />}
        </section>

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

            {destinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No destinations available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        <section id="contact" className="py-10 px-4 bg-white">
          <Contact />
        </section>
      </main>

      <Footer />
      <LiveChat />
    </div>
  )
}

export default HomePage
