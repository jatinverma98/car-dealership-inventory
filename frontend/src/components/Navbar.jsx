import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-darkgray border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-primary font-bold text-xl">Auto</span>
          <span className="text-white font-bold text-xl">Deal Hub</span>
        </Link>

        {/* nav links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-primary transition-colors text-sm">
            Home
          </Link>
          <Link to="/" className="text-gray-300 hover:text-primary transition-colors text-sm">
            Inventory
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="text-gray-300 hover:text-primary transition-colors text-sm">
              Dashboard
            </Link>
          )}
        </div>

        {/* user section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-300 text-sm hidden md:block">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-primary text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-300 hover:text-primary text-sm transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-primary text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors">
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar