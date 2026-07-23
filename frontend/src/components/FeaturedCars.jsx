import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'
import VehicleCard from './VehicleCard'

const mockFeaturedCars = [
  {
    _id: 'mock-corvette',
    make: 'Chevrolet',
    model: 'Corvette Stingray Z06',
    price: 19999000,
    quantity: 3,
    images: []
  },
  {
    _id: 'mock-gle',
    make: 'Mercedes-Benz',
    model: 'GLE Coupe 43 AMG',
    price: 11500000,
    quantity: 4,
    images: []
  },
  {
    _id: 'mock-creta',
    make: 'Hyundai',
    model: 'Creta SX (O) Turbo',
    price: 1980000,
    quantity: 12,
    images: []
  },
  {
    _id: 'mock-porsche',
    make: 'Porsche',
    model: 'Taycan Turbo S',
    price: 22500000,
    quantity: 2,
    images: []
  }
]

const FeaturedCars = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const fetchFeatured = async () => {
      try {
        const res = await axios.get('/vehicles')
        if (isMounted) {
          if (res.data && res.data.length > 0) {
            setCars(res.data.slice(0, 4))
          } else {
            setCars(mockFeaturedCars)
          }
        }
      } catch (err) {
        console.warn('API error fetching vehicles for showcase, loading mock vehicles.', err)
        if (isMounted) setCars(mockFeaturedCars)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchFeatured()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="bg-dark py-20 px-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex justify-between items-end mb-12 animate-slide-up">
          <div>
            <span className="text-primary text-xs font-medium tracking-[0.25em] uppercase font-sans">
              SHOWROOM
            </span>
            <h2 className="text-white text-3xl sm:text-4xl font-heading font-light tracking-tight mt-2">
              Featured Cars
            </h2>
          </div>

          <Link
            to="/inventory"
            className="text-primary hover:text-white transition-colors text-xs font-semibold tracking-wider font-sans uppercase flex items-center gap-1.5"
          >
            View All <span className="text-lg">→</span>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-slide-up">
            {cars.map((car) => (
              <VehicleCard key={car._id} vehicle={car} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default FeaturedCars
