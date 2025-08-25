'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Navigation from '@/components/Navigation'
import type { ClientWrapperProps } from '@/types'

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const pathname = usePathname()
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    if (pathname !== '/') {
      setIsHeroVisible(false)
      setActiveSection('')
      return
    }

    // Scroll to hash on load
    if (window.location.hash) {
      const id = window.location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        setActiveSection(id)
      }
    }

    const handleScroll = () => {
      // hero is exactly 100vh → check if scrolled past it
      setIsHeroVisible(window.scrollY < window.innerHeight)
    }

    // initial sync
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
      if (pathname === '/') {
        window.history.pushState({}, '', `#${id}`)
      }
    }
  }, [pathname])

  return (
    <>
      <Navigation
        isHeroVisible={isHeroVisible}
        activeSection={activeSection}
        handleNavClick={handleNavClick}
      />
      {children}
    </>
  )
}
