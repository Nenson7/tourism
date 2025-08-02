/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import GuidesPage from './pages/GuidesPage'
import PortersPage from './pages/PortersPage'
import DriversPage from './pages/DriversPage'
import AboutUsPage from './pages/AboutUsPage'

// Throttle function for scroll events
const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

function AppContent() {
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const location = useLocation()

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(throttle(() => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const rect = heroSection.getBoundingClientRect();
      setIsHeroVisible(rect.bottom > window.innerHeight * 0.2);
    }

    // Get all sections
    const sections = ['hero', 'about-ilam', 'featured-destinations', 'map', 'contact'];
    
    // Find the current section using Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
      }
    );

    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup observer
    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, 100), []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Reset hero visibility when route changes
  useEffect(() => {
    if (location.pathname === '/') {
      // Reset to top and hero visible when navigating to home
      window.scrollTo(0, 0);
      setIsHeroVisible(true);
      setActiveSection('hero');
    }
  }, [location.pathname]);

  // Memoized navigation click handler
  const handleNavClick = useCallback((e, section) => {
    e.preventDefault();
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        isHeroVisible={isHeroVisible} 
        activeSection={activeSection} 
        handleNavClick={handleNavClick} 
      />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/porters" element={<PortersPage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/about" element={<AboutUsPage />} />
      </Routes>
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
