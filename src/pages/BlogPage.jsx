import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import LiveChat from '../components/LiveChat'

function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navigation
        isHeroVisible={false}
        activeSection=""
        handleNavClick={() => { }}
      />

      <div className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Blog</h1>
          <div className="flex justify-center items-center h-64">
            <span className="text-2xl text-gray-500 font-semibold">Coming Soon</span>
          </div>
        </div>
      </div>

      <Footer />
      <LiveChat />
    </div>
  )
}

export default BlogPage;