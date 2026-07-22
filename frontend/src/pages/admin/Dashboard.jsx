import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'

const StatCard = ({ title, value, subtitle, color }) => (
  <div className="bg-darkgray rounded-xl p-6">
    <p className="text-gray-400 text-sm mb-2">{title}</p>
    <p className={`text-4xl font-bold mb-1 ${color || 'text-white'}`}>{value}</p>
    <p className="text-gray-500 text-xs">{subtitle}</p>
  </div>
)

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    totalStock: 0,
    lowStockAlerts: 0,
  })
  const [recentVehicles, setRecentVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get('/vehicles')
      const vehicles = res.data

      const totalStock = vehicles.reduce((sum, v) => sum + v.quantity, 0)
      const lowStock = vehicles.filter((v) => v.quantity <= 2).length

      setStats({
        totalVehicles: vehicles.length,
        totalStock,
        lowStockAlerts: lowStock,
      })

      // show 4 most recently added vehicles
      setRecentVehicles(vehicles.slice(-4).reverse())
    } catch (err) {
      console.log('Failed to fetch dashboard data', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  if (loading) return (
    <div className="text-center py-20">
      <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="flex min-h-screen bg-dark">

      {/* sidebar */}
      <div className="w-56 bg-darkgray border-r border-gray-800 px-4 py-6 flex flex-col gap-1">
        {[
          { label: 'Dashboard', to: '/admin/dashboard', active: true },
          { label: 'Vehicles', to: '/admin/manage-vehicles' },
          { label: 'Add Vehicle', to: '/admin/add-vehicle' },
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
      <div className="flex-1 px-8 py-6">
        <h1 className="text-white text-2xl font-bold mb-8">Dashboard</h1>

        {/* stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Vehicles"
            value={stats.totalVehicles}
            subtitle="View all vehicles"
            color="text-white"
          />
          <StatCard
            title="Total Stock"
            value={stats.totalStock}
            subtitle="View stock details"
            color="text-white"
          />
          <StatCard
            title="Low Stock Alerts"
            value={stats.lowStockAlerts}
            subtitle="View low stock"
            color="text-primary"
          />
        </div>

        {/* recent vehicles */}
        <div>
          <h2 className="text-white font-semibold text-lg mb-4">Recent Vehicles</h2>
          <div className="bg-darkgray rounded-xl overflow-hidden">
            {recentVehicles.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No vehicles added yet</p>
                <Link
                  to="/admin/add-vehicle"
                  className="text-primary hover:underline text-sm mt-2 block"
                >
                  Add your first vehicle
                </Link>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-gray-400 text-xs px-6 py-4">Make</th>
                    <th className="text-left text-gray-400 text-xs px-6 py-4">Model</th>
                    <th className="text-left text-gray-400 text-xs px-6 py-4">Category</th>
                    <th className="text-left text-gray-400 text-xs px-6 py-4">Price</th>
                    <th className="text-left text-gray-400 text-xs px-6 py-4">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {recentVehicles.map((v) => (
                    <tr key={v._id} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                      <td className="text-white text-sm px-6 py-4">{v.make}</td>
                      <td className="text-white text-sm px-6 py-4">{v.model}</td>
                      <td className="text-gray-400 text-sm px-6 py-4">{v.category}</td>
                      <td className="text-primary text-sm px-6 py-4">
                        ₹{v.price.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          v.quantity === 0
                            ? 'bg-red-900/40 text-red-400'
                            : v.quantity <= 2
                            ? 'bg-yellow-900/40 text-yellow-400'
                            : 'bg-green-900/40 text-green-400'
                        }`}>
                          {v.quantity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard