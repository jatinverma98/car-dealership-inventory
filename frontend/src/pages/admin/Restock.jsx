import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'

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
    } catch (err) {
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

  const selectedVehicleData = vehicles.find((v) => v._id === selectedVehicle)

  useEffect(() => {
    fetchVehicles()
  }, [])

  return (
    <div className="flex min-h-screen bg-dark">

      {/* sidebar */}
      <div className="w-56 bg-darkgray border-r border-gray-800 px-4 py-6 flex flex-col gap-1">
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

      {/* main content */}
      <div className="flex-1 px-8 py-6">
        <h1 className="text-white text-2xl font-bold mb-8">Restock Vehicle</h1>

        <div className="bg-darkgray rounded-xl p-8 max-w-lg">

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded mb-6 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleRestock} className="space-y-5">

            <div>
              <label className="text-gray-400 text-xs mb-1 block">Vehicle</label>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                required
                className="w-full bg-dark border border-gray-700 text-white px-4 py-2.5 rounded text-sm focus:outline-none focus:border-primary transition-colors"
              >
                <option value="">Select a vehicle</option>
                {vehicles.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.make} {v.model} (Stock: {v.quantity})
                  </option>
                ))}
              </select>
            </div>

            {/* show current stock of selected vehicle */}
            {selectedVehicleData && (
              <div className="bg-dark rounded-lg px-4 py-3 border border-gray-700">
                <p className="text-gray-400 text-xs">Current Stock</p>
                <p className={`text-lg font-bold mt-1 ${
                  selectedVehicleData.quantity === 0
                    ? 'text-red-400'
                    : selectedVehicleData.quantity <= 2
                    ? 'text-yellow-400'
                    : 'text-green-400'
                }`}>
                  {selectedVehicleData.quantity} units
                </p>
              </div>
            )}

            <div>
              <label className="text-gray-400 text-xs mb-1 block">Quantity to Add</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter quantity"
                min="1"
                required
                className="w-full bg-dark border border-gray-700 text-white px-4 py-2.5 rounded text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs mb-1 block">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter notes"
                rows={3}
                className="w-full bg-dark border border-gray-700 text-white px-4 py-2.5 rounded text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                to="/admin/dashboard"
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded font-semibold transition-colors text-sm text-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary hover:bg-red-700 text-white py-3 rounded font-semibold transition-colors text-sm disabled:opacity-50"
              >
                {loading ? 'Restocking...' : 'Restock'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Restock