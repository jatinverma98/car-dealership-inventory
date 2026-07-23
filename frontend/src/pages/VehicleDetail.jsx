import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import { getImageUrl } from '../utils/imageHelper'

const VehicleDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [vehicle, setVehicle] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [purchasing, setPurchasing] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')



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
    let isMounted = true
    const loadVehicle = async () => {
      try {
        const res = await axios.get(`/vehicles/${id}`)
        if (isMounted) setVehicle(res.data)
      } catch {
        if (isMounted) setError('Vehicle not found')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadVehicle()
    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) return (
    <div className="text-center py-20">
      <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="text-center py-20">
      <p className="text-red-400">{error}</p>
      <button
        onClick={() => navigate('/')}
        className="text-primary mt-4 hover:underline text-sm block mx-auto"
      >
        Go Back
      </button>
    </div>
  )

  const mainImage = getImageUrl(vehicle)
  const images = vehicle.images && vehicle.images.length > 0
    ? vehicle.images.map((img) => typeof img === 'string' && (img.startsWith('http://') || img.startsWith('https://')) ? img : `http://localhost:5000${img}`)
    : [mainImage]

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

        {/* left - images */}
        <div>
          <div className="rounded-xl overflow-hidden h-80 bg-darkgray">
            <img
              src={images[activeImage]}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`rounded-lg overflow-hidden h-16 cursor-pointer border-2 transition-colors ${
                    activeImage === i ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* right - details */}
        <div className="bg-darkgray rounded-2xl border border-gray-800/80 p-7 font-sans">

          <div className="flex items-start justify-between mb-6">
            <h1 className="text-white font-heading font-normal text-3xl tracking-tight">
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

          <div className="space-y-3 mb-6">
            {[
              { label: 'Category', value: vehicle.category },
              { label: 'Make', value: vehicle.make },
              { label: 'Model', value: vehicle.model },
              { label: 'Price', value: `₹${vehicle.price.toLocaleString('en-IN')}` },
              { label: 'Stock Available', value: vehicle.quantity },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center border-b border-gray-800 pb-3">
                <span className="text-gray-400 text-sm w-40 font-medium">{label}</span>
                <span className={`text-sm ${
                  label === 'Price' ? 'text-primary font-heading font-bold text-xl' : 'text-white font-medium'
                }`}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {vehicle.description && (
            <div className="mb-6">
              <p className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-2">
                Description
              </p>
              <p className="text-gray-300 font-normal text-sm leading-relaxed max-w-[650px]">
                {vehicle.description}
              </p>
            </div>
          )}

          {message && (
            <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-xl mb-4 text-sm font-medium">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handlePurchase}
              disabled={vehicle.quantity === 0 || purchasing}
              className="flex-1 bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-primary/10"
            >
              {purchasing
                ? 'Processing...'
                : vehicle.quantity === 0
                ? 'Out of Stock'
                : 'Purchase'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors"
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