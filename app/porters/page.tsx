import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { porters } from '@/data/personnel.json'
import PorterCard from '@/components/PorterCard'
import "./porters.css"

function PortersPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation 
        isHeroVisible={false} 
        activeSection="" 
      />
      
      <div className="flex-1 pt-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-20">
          <h1 className="page-title text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
            Porters
          </h1>
          
          <div className="porter-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {porters.map((porter, idx) => (
              <PorterCard key={idx} porter={porter} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PortersPage
