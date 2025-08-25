'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import ilamProfileData from '@/data/ilamProfile.json'

import type { IlamProfile, IlamProfileFile } from '@/types'

interface AboutIlamProps {
  profile?: IlamProfile | null
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, when: "beforeChildren" as const, staggerChildren: 0.15, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] } }
}

const AboutIlam: React.FC<AboutIlamProps> = ({ profile }) => {
  const { ilamProfile } = ilamProfileData as IlamProfileFile
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const profileData = profile || ilamProfile

  if (!profileData) {
    return (
      <section id="about-ilam" className="py-20 bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">Profile data not available</p>
        </div>
      </section>
    )
  }

  return (
    <section id="about-ilam" className="py-10 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16 max-w-3xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{profileData.title}</h2>
          <p className="text-lg md:text-xl text-gray-600">{profileData.introduction}</p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Overview Card */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-green-700 mb-4 border-b-2 border-green-200 pb-2">Overview</h3>
            <p className="text-gray-700 mb-4">{profileData.overview.description}</p>
            <p className="text-gray-700 mb-4 font-medium">{profileData.overview.location}</p>
            <ul className="space-y-2">
              {profileData.overview.characteristics.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Geography Card */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-green-700 mb-6 border-b-2 border-green-200 pb-2">Geography</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-sm text-green-600">Area</p>
                <p className="font-medium text-gray-900">{profileData.geography.area}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-sm text-green-600">Altitude</p>
                <p className="font-medium text-gray-900">{profileData.geography.altitude}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Borders</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(profileData.geography.borders).map(([direction, place]) => (
                  <div key={direction} className="bg-gray-50 rounded-lg p-3 hover:bg-green-50 transition-colors">
                    <p className="text-xs text-gray-500 capitalize">{direction}</p>
                    <p className="font-medium text-gray-900">{place}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Seven A Image */}
          <motion.div className="col-span-1 lg:col-span-2" variants={itemVariants}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full" style={{ paddingTop: '57.9%' }}>
                <Image
                  src="/static/seven_a-optimized.png"
                  alt="Seven A Tea Garden - Beautiful tea plantation in Ilam district showcasing the lush green landscapes"
                  fill
                  className="object-cover absolute top-0 left-0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  priority={false}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutIlam
