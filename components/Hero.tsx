"use client"

import { motion, Variants } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

const textVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.3,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleExploreClick = () => {
    document
      .getElementById("featured-destinations")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/static/sandakpur-optimized.jpg"
          alt="Sandakpur Ilam"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {mounted && (
          <>
            <motion.span
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-4 inline-block rounded-full bg-green-500/20 px-4 py-1 text-sm font-medium text-green-300"
            >
              Welcome to Nepal’s Tea Paradise
            </motion.span>

            <motion.h1
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={1}
              className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl"
            >
              Visit Ilam
            </motion.h1>

            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mb-8 text-lg text-gray-200 md:text-xl max-w-2xl"
            >
              Explore the scenic tea gardens, rolling hills, and breathtaking
              mountain views of Ilam.
            </motion.p>

            <motion.button
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={3}
              onClick={handleExploreClick}
              className="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:scale-105 active:scale-95"
            >
              Explore Destinations
            </motion.button>
          </>
        )}
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white opacity-75"
      >
        ↓
      </motion.div>
    </section>
  )
}
