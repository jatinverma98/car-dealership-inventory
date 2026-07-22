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
    totalPurchases: 0,
    lowStockAlerts: 0,
  })
  const [recentPurchases, setRecentPurchases] = useState([])
  const [dailyPurchases, setDailyPurchases] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = async () => {
    try {
      const [vehiclesRes, purchaseStatsRes, allPurchasesRes] = await Promise.all([
        axios.get('/vehicles'),
        axios.get('/purchases/stats'),
        axios.get('/purchases'),
      ])

      const vehicles = vehiclesRes.data
      const totalStock = vehicles.reduce((sum, v) => sum + v.quantity, 0)
      const lowStock = vehicles.filter((v) => v.quantity <= 2).length

      setStats({
        totalVehicles: vehicles.length,
        totalStock,
        totalPurchases: purchaseStatsRes.data.totalPurchases,
        lowStockAlerts: lowStock,
      })

      setDailyPurchases(purchaseStatsRes.data.dailyPurchases)
      setRecentPurchases(allPurchasesRes.data.slice(0, 4))
    } catch (err) {
      console.log('Failed to fetch dashboard data', err.message)
    } finally {
      setLoading(false)
    }
  }

  // build last 7 days labels and match with data
  const getLast7Days = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      days.push(d.toISOString().split('T')[0])
    }
    return days
  }

  const chartData = getLast7Days().map((date) => {
    const found = dailyPurchases.find((d) => d._id === date)
    return { date: date.slice(5), count: found ? found.count : 0 }
  })

  const maxCount = Math.max(...chartData.map((d) => d.count), 1)

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
          { label: 'Purchases', to: '/admin/purchases' },
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Vehicles"
            value={stats.totalVehicles}
            subtitle="View all vehicles"
          />
          <StatCard
            title="Total Stock"
            value={stats.totalStock}
            subtitle="View stock details"
          />
          <StatCard
            title="Total Purchases"
            value={stats.totalPurchases}
            subtitle="View all purchases"
          />
          <StatCard
            title="Low Stock Alerts"
            value={stats.lowStockAlerts}
            subtitle="View low stock"
            color="text-primary"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* purchases chart */}
          <div className="bg-darkgray rounded-xl p-6">
            <h2 className="text-white font-semibold mb-6">
              Purchases Overview (Last 7 Days)
            </h2>
            <div className="flex items-end gap-2 h-32">
              {chartData.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-primary rounded-t transition-all duration-500"
                    style={{
                      height: `${(day.count / maxCount) * 100}%`,
                      minHeight: day.count > 0 ? '8px' : '2px',
                      opacity: day.count > 0 ? 1 : 0.2,
                    }}
                  />
                  <span className="text-gray-500 text-xs">{day.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* recent purchases */}
          <div className="bg-darkgray rounded-xl p-6">
            <h2 className="text-white font-semibold mb-4">Recent Purchases</h2>
            {recentPurchases.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">
                No purchases yet
              </p>
            ) : (
              <div className="space-y-3">
                {recentPurchases.map((purchase) => {
                  const imageUrl =
                    purchase.vehicle?.images?.length > 0
                      ? `http://localhost:5000${purchase.vehicle.images[0]}`
                      : `https://source.unsplash.com/60x60/?${purchase.make},car`

                  return (
                    <div
                      key={purchase._id}
                      className="flex items-center gap-3 border-b border-gray-800 pb-3"
                    >
                      <img
                        src={imageUrl}
                        alt={purchase.make}
                        className="w-12 h-12 rounded-lg object-cover bg-dark"
                      />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">
                          {purchase.make} {purchase.model}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(purchase.createdAt).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <p className="text-primary text-sm font-semibold">
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

export default Dashboard