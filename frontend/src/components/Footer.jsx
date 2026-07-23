import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-16 px-6 border-t border-gray-900 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo and Description */}
        <div className="md:col-span-1.5 flex flex-col items-start">
          <Link to="/" className="flex items-center gap-1 group font-heading mb-4">
            <span className="text-white font-normal text-xl tracking-tight transition-colors duration-300 group-hover:text-primary">
              Auto Deal
            </span>
            <span className="bg-primary text-white font-semibold text-xs px-2 py-0.5 rounded transition-colors duration-300 group-hover:bg-primary-hover uppercase tracking-wider">
              Hub
            </span>
          </Link>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-2 font-normal max-w-xs">
            Auto Deal Hub is a premium dealership inventory management platform connecting buyers with vetted high-performance sports cars and luxury sedans.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-heading font-semibold uppercase text-xs tracking-widest mb-5">
            Quick Links
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm">
            <li>
              <Link to="/" className="hover:text-primary transition-colors text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/inventory" className="hover:text-primary transition-colors text-gray-400">
                Inventory
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition-colors text-gray-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info parameters */}
        <div>
          <h4 className="text-white font-heading font-semibold uppercase text-xs tracking-widest mb-5">
            Contact Us
          </h4>
          <ul className="space-y-4 text-xs sm:text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span className="truncate">sales@autodealhub.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>+1 (800) 555-0199</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>
                128 Showroom Avenue,<br />
                Suite 400, Beverly Hills, CA
              </span>
            </li>
          </ul>
        </div>

        {/* Business hours/details */}
        <div>
          <h4 className="text-white font-heading font-semibold uppercase text-xs tracking-widest mb-5">
            Showroom Hours
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm text-gray-400">
            <li className="flex justify-between">
              <span>Mon - Fri:</span>
              <span className="text-gray-300">9:00 AM - 7:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday:</span>
              <span className="text-gray-300">10:00 AM - 5:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday:</span>
              <span className="text-gray-300">Closed</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright border block */}
      <div className="max-w-7xl mx-auto border-t border-gray-900 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <p>© {new Date().getFullYear()} Auto Deal Hub. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
