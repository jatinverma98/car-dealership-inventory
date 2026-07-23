import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // --- 1. AUTHENTICATED DASHBOARD NAVBAR ---
  if (user) {
    return (
      <nav className={`px-6 py-4 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#111111]/95 backdrop-blur-md border-b border-gray-800/60 shadow-lg' 
          : 'bg-[#111111] border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <Link to="/" className="flex items-center gap-1.5 font-heading group">
            <span className="text-white font-normal text-xl tracking-tight transition-colors duration-300 group-hover:text-[#ef4444]">
              Auto Deal
            </span>
            <span className="bg-[#ef4444] text-white font-semibold text-xs px-2 py-0.5 rounded transition-colors duration-300 group-hover:bg-[#dc2626] uppercase tracking-wider">
              Hub
            </span>
          </Link>

          {/* Center: Dashboard Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-[#ef4444] transition-all duration-300 text-sm font-medium tracking-wide relative group"
            >
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ef4444] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/inventory"
              className="text-gray-300 hover:text-[#ef4444] transition-all duration-300 text-sm font-medium tracking-wide relative group"
            >
              Inventory
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ef4444] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/profile"
              className="text-gray-300 hover:text-[#ef4444] transition-all duration-300 text-sm font-medium tracking-wide relative group"
            >
              My Purchases
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ef4444] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              to="/profile"
              className="text-gray-300 hover:text-[#ef4444] transition-all duration-300 text-sm font-medium tracking-wide relative group"
            >
              Favorites
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ef4444] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {user?.role === 'admin' && (
              <Link
                to="/admin/dashboard"
                className="text-gray-300 hover:text-[#ef4444] transition-all duration-300 text-sm font-medium tracking-wide relative group"
              >
                Admin
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ef4444] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </div>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-5">
            {/* Notification Bell */}
            <button className="text-gray-400 hover:text-[#ef4444] transition-colors relative p-1.5 focus:outline-none rounded-full hover:bg-gray-800/30">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full" />
            </button>

            {/* Profile Avatar & Initials */}
            <Link
              to="/profile"
              className="flex items-center gap-2 text-gray-300 hover:text-[#ef4444] transition-colors font-medium text-sm group"
            >
              <div className="w-8 h-8 rounded-full bg-[#ef4444] flex items-center justify-center text-white text-xs font-bold shadow-md shadow-[#ef4444]/20 group-hover:scale-105 transition-transform">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-semibold">{user.name}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-[#ef4444] text-sm font-medium transition-colors duration-300 ml-2"
            >
              Logout
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-[#111111] border-t border-gray-800 py-4 space-y-3 px-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-[#ef4444] text-sm font-medium py-1"
            >
              Dashboard
            </Link>
            <Link
              to="/inventory"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-[#ef4444] text-sm font-medium py-1"
            >
              Inventory
            </Link>
            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-[#ef4444] text-sm font-medium py-1"
            >
              My Purchases
            </Link>
            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-[#ef4444] text-sm font-medium py-1"
            >
              Favorites
            </Link>
            
            <hr className="border-gray-800 my-2" />

            <div className="flex flex-col gap-3 pt-1">
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-gray-300 hover:text-[#ef4444] text-sm font-medium"
              >
                <div className="w-8 h-8 rounded-full bg-[#ef4444] flex items-center justify-center text-white text-xs font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span>{user.name}</span>
              </Link>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleLogout()
                }}
                className="block w-full text-left text-gray-400 hover:text-[#ef4444] text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    )
  }

  // --- 2. LOGGED-OUT PUBLIC NAVBAR ---
  return (
    <nav className={`px-6 py-4 sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#000000]/95 backdrop-blur-md border-b border-gray-900 shadow-lg' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 group font-heading">
          <span className="text-white font-normal text-xl tracking-tight transition-colors duration-300 group-hover:text-primary">
            Auto Deal
          </span>
          <span className="bg-primary text-white font-semibold text-xs px-2 py-0.5 rounded transition-colors duration-300 group-hover:bg-primary-hover uppercase tracking-wider">
            Hub
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-300 hover:text-primary transition-all duration-300 text-sm font-medium tracking-wide relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/inventory"
            className="text-gray-300 hover:text-primary transition-all duration-300 text-sm font-medium tracking-wide relative group"
          >
            Inventory
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/about"
            className="text-gray-300 hover:text-primary transition-all duration-300 text-sm font-medium tracking-wide relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>

          <Link
            to="/contact"
            className="text-gray-300 hover:text-primary transition-all duration-300 text-sm font-medium tracking-wide relative group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-300 hover:text-primary text-sm font-medium tracking-wide transition-colors duration-300"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shadow-primary/10"
          >
            Register
          </Link>
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-400 hover:text-white transition-colors focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-black border-t border-gray-900 py-4 space-y-3 px-2">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-primary text-sm font-medium py-1"
          >
            Home
          </Link>
          <Link
            to="/inventory"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-primary text-sm font-medium py-1"
          >
            Inventory
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-primary text-sm font-medium py-1"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-300 hover:text-primary text-sm font-medium py-1"
          >
            Contact
          </Link>

          <hr className="border-gray-900 my-2" />

          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center text-gray-300 hover:text-primary text-sm font-medium py-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center bg-primary hover:bg-primary-hover text-white py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar