import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import AdminVehicleCard from '../../components/AdminVehicleCard'

const Restock = () => {
  const [vehicles, setVehicles] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [amount, setAmount] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchVehicles = async () => {
    try {
      const res = await axios.get('/vehicles')
      setVehicles(res.data)
    } catch {
      setError('Failed to load vehicles')
    }
  }

  const handleRestock = async (e) => {
    e.preventDefault()
    if (!selectedVehicle || !amount) {
      return setError('Please select a vehicle and enter an amount')
    }
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await axios.post(`/vehicles/${selectedVehicle}/restock`, {
        amount: Number(amount),
      })
      setSuccess(`Successfully restocked ${amount} units!`)
      setAmount('')
      setNotes('')
      fetchVehicles()
    } catch (err) {
      setError(err.response?.data?.message || 'Restock failed')
    } finally {
      setLoading(false)
    }
  }

  const handleVehicleUpdated = (updatedVehicle) => {
    setVehicles(vehicles.map((v) => (v._id === updatedVehicle._id ? updatedVehicle : v)))
  }

  const selectedVehicleData = vehicles.find((v) => v._id === selectedVehicle)

  useEffect(() => {
    let isMounted = true
    const loadVehiclesData = async () => {
      try {
        const res = await axios.get('/vehicles')
        if (isMounted) setVehicles(res.data)
      } catch {
        if (isMounted) setError('Failed to load vehicles')
      }
    }
    loadVehiclesData()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-dark text-white font-sans">

      {/* Sidebar */}
      <div className="w-56 bg-darkgray border-r border-gray-800 px-4 py-6 flex flex-col gap-1 shrink-0">
        {[
          { label: 'Dashboard', to: '/admin/dashboard' },
          { label: 'Vehicles', to: '/admin/manage-vehicles' },
          { label: 'Add Vehicle', to: '/admin/add-vehicle' },
          { label: 'Restock', to: '/admin/restock', active: true },
          { label: 'Back to Home', to: '/' },
        ].map(({ label, to, active }) => (
          <Link
            key={label}
            to={to}
            className={`px-4 py-2.5 rounded text-sm font-medium transition-colors ${
              active
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-6 space-y-10 font-sans">
        
        <div>
          <h1 className="text-white font-heading font-light text-3xl tracking-tight">Restock Vehicles</h1>
          <p className="text-gray-300 font-normal text-xs mt-1">Adjust stock levels using quick-click cards or bulk forms.</p>
        </div>

        {/* Quick Click Stock Adjustment Cards */}
        <div className="space-y-4">
          <h2 className="text-white font-heading font-semibold text-lg">
            Quick Stock Adjustments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <AdminVehicleCard
                key={v._id}
                vehicle={v}
                onUpdate={handleVehicleUpdated}
              />
            ))}
          </div>
        </div>

        {/* Bulk Restock Form */}
        <div className="bg-darkgray border border-gray-800 rounded-2xl p-8 max-w-xl shadow-xl">
          <h2 className="text-white font-space font-bold text-lg mb-4 uppercase">
            Bulk Restock Form
          </h2>

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-xl mb-6 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleRestock} className="space-y-5">

            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider font-space mb-1 block">
                Select Vehicle
              </label>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                required
                className="w-full bg-dark border border-gray-700 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select a vehicle</option>
                {vehicles.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.make} {v.model} (Current Stock: {v.quantity})
                  </option>
                ))}
              </select>
            </div>

            {/* Show Current Stock of Selected Vehicle */}
            {selectedVehicleData && (
              <div className="bg-dark rounded-xl px-4 py-3 border border-gray-800 flex justify-between items-center">
                <span className="text-gray-400 text-xs font-space uppercase">Selected Unit Stock</span>
                <span className={`text-xl font-bold font-space ${
                  selectedVehicleData.quantity === 0
                    ? 'text-red-400'
                    : selectedVehicleData.quantity <= 2
                    ? 'text-yellow-400'
                    : 'text-green-400'
                }`}>
                  {selectedVehicleData.quantity} units
                </span>
              </div>
            )}

            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider font-space mb-1 block">
                Quantity to Add
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter quantity"
                min="1"
                required
                className="w-full bg-dark border border-gray-700 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs font-semibold uppercase tracking-wider font-space mb-1 block">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter notes"
                rows={3}
                className="w-full bg-dark border border-gray-700 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                to="/admin/dashboard"
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-colors text-xs uppercase font-space tracking-wider text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-colors text-xs uppercase font-space tracking-wider disabled:opacity-50 shadow-md shadow-primary/20"
              >
                {loading ? 'Restocking...' : 'Restock Units'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Restock