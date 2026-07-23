import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import { getImageUrl } from '../../utils/imageHelper'

const Purchases = () => {
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')



  useEffect(() => {
    let isMounted = true
    const loadPurchases = async () => {
      try {
        const res = await axios.get('/purchases')
        if (isMounted) setPurchases(res.data)
      } catch {
        if (isMounted) setError('Failed to load purchases')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    loadPurchases()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-dark">

      {/* sidebar */}
      <div className="w-56 bg-darkgray border-r border-gray-800 px-4 py-6 flex flex-col gap-1">
        {[
          { label: 'Dashboard', to: '/admin/dashboard' },
          { label: 'Vehicles', to: '/admin/manage-vehicles' },
          { label: 'Add Vehicle', to: '/admin/add-vehicle' },
          { label: 'Purchases', to: '/admin/purchases', active: true },
          { label: 'Restock', to: '/admin/restock' },
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
      <div className="flex-1 px-8 py-6 font-sans">
        <h1 className="text-white font-heading font-light text-3xl tracking-tight mb-8">All Purchases</h1>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-darkgray rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left text-gray-400 text-xs px-6 py-4">#</th>
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Vehicle</th>
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Buyer</th>
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Price</th>
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {purchases.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-10">
                      No purchases yet
                    </td>
                  </tr>
                ) : (
                  purchases.map((purchase, index) => {
                    const imageUrl = getImageUrl(purchase.vehicle || { make: purchase.make, model: purchase.model })

                    return (
                      <tr
                        key={purchase._id}
                        className="border-b border-gray-800 hover:bg-gray-800/20 transition-colors"
                      >
                        <td className="text-gray-500 text-sm px-6 py-4">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={imageUrl}
                              alt={purchase.make}
                              className="w-10 h-10 rounded-lg object-cover bg-dark"
                            />
                            <div>
                              <p className="text-white text-sm font-medium">
                                {purchase.make} {purchase.model}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-white text-sm">
                            {purchase.user?.name || 'Unknown'}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {purchase.user?.email}
                          </p>
                        </td>
                        <td className="text-primary text-sm px-6 py-4 font-medium">
                          ₹{purchase.price.toLocaleString('en-IN')}
                        </td>
                        <td className="text-gray-400 text-sm px-6 py-4">
                          {new Date(purchase.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Purchases