/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback, Suspense, lazy } from 'react'
import Navigation from './components/Navigation'

// Lazy-load route pages to reduce initial bundle size
const HomePage = lazy(() => import('./pages/HomePage'))
const GuidesPage = lazy(() => import('./pages/GuidesPage'))
const PortersPage = lazy(() => import('./pages/PortersPage'))
const DriversPage = lazy(() => import('./pages/DriversPage'))
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'))

function AppContent() {
    const [isHeroVisible, setIsHeroVisible] = useState(true)
    const [activeSection, setActiveSection] = useState('hero')
    const location = useLocation()

    // Use IntersectionObserver scoped to home route, and trigger the switch a bit earlier
    useEffect(() => {
        const heroSection = document.getElementById('hero')

        if (location.pathname !== '/' || !heroSection || typeof IntersectionObserver === 'undefined') {
            // Force solid navbar styles on non-home routes or when hero is absent
            setIsHeroVisible(false)
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Treat hero as visible only while it significantly intersects the viewport
                setIsHeroVisible(entry.isIntersecting)
            },
            {
                root: null,
                // Shrink the top of the viewport by 20% so we flip to solid a bit before fully passing hero
                rootMargin: '-20% 0px 0px 0px',
                threshold: 0,
            }
        )

        observer.observe(heroSection)
        return () => observer.disconnect()
    }, [location.pathname])

    // Reset hero visibility when route changes
    useEffect(() => {
        if (location.pathname === '/') {
            // Reset to top and hero visible when navigating to home
            window.scrollTo(0, 0)
            setIsHeroVisible(true)
            setActiveSection('hero')
        } else {
            // Ensure solid navbar on non-home routes
            setIsHeroVisible(false)
        }
    }, [location.pathname])

    // Memoized navigation click handler
    const handleNavClick = useCallback((e, section) => {
        e.preventDefault()
        const element = document.getElementById(section)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setActiveSection(section)
        }
    }, [])

    const Fallback = (
        <div className="min-h-[50vh] w-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600" />
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation
                isHeroVisible={isHeroVisible}
                activeSection={activeSection}
                handleNavClick={handleNavClick}
            />

            <Suspense fallback={Fallback}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/guides" element={<GuidesPage />} />
                    <Route path="/porters" element={<PortersPage />} />
                    <Route path="/drivers" element={<DriversPage />} />
                    <Route path="/about" element={<AboutUsPage />} />
                </Routes>
            </Suspense>
        </div>
    )
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}

export default App
