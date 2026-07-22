import { useState, useEffect } from 'react'
import axios from '../api/axios'
import VehicleCard from '../components/VehicleCard'
import SearchFilters from '../components/SearchFilters'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  const [filters, setFilters] = useState({
    make: '',
    model: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  })

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/vehicles')
      setVehicles(res.data)
    } catch (err) {
      setError('Failed to load vehicles')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    try {
      setLoading(true)
      const params = {}
      if (filters.make) params.make = filters.make
      if (filters.model) params.model = filters.model
      if (filters.category) params.category = filters.category
      if (filters.minPrice) params.minPrice = filters.minPrice
      if (filters.maxPrice) params.maxPrice = filters.maxPrice

      const res = await axios.get('/vehicles/search', { params })
      setVehicles(res.data)
    } catch (err) {
      setError('Search failed')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFilters({ make: '', model: '', category: '', minPrice: '', maxPrice: '' })
    fetchVehicles()
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* welcome banner */}
      <div className="relative rounded-xl overflow-hidden mb-8 h-64">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&auto=format&fit=crop"
          alt="banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent flex items-center px-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Find Your <br />
              <span className="text-primary">Perfect Car</span>
            </h1>
            <p className="text-gray-300 text-sm">
              Browse our wide range of quality vehicles and drive your dream today.
            </p>
          </div>
        </div>
      </div>

      {/* search filters */}
      <SearchFilters
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* vehicles grid */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-xl">
          Available Vehicles
          <span className="text-gray-500 text-sm font-normal ml-2">
            ({vehicles.length} found)
          </span>
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 mt-4">Loading vehicles...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchVehicles}
            className="mt-4 text-primary hover:underline text-sm"
          >
            Try again
          </button>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No vehicles found</p>
          <p className="text-gray-600 text-sm mt-2">Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} />
          ))}
        </div>
      )}

    </div>
  )
}

export default Home