/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback, useRef, Suspense, lazy } from 'react'
import Navigation from './components/Navigation'

// Lazy-load route pages to reduce initial bundle size
const HomePage = lazy(() => import('./pages/HomePage'))
const GuidesPage = lazy(() => import('./pages/GuidesPage'))
const PortersPage = lazy(() => import('./pages/PortersPage'))
const DriversPage = lazy(() => import('./pages/DriversPage'))
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'))
const MapPage = lazy(() => import('./pages/MapPage'))

function AppContent() {
	const [isHeroVisible, setIsHeroVisible] = useState(true); // Start as true since we load at top
	const [activeSection, setActiveSection] = useState('hero');
	const location = useLocation();
	const heroObserverRef = useRef(null);
	const sectionObserverRef = useRef(null);

	// Handle hash navigation on initial load
	useEffect(() => {
		if (location.pathname === '/' && location.hash) {
			// Small delay to ensure DOM is ready
			setTimeout(() => {
				const element = document.getElementById(location.hash.slice(1));
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
					setActiveSection(location.hash.slice(1));
				}
			}, 100);
		}
	}, [location.pathname, location.hash]);

	useEffect(() => {
		// Cleanup existing observers
		if (heroObserverRef.current) {
			heroObserverRef.current.disconnect();
		}
		if (sectionObserverRef.current) {
			sectionObserverRef.current.disconnect();
		}

		// Handle non-home routes
		if (location.pathname !== '/') {
			setIsHeroVisible(false);
			setActiveSection('');
			return;
		}

		// Home route specific logic
		const setupObservers = () => {
			const heroSection = document.getElementById('hero');
			if (!heroSection) {
				// Retry after a short delay if hero section not found
				setTimeout(setupObservers, 100);
				return;
			}

			// Hero visibility observer
			heroObserverRef.current = new IntersectionObserver(
				([entry]) => {
					// Hero is visible when it's intersecting with a reasonable threshold
					setIsHeroVisible(entry.isIntersecting);
				},
				{
					root: null,
					// Trigger when hero section is 50% visible
					rootMargin: '0px 0px -50% 0px',
					threshold: 0
				}
			);

			heroObserverRef.current.observe(heroSection);

			// Section tracking observer
			const sections = ['hero', 'about-ilam', 'featured-destinations',	 'contact'];
			const sectionElements = sections
				.map(id => document.getElementById(id))
				.filter(Boolean);

			if (sectionElements.length > 0) {
				sectionObserverRef.current = new IntersectionObserver(
					(entries) => {
						// Find the section that's most visible
						let maxRatio = 0;
						let mostVisibleSection = 'hero';

						entries.forEach((entry) => {
							if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
								maxRatio = entry.intersectionRatio;
								mostVisibleSection = entry.target.id;
							}
						});

						if (maxRatio > 0) {
							setActiveSection(mostVisibleSection);
						}
					},
					{
						root: null,
						rootMargin: '-20% 0px -20% 0px',
						threshold: [0, 0.25, 0.5, 0.75, 1]
					}
				);

				sectionElements.forEach(section => {
					sectionObserverRef.current.observe(section);
				});
			}

			// Initial check for hero visibility
			const rect = heroSection.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			// Hero is visible if its bottom edge is above the middle of viewport
			const heroVisible = rect.bottom > viewportHeight * 0.5;
			setIsHeroVisible(heroVisible);
		};

		// Setup observers with a small delay to ensure DOM is ready
		setTimeout(setupObservers, 50);

		return () => {
			if (heroObserverRef.current) {
				heroObserverRef.current.disconnect();
			}
			if (sectionObserverRef.current) {
				sectionObserverRef.current.disconnect();
			}
		};
	}, [location.pathname]);

	// Memoized navigation click handler
	const handleNavClick = useCallback((e, section) => {
		e.preventDefault();
		const element = document.getElementById(section);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			setActiveSection(section);

			// Update URL without page reload
			if (window.location.pathname === '/') {
				window.history.pushState({}, '', `#${section}`);
			}
		}
	}, []);

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
					<Route path="/map" element={<MapPage />} />
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