import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleUpdate = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (form.password && form.password !== form.confirmPassword) {
      return setError('Passwords do not match')
    }

    setSaving(true)

    try {
      const updateData = { name: form.name, email: form.email }
      if (form.password) updateData.password = form.password

      const res = await axios.put('/users/profile', updateData)

      // update stored user with new name/email
      login({ ...user, name: res.data.name, email: res.data.email })
      setSuccess('Profile updated successfully!')
      setForm((prev) => ({ ...prev, password: '', confirmPassword: '' }))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    let isMounted = true
    const loadProfileData = async () => {
      try {
        const [profileRes, purchasesRes] = await Promise.all([
          axios.get('/users/profile'),
          axios.get('/purchases/my'),
        ])
        if (isMounted) {
          setForm((prev) => ({
            ...prev,
            name: profileRes.data.name,
            email: profileRes.data.email,
          }))
          setPurchases(purchasesRes.data)
        }
      } catch {
        if (isMounted) setError('Failed to load profile')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadProfileData()
    return () => {
      isMounted = false
    }
  }, [])

  if (loading) return (
    <div className="text-center py-20">
      <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 font-sans">
      <h1 className="text-white font-heading font-light text-3xl sm:text-4xl tracking-tight mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* left - profile card */}
        <div className="lg:col-span-1">
          <div className="bg-darkgray rounded-2xl border border-gray-800/80 p-6 text-center">

            {/* avatar */}
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-heading font-light mx-auto mb-4">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-white font-heading font-semibold text-lg">{user?.name}</h2>
            <p className="text-gray-400 text-sm mt-1">{user?.email}</p>

            <span className={`inline-block mt-3 text-xs px-3 py-1 rounded-full font-medium ${
              user?.role === 'admin'
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'bg-gray-700 text-gray-300'
            }`}>
              {user?.role === 'admin' ? '👑 Admin' : '👤 User'}
            </span>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-400">Total Purchases</span>
                <span className="text-white font-semibold">{purchases.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Member Since</span>
                <span className="text-[#ef4444] font-semibold text-xs">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                    month: 'short',
                    year: 'numeric',
                  }) : 'N/A'}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* right - edit form + purchase history */}
        <div className="lg:col-span-2 space-y-6">

          {/* edit profile form */}
          <div className="bg-darkgray rounded-xl p-6">
            <h2 className="text-white font-semibold text-lg mb-6">
              Edit Profile
            </h2>

            {error && (
              <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded mb-4 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-dark border border-gray-700 text-white px-4 py-2.5 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-gray-400 text-xs mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-dark border border-gray-700 text-white px-4 py-2.5 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="border-t border-gray-800 pt-4">
                <p className="text-gray-500 text-xs mb-3">
                  Leave password blank to keep current password
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="New password"
                      className="w-full bg-dark border border-gray-700 text-white px-4 py-2.5 rounded text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={form.confirmPassword}
                      onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                      placeholder="Confirm password"
                      className="w-full bg-dark border border-gray-700 text-white px-4 py-2.5 rounded text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-primary hover:bg-red-700 text-white py-3 rounded font-semibold transition-colors text-sm disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* purchase history */}
          <div className="bg-darkgray rounded-xl p-6">
            <h2 className="text-white font-semibold text-lg mb-4">
              My Purchase History
            </h2>

            {purchases.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-6">
                You haven't purchased any vehicles yet
              </p>
            ) : (
              <div className="space-y-3">
                {purchases.map((purchase) => {
                  const imageUrl =
                    purchase.vehicle?.images?.length > 0
                      ? `http://localhost:5000${purchase.vehicle.images[0]}`
                      : `https://source.unsplash.com/60x60/?${purchase.make},car`

                  return (
                    <div
                      key={purchase._id}
                      className="flex items-center gap-4 border-b border-gray-800 pb-3"
                    >
                      <img
                        src={imageUrl}
                        alt={purchase.make}
                        className="w-14 h-14 rounded-lg object-cover bg-dark"
                      />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">
                          {purchase.make} {purchase.model}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {new Date(purchase.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <p className="text-primary font-semibold text-sm">
                        ₹{purchase.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile