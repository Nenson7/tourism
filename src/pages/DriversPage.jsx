import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import LiveChat from '../components/LiveChat'
import personnelData from '../data/personnel.json'
import DriverCard from '../components/DriverCard'

function DriversPage() {

  const { drivers } = personnelData;
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation
        isHeroVisible={false}
        activeSection=""
        handleNavClick={() => { }}
      />

      <div className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Drivers</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drivers.map((driver, idx) => (
              <DriverCard key={idx} driver={driver} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <LiveChat />
    </div>
  )
}

export default DriversPage 
