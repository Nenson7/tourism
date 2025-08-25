'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleExploreClick = () => {
    const destinationsSection = document.getElementById('featured-destinations')
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src="/static/sandakpur-optimized.jpg"
          alt="Sandakpur Ilam"
          className="h-full w-full object-cover"
          fill
          priority
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <div
          className={`max-w-4xl transition-all duration-700 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <span 
            className={`mb-4 inline-block rounded-full bg-green-500/20 px-4 py-1 text-sm font-medium text-green-300 transition-all duration-500 delay-150 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
          >
            Welcome to Nepal`&apos`s Tea Paradise
          </span>
          <h1 
            className={`mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl transition-all duration-600 delay-300 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-6'
            }`}
          >
            Visit Ilam
          </h1>
          <p 
            className={`mb-8 text-lg text-gray-200 md:text-xl transition-all duration-600 delay-450 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
          >
            Your Gateway to Nepal`&apos`s Tea Paradise
          </p>
          <button
            onClick={handleExploreClick}
            className={`rounded-full bg-green-500 px-8 py-3 font-semibold text-white transition-all duration-600 delay-600 ease-out hover:bg-green-600 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
          >
            Explore Destinations
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero