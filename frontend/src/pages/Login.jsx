import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import axios from '../api/axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await axios.post('/auth/login', { email, password })
      login(res.data)
      if (res.data.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-[#0f0f0f] flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden font-sans text-white"
    >
      
      {/* Mobile-only Background Image Cover */}
      <div className="absolute inset-0 z-0 sm:hidden block">
        <img
          src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1000&auto=format&fit=crop"
          alt="mobile car bg"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-[#0f0f0f]" />
      </div>

      {/* LEFT COLUMN: Luxury Sports Car Background & Branding (55% width) */}
      <div className="relative hidden sm:flex flex-col justify-center py-16 px-8 sm:px-16 min-h-[45vh] lg:min-h-screen lg:w-[55%] overflow-hidden bg-black shrink-0">
        
        {/* Background Image with Slow Zoom */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1600&auto=format&fit=crop"
            alt="Cinematic Sports Car"
            className="w-full h-full object-cover opacity-60"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-[#0f0f0f]/35" />
        </div>

        {/* Headlight Glowing Effects */}
        <div className="absolute top-[58%] left-[23%] w-[130px] h-[130px] bg-primary/20 rounded-full blur-[50px] animate-pulse pointer-events-none" />
        <div className="absolute top-[58%] left-[68%] w-[130px] h-[130px] bg-primary/20 rounded-full blur-[50px] animate-pulse pointer-events-none" />

        {/* Floating Particles */}
        {[
          { top: '25%', left: '35%', duration: 7 },
          { top: '45%', left: '60%', duration: 10 },
          { top: '65%', left: '20%', duration: 8 },
          { top: '30%', left: '75%', duration: 11 },
          { top: '70%', left: '50%', duration: 9 },
          { top: '15%', left: '40%', duration: 6 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full pointer-events-none"
            style={{
              top: p.top,
              left: p.left
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.15, 0.7, 0.15]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Sweeping reflection effect across the car */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_6s_infinite] pointer-events-none" />

        {/* Content Section (Slides from Left) */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-lg"
        >
          <span className="text-primary font-sans text-xs font-medium tracking-[0.25em] uppercase">
            AUTO DEAL HUB
          </span>
          <h1 className="text-white font-heading font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight mt-2 mb-4">
            Find Your Next Car
          </h1>
          <p className="text-gray-300 font-normal text-sm sm:text-base leading-relaxed mb-8 max-w-[650px]">
            Browse quality vehicles from trusted brands and drive home with confidence.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              to="/inventory"
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all duration-300 font-sans hover:scale-105 active:scale-95 shadow-md shadow-primary/20"
            >
              Browse Inventory
            </Link>
            <Link
              to="/contact"
              className="border border-white/20 hover:border-primary hover:bg-primary/5 text-white text-xs font-semibold uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all duration-300 font-sans hover:scale-105 active:scale-95"
            >
              Contact Us
            </Link>
          </div>

          {/* Underneath Statistics */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full max-w-sm">
            <div>
              <div className="text-white font-heading font-light text-2xl">500+</div>
              <div className="text-gray-400 text-[10px] uppercase font-medium tracking-wider font-sans mt-1">Cars</div>
            </div>
            <div>
              <div className="text-white font-heading font-light text-2xl">50+</div>
              <div className="text-gray-400 text-[10px] uppercase font-medium tracking-wider font-sans mt-1">Brands</div>
            </div>
            <div>
              <div className="text-white font-heading font-light text-2xl">1000+</div>
              <div className="text-gray-400 text-[10px] uppercase font-medium tracking-wider font-sans mt-1">Customers</div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* RIGHT COLUMN: Glassmorphism Login Card (45% width) */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-16 px-6 lg:w-[45%] lg:min-h-screen">
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-md bg-[rgba(20,20,20,0.85)] backdrop-blur-lg border border-gray-800/40 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-black font-sans"
        >
          
          <div className="mb-8">
            <h2 className="text-white font-heading font-light text-3xl tracking-tight leading-none">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-sm mt-2 font-normal">
              Login to continue to your dashboard
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-950/40 border border-primary/40 text-red-300 px-4 py-3.5 rounded-xl mb-6 text-xs leading-relaxed"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label className="text-gray-400 text-xs font-medium tracking-wide uppercase mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#181818] border border-transparent text-white pl-11 pr-4 py-3.5 rounded-xl placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all duration-300 text-sm font-sans"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-gray-400 text-xs font-medium tracking-wide uppercase mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-[#181818] border border-transparent text-white pl-11 pr-11 py-3.5 rounded-xl placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all duration-300 text-sm font-sans"
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 focus:outline-none transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-sans font-semibold uppercase tracking-wider text-xs shadow-lg shadow-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>

          </form>

          {/* Registration Footer Link */}
          <p className="text-gray-500 text-xs text-center mt-8 font-sans">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary font-semibold hover:underline transition-all"
            >
              Register
            </Link>
          </p>

        </motion.div>
      </div>

    </motion.div>
  )
}

export default Login