import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-white">
      <div className="container py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-3">Guides, Porters and Drivers</h3>
            <p className="text-gray-400 text-sm">
              Discover the beauty of Nepal's tea capital with our local guides and drivers.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-3">Quick Links</h4>
                         <ul className="space-y-1 text-sm">
               <li><a href="#hero" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
               <li><a href="#about-ilam" className="text-gray-400 hover:text-white transition-colors duration-300">About Ilam</a></li>
               <li><a href="#featured-destinations" className="text-gray-400 hover:text-white transition-colors duration-300">Destinations</a></li>
               <li><a href="#map" className="text-gray-400 hover:text-white transition-colors duration-300">Map</a></li>
               <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</Link></li>
             </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-3">Services</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/guides" className="text-gray-400 hover:text-white transition-colors duration-300">Local Guides (23)</Link></li>
              <li><Link to="/drivers" className="text-gray-400 hover:text-white transition-colors duration-300">Drivers (17)</Link></li>
              <li><Link to="/porters" className="text-gray-400 hover:text-white transition-colors duration-300">Porters (Coming Soon)</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400">+977 9841234567</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400">info@visitilamm.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-400 text-sm">
          <p className="text-green-600 font-bold mb-2">&copy; {new Date().getFullYear()} Visit Ilam. All rights reserved.</p>
          <p>Created with ❤️ by <a target="_blank" className="text-white" href="https://www.facebook.com/x.nenson">@Nenson</a> & <a target="_blank" className="text-white" href="https://www.facebook.com/21Magh2076">@Purna_rai</a></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 
