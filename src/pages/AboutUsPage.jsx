import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import LiveChat from '../components/LiveChat'

const AboutUsPage = () => {
  const organizationStructure = [
    {
      title: "President",
      name: "Arjun Gurung",
      image: "/static/drivers/3.jpg"
    },
    {
      title: "Vice-President", 
      name: "Lakpa Sherpa",
      image: "/static/drivers/14.jpg"
    },
    {
      title: "Secretary",
      name: "Nikesh Kafle", 
      image: "/static/drivers/16.jpg"
    },
    {
      title: "Assistant Secretary",
      name: "Ikashahang Nembang",
      image: "/static/person1.jpg"
    },
    {
      title: "Treasurer",
      name: "Lakpa Dorje Sherpa",
      image: "/static/guides/1-optimized.jpg"
    },
    {
      title: "Member",
      name: "Rabin Rai",
      image: "/static/guides/17-optimized.jpg"
    },
    {
      title: "Member",
      name: "Rupesh Gurung",
      image: "/static/drivers/5-optimized.jpg"
    },
    {
      title: "Member",
      name: "Dawa Gyalje Sherpa",
      image: "/static/guides/14-optimized.jpg"
    },
    {
      title: "Member",
      name: "JD Gurung",
      image: "/static/guides/jd.jpg"
    },
    {
      title: "Project Coordinator",
      name: "Prashant Giri",
      image: "/static/person2.jpg"
    },
    {
      title: "Information Officer",
      name: "Manjit Songmi",
      image: "/static/guides/21-optimized.jpg"
    },
    {
      title: "Content Creator",
      name: "Madhav",
      image: "/static/person3.jpg"
    }
  ]

  const governmentLogos = [
    {
      name: "Ilam Municipality",
      image: "/logos/government/ilam-municipality-logo.jpeg", 
      alt: "Ilam Municipality Logo"
    },
    {
      name: "Tourism Office Kakarvita",
      image: "/logos/government/nepal-government-logo.png",
      alt: "Tourism Office Kakarvita Logo"
    },
    {
      name: "Sandakpur Rural Municipality",
      image: "/logos/government/nepal-government-logo.png",
      alt: "Sandakpur Rural Municipality Logo"
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation 
        isHeroVisible={false} 
        activeSection="" 
        handleNavClick={() => {}} 
      />
      
      <div className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the team behind Visit Ilam and learn about our mission to promote 
            sustainable tourism in Nepal's beautiful tea capital.
          </p>
        </motion.div>

        {/* Organization Structure */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Guide, Porter & Driver Club
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {organizationStructure.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 text-center border border-green-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="w-40 h-40 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="text-white text-2xl font-bold hidden">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {member.title}
                  </h3>
                  <p className="text-green-600 font-medium text-lg">{member.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Government Partners */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Our Partners & Affiliations
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {governmentLogos.map((logo, index) => (
                                 <motion.div
                   key={index}
                   className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                   whileHover={{ y: -5, transition: { duration: 0.2 } }}
                 >
                   <div className="w-16 h-16 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                     <img 
                       src={logo.image} 
                       alt={logo.alt}
                       className="w-full h-full object-contain p-2"
                     />
                     <div className="hidden w-full h-full items-center justify-center">
                       <span className="text-gray-500 text-xs text-center font-medium">
                         {logo.name.split(' ').map(word => word[0]).join('')}
                       </span>
                     </div>
                   </div>
                   <p className="text-xs text-gray-600 text-center font-medium">
                     {logo.name}
                   </p>
                 </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Mission & Vision */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To promote sustainable tourism in Ilam by connecting visitors with experienced 
                local guides, reliable drivers, and professional porters while preserving the 
                natural beauty and cultural heritage of our region.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To establish Ilam as a premier tourism destination in Nepal, known for its 
                tea gardens, mountain views, and authentic local experiences, while creating 
                sustainable livelihoods for our community members.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Back to Home */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </motion.div>
        </div>
      </div>
      
      <Footer />
      <LiveChat />
    </div>
  )
}

export default AboutUsPage 