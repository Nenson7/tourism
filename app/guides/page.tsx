import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LiveChat from '@/components/LiveChat'
import { guides } from '@/data/personnel.json'
import GuideCard from '@/components/GuideCard'
import './guide.css' // 👈 import custom CSS

function GuidesPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col page-fadeIn">
      <Navigation
        isHeroVisible={false}
        activeSection=""
      />

      <div className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center title-slideInUp">
            Guides
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 stagger">
            {guides.map((guide, idx) => (
              <div key={idx} className="card-hover">
                <GuideCard guide={guide} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <LiveChat />
    </div>
  )
}

export default GuidesPage
