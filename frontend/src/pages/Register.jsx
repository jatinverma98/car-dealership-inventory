import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from '../api/axios'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      return setError('Passwords do not match')
    }

    setLoading(true)

    try {
      const res = await axios.post('/auth/register', { name, email, password })
      login(res.data)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark flex">

      {/* left side image */}
      <div className="hidden lg:flex w-1/2 bg-darkgray items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-darkgray to-black opacity-90" />
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop"
          alt="car"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center px-8 font-sans">
          <h1 className="text-4xl sm:text-5xl font-heading font-light text-white mb-4 tracking-tight">
            Join <span className="text-primary font-normal">Auto Deal Hub</span>
          </h1>
          <p className="text-gray-300 font-normal text-base sm:text-lg max-w-[650px] leading-relaxed">
            Register to explore our premium collection
          </p>
        </div>
      </div>

      {/* right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 font-sans">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-heading font-light text-white mb-2 tracking-tight">Create Account</h2>
          <p className="text-gray-400 font-normal text-sm mb-8">Register to get started</p>

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-3.5 rounded-xl mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full bg-darkgray border border-gray-700 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-primary transition-colors placeholder-gray-600 font-sans text-sm"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-darkgray border border-gray-700 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-primary transition-colors placeholder-gray-600 font-sans text-sm"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-darkgray border border-gray-700 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-primary transition-colors placeholder-gray-600 font-sans text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs font-medium"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-2 block">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="w-full bg-darkgray border border-gray-700 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-primary transition-colors placeholder-gray-600 font-sans text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/10"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>

          </form>

          <p className="text-gray-400 text-xs text-center mt-8 font-sans">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Register