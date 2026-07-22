import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'

const VehicleDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const fetchVehicle = async () => {
    try {
      const res = await axios.get(`/vehicles/${id}`)
      setVehicle(res.data)
    } catch (err) {
      setError('Vehicle not found')
    } finally {
      setLoading(false)
    }
  }

  const handlePurchase = async () => {
    try {
      setPurchasing(true)
      setMessage('')
      setError('')
      const res = await axios.post(`/vehicles/${id}/purchase`)
      setVehicle(res.data)
      setMessage('Purchase successful! 🎉')
    } catch (err) {
      setError(err.response?.data?.message || 'Purchase failed')
    } finally {
      setPurchasing(false)
    }
  }

  useEffect(() => {
    fetchVehicle()
  }, [id])

  if (loading) return (
    <div className="text-center py-20">
      <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="text-center py-20">
      <p className="text-red-400">{error}</p>
      <button onClick={() => navigate('/')} className="text-primary mt-4 hover:underline text-sm block mx-auto">
        Go Back
      </button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* breadcrumb */}
      <div className="text-gray-500 text-sm mb-6">
        <span
          onClick={() => navigate('/')}
          className="hover:text-primary cursor-pointer transition-colors"
        >
          Home
        </span>
        <span className="mx-2">/</span>
        <span
          onClick={() => navigate('/')}
          className="hover:text-primary cursor-pointer transition-colors"
        >
          Inventory
        </span>
        <span className="mx-2">/</span>
        <span className="text-white">{vehicle.make} {vehicle.model}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* left - image */}
        <div>
          <div className="rounded-xl overflow-hidden h-80 bg-darkgray">
            <img
              src={`https://source.unsplash.com/800x600/?${vehicle.make},${vehicle.model},car`}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* thumbnail row */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden h-16 bg-darkgray">
                <img
                  src={`https://source.unsplash.com/200x150/?${vehicle.make},car,${i}`}
                  alt="thumbnail"
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 cursor-pointer transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* right - details */}
        <div className="bg-darkgray rounded-xl p-6">

          <div className="flex items-start justify-between mb-6">
            <h1 className="text-white text-2xl font-bold">
              {vehicle.make} {vehicle.model}
            </h1>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
              vehicle.quantity > 0
                ? 'bg-green-900/40 text-green-400 border border-green-700'
                : 'bg-red-900/40 text-red-400 border border-red-700'
            }`}>
              {vehicle.quantity > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* specs table */}
          <div className="space-y-3 mb-6">
            {[
              { label: 'Category', value: vehicle.category },
              { label: 'Make', value: vehicle.make },
              { label: 'Model', value: vehicle.model },
              { label: 'Price', value: `₹${vehicle.price.toLocaleString('en-IN')}` },
              { label: 'Stock Available', value: vehicle.quantity },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center border-b border-gray-800 pb-3">
                <span className="text-gray-400 text-sm w-40">{label}</span>
                <span className={`text-sm font-medium ${label === 'Price' ? 'text-primary' : 'text-white'}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* description */}
          {vehicle.description && (
            <div className="mb-6">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Description</p>
              <p className="text-gray-300 text-sm leading-relaxed">{vehicle.description}</p>
            </div>
          )}

          {/* success / error messages */}
          {message && (
            <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded mb-4 text-sm">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {/* action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePurchase}
              disabled={vehicle.quantity === 0 || purchasing}
              className="flex-1 bg-primary hover:bg-red-700 text-white py-3 rounded font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {purchasing ? 'Processing...' : vehicle.quantity === 0 ? 'Out of Stock' : 'Purchase'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded font-semibold transition-colors"
            >
              Go Back
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default VehicleDetail