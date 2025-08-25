"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type { NavigationProps } from "@/types"
import Image from "next/image"

const homeSections = [
  { id: "hero", label: "Home" },
  { id: "about-ilam", label: "About Ilam" },
  { id: "featured-destinations", label: "Destinations" },
  { id: "contact", label: "Contact" },
]

const routeSections = [
  { path: "/map", label: "Map" },
  { path: "/blog", label: "Blog" },
  { path: "/guides", label: "Guides" },
  { path: "/porters", label: "Porters" },
  { path: "/drivers", label: "Drivers" },
  { path: "/about", label: "About Us" },
]

export default function Navigation({
  isHeroVisible,
  activeSection,
  handleNavClick,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"

  const handleSectionNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault()
    if (isHome) {
      handleNavClick?.(e, id)
    } else {
      router.push("/")
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`max-w-7xl mx-auto mt-2 px-6 py-3 flex items-center justify-between rounded-sm shadow-xl backdrop-blur-md transition-all duration-300 ${
          isHeroVisible ? "bg-black/30" : "bg-white/90 border border-gray-300"
        }`}
      >
        {/* Logo */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/">
            <Image
              src={ isHeroVisible ? "/logos/logo-optimized.png" : "/logos/blk_logo-optimized.png"
              }
              alt="Visit Ilam"
              width={40}
              height={40}
              className="h-8 md:h-10 transition-all"
            />
          </Link>
        </motion.div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden text-2xl ${
            isHeroVisible ? "text-white" : "text-gray-800"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-5 items-center">
          {homeSections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`/#${id}`}
                onClick={(e) => handleSectionNav(e, id)}
                className={`relative font-medium transition-colors duration-300 ${
                  activeSection === id
                    ? isHeroVisible
                      ? "text-green-300"
                      : "text-green-600"
                    : isHeroVisible
                    ? "text-white"
                    : "text-gray-800"
                }`}
              >
                {label}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 rounded-full transition-all duration-300 ${
                    activeSection === id
                      ? "w-full bg-green-500"
                      : "w-0 bg-transparent group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}

          {routeSections.map(({ path, label }) => (
            <li key={path}>
              <Link
                href={path}
                className={`px-4 py-2 rounded-sm border font-semibold transition-colors duration-300 ${
                  pathname === path
                    ? "bg-green-600 border-green-600 text-white"
                    : isHeroVisible
                    ? "text-white border-green-600 hover:bg-green-600"
                    : "text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 p-6 flex flex-col bg-white md:hidden">
          <button
            className="self-end mb-8 text-2xl"
            onClick={() => setIsMenuOpen(false)}
          >
            ✖
          </button>
          <ul className="flex flex-col gap-6">
            {isHome &&
              homeSections.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`/#${id}`}
                    onClick={(e) => handleSectionNav(e, id)}
                    className="text-lg font-medium"
                  >
                    {label}
                  </a>
                </li>
              ))}
            {routeSections.map(({ path, label }) => (
              <li key={path}>
                <Link href={path} onClick={() => setIsMenuOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
