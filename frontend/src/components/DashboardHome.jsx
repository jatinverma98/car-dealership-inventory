import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Car, 
  ClipboardList, 
  Heart, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Activity,
  Award
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import axios from '../api/axios'
import { getImageUrl } from '../utils/imageHelper'

const fallbackVehicles = [
  { _id: 'v1', make: 'Chevrolet', model: 'Corvette Stingray Z06', price: 19999000, category: 'Coupe', fuelType: 'Petrol', transmission: 'Automatic', mileage: '12,000 km', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&auto=format&fit=crop' },
  { _id: 'v2', make: 'Mercedes-Benz', model: 'GLE Coupe 43 AMG', price: 11500000, category: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', mileage: '18,500 km', image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&auto=format&fit=crop' },
  { _id: 'v3', make: 'Porsche', model: 'Taycan Turbo S', price: 22500000, category: 'Sedan', fuelType: 'Electric', transmission: 'Automatic', mileage: '8,200 km', image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&auto=format&fit=crop' },
  { _id: 'v4', make: 'BMW', model: 'M4 Competition xDrive', price: 15300000, category: 'Coupe', fuelType: 'Petrol', transmission: 'Automatic', mileage: '10,000 km', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop' },
  { _id: 'v5', make: 'Audi', model: 'Q7 Quattro RS', price: 9450000, category: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', mileage: '24,000 km', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop' },
  { _id: 'v6', make: 'Ford', model: 'Mustang GT V8', price: 8900000, category: 'Coupe', fuelType: 'Petrol', transmission: 'Automatic', mileage: '15,000 km', image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=600&auto=format&fit=crop' },
  { _id: 'v7', make: 'Land Rover', model: 'Range Rover Velar', price: 8990000, category: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', mileage: '21,000 km', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&auto=format&fit=crop' },
  { _id: 'v8', make: 'Toyota', model: 'Fortuner Legender 4x4', price: 4650000, category: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', mileage: '28,000 km', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop' },
  { _id: 'v9', make: 'Mahindra', model: 'Thar LX 4x4 Hardtop', price: 1825000, category: 'SUV', fuelType: 'Diesel', transmission: 'Manual', mileage: '19,000 km', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop' },
  { _id: 'v10', make: 'Hyundai', model: 'Creta SX (O) Turbo', price: 1980000, category: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', mileage: '14,000 km', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&auto=format&fit=crop' },
  { _id: 'v11', make: 'Honda', model: 'City ZX i-VTEC', price: 1695000, category: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', mileage: '22,000 km', image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&auto=format&fit=crop' },
  { _id: 'v12', make: 'Lamborghini', model: 'Huracán EVO Spyder', price: 37500000, category: 'Supercar', fuelType: 'Petrol', transmission: 'Automatic', mileage: '4,500 km', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format&fit=crop' },
  { _id: 'v13', make: 'Jaguar', model: 'F-Type R-Dynamic', price: 14500000, category: 'Coupe', fuelType: 'Petrol', transmission: 'Automatic', mileage: '9,800 km', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop' },
  { _id: 'v14', make: 'Tesla', model: 'Model S Plaid', price: 17500000, category: 'Electric', fuelType: 'Electric', transmission: 'Automatic', mileage: '6,000 km', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&auto=format&fit=crop' }
]

const DashboardHome = () => {
  const { user } = useAuth()
  const [vehicles, setVehicles] = useState([])
  const [purchasingId, setPurchasingId] = useState(null)
  const [purchaseSuccessMessage, setPurchaseSuccessMessage] = useState('')

  useEffect(() => {
    let isMounted = true
    const loadData = async () => {
      try {
        const res = await axios.get('/vehicles')
        if (isMounted) setVehicles(res.data)
      } catch (err) {
        console.warn('API error fetching dashboard cars, loading mock variables', err)
        if (isMounted) setVehicles(fallbackVehicles)
      }
    }
    loadData()
    return () => {
      isMounted = false
    }
  }, [])

  const handlePurchase = async (vehicleId, make, model) => {
    if (purchasingId) return
    setPurchasingId(vehicleId)
    setPurchaseSuccessMessage('')
    try {
      await axios.post(`/vehicles/${vehicleId}/purchase`)
      setPurchaseSuccessMessage(`Congratulations! You have successfully purchased the ${make} ${model}! 🎉`)
      setVehicles((prev) => prev.map((v) => (v._id === vehicleId ? { ...v, quantity: Math.max(0, v.quantity - 1) } : v)))
    } catch (err) {
      alert(err.response?.data?.message || 'Purchase failed')
    } finally {
      setPurchasingId(null)
    }
  }

  const latestVehicles = vehicles.length > 0 ? vehicles.slice(0, 6) : fallbackVehicles
  const recommendedVehicles = vehicles.length > 0 ? vehicles.slice().reverse().slice(0, 4) : fallbackVehicles.slice(0, 4)

  // Stagger configurations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <div className="bg-[#111111] min-h-screen text-white py-10 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Purchase Notification Banner */}
        {purchaseSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-green-950/40 border border-green-700/60 text-green-300 px-6 py-4 rounded-xl text-sm font-medium shadow-lg flex items-center justify-between"
          >
            <span>{purchaseSuccessMessage}</span>
            <button 
              onClick={() => setPurchaseSuccessMessage('')}
              className="text-green-300 hover:text-white font-bold ml-4"
            >
              ✕
            </button>
          </motion.div>
        )}

        {/* Row 1: Welcome & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Welcome Card (Animate on Load) */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 bg-[#1b1b1b] border border-gray-800/40 p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden"
          >
            {/* Background vector lines */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
              <Car className="w-80 h-80 text-white" />
            </div>

            <div className="relative z-10 space-y-3">
              <span className="bg-[#ef4444]/10 text-[#ef4444] text-[10px] tracking-[0.25em] font-semibold uppercase px-3 py-1 rounded-full font-sans">
                PERSONAL ACCOUNT
              </span>
              <h1 className="text-white font-heading font-light text-3xl sm:text-4xl leading-tight tracking-tight">
                Welcome back, {user?.name || 'User'} 👋
              </h1>
              <p className="text-gray-300 font-normal text-sm max-w-lg leading-relaxed">
                Ready to find your next car? Browse the latest arrivals or continue where you left off.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 relative z-10">
              <Link
                to="/inventory"
                className="bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs tracking-wider uppercase font-semibold font-sans py-3.5 px-6 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shadow-[#ef4444]/15"
              >
                Browse Cars
              </Link>
              <Link
                to="/profile"
                className="bg-black/35 hover:bg-black/60 border border-gray-800 text-gray-300 text-xs tracking-wider uppercase font-semibold font-sans py-3.5 px-6 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                My Purchases
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats Grid (Animate Upward) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-5 grid grid-cols-2 gap-6"
          >
            {[
              { label: 'Available Cars', val: vehicles.length > 0 ? vehicles.filter(v => v.quantity > 0).length : 245, icon: <Car className="w-5 h-5 text-[#ef4444]" /> },
              { label: 'Purchased Cars', val: user?.purchases?.length || 3, icon: <ClipboardList className="w-5 h-5 text-blue-400" /> },
              { label: 'Favorite Cars', val: user?.favorites?.length || 4, icon: <Heart className="w-5 h-5 text-pink-400 font-bold" /> },
              { label: 'Brands', val: 12, icon: <Award className="w-5 h-5 text-yellow-500" /> }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-[#1b1b1b] border border-gray-800/40 p-6 rounded-2xl flex flex-col justify-between hover:border-gray-800 transition-all shadow-md group"
              >
                <div className="flex justify-between items-start">
                  <div className="p-2.5 bg-black/40 rounded-xl border border-gray-800 group-hover:scale-105 transition-transform">
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-white font-heading font-light text-3xl tracking-tight leading-none">
                    {stat.val}
                  </div>
                  <div className="text-gray-400 text-xs mt-1.5 font-medium leading-none font-sans">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Row 2: Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Browse Inventory', link: '/inventory', icon: <Car className="w-5 h-5 text-[#ef4444]" />, desc: 'Explore our vetted collection' },
            { title: 'View Purchases', link: '/profile', icon: <ClipboardList className="w-5 h-5 text-blue-400" />, desc: 'Track your personal vehicle orders' },
            { title: 'Saved Vehicles', link: '/profile', icon: <Heart className="w-5 h-5 text-pink-400" />, desc: 'Vetted cars you bookmarked' },
            { title: 'Contact Dealer', link: '/contact', icon: <UserCheck className="w-5 h-5 text-green-400" />, desc: 'Chat with our support staff' }
          ].map((action, idx) => (
            <Link key={idx} to={action.link}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#1b1b1b] border border-gray-800/40 p-5 rounded-2xl hover:border-gray-800 transition-all flex items-center gap-4 cursor-pointer group shadow-sm"
              >
                <div className="p-3 bg-black/40 rounded-xl border border-gray-800 shrink-0 group-hover:bg-[#ef4444]/10 group-hover:border-[#ef4444]/25 transition-colors">
                  {action.icon}
                </div>
                <div>
                  <h3 className="text-white font-space font-bold text-sm tracking-wide leading-tight group-hover:text-[#ef4444] transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1 leading-snug">
                    {action.desc}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Row 3: New Arrivals */}
        <div className="space-y-6">
          <div className="flex justify-between items-center animate-slide-up">
            <h2 className="text-white font-heading font-light text-2xl tracking-tight">
              New Arrivals
            </h2>
            <Link
              to="/inventory"
              className="text-[#ef4444] hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider font-sans flex items-center gap-1.5"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestVehicles.slice(0, 6).map((vehicle) => {
              const image = getImageUrl(vehicle)
              
              return (
                <div
                  key={vehicle._id}
                  className="bg-[#1b1b1b] border border-gray-800/40 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#ef4444]/5 transition-all duration-300 flex flex-col group"
                >
                  <div className="h-44 overflow-hidden relative bg-black/30">
                    <img
                      src={image}
                      alt={vehicle.model}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {vehicle.quantity === 0 && (
                      <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                        <span className="text-[#ef4444] font-sans font-semibold text-xs tracking-widest border border-[#ef4444] px-3 py-1.5 uppercase rounded-xl">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="text-[10px] text-gray-400 font-medium tracking-wide uppercase mb-1">
                        {vehicle.make}
                      </div>
                      <h3 className="text-white font-heading font-semibold text-base hover:text-[#ef4444] transition-colors leading-tight">
                        {vehicle.model}
                      </h3>
                      <p className="text-[#ef4444] font-heading font-bold text-lg mt-2">
                        ₹{vehicle.price?.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-400 font-medium border-t border-b border-gray-800/40 py-2">
                        <div className="text-center">
                          <span className="block text-gray-500 text-[8px] uppercase">Fuel</span>
                          <span className="text-white mt-0.5 block truncate">{vehicle.fuelType || 'Petrol'}</span>
                        </div>
                        <div className="text-center border-l border-r border-gray-800/60">
                          <span className="block text-gray-500 text-[8px] uppercase">Trans</span>
                          <span className="text-white mt-0.5 block truncate">{vehicle.transmission || 'Automatic'}</span>
                        </div>
                        <div className="text-center">
                          <span className="block text-gray-500 text-[8px] uppercase">Odo</span>
                          <span className="text-white mt-0.5 block truncate">{vehicle.mileage || '14,000 km'}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <Link
                          to={`/vehicles/${vehicle._id}`}
                          className="flex-1 bg-black/40 hover:bg-black/60 border border-gray-800 text-gray-300 text-[10px] tracking-wider uppercase font-semibold font-sans py-2.5 rounded-xl text-center transition-colors"
                        >
                          Details
                        </Link>
                        <button
                          onClick={() => handlePurchase(vehicle._id, vehicle.make, vehicle.model)}
                          disabled={vehicle.quantity === 0 || purchasingId === vehicle._id}
                          className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] disabled:opacity-40 disabled:cursor-not-allowed text-white text-[10px] tracking-wider uppercase font-semibold font-sans py-2.5 rounded-xl text-center transition-colors"
                        >
                          {purchasingId === vehicle._id ? 'Processing...' : 'Purchase'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Row 4: Recommended & Recent Activity & Purchase Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Recommended for You (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-white font-space font-extrabold text-xl tracking-tight uppercase">
              Recommended For You
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recommendedVehicles.slice(0, 4).map((vehicle) => {
                const image = getImageUrl(vehicle)
                
                return (
                  <div
                    key={vehicle._id}
                    className="bg-[#1b1b1b] border border-gray-800/40 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row group"
                  >
                    <div className="w-full sm:w-2/5 h-36 sm:h-full relative overflow-hidden bg-black/30 shrink-0">
                      <img
                        src={image}
                        alt={vehicle.model}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[9px] text-gray-500 font-semibold tracking-wider font-space uppercase">
                          {vehicle.make}
                        </div>
                        <h3 className="text-white font-space font-bold text-sm leading-tight hover:text-[#ef4444] transition-colors mt-0.5">
                          {vehicle.model}
                        </h3>
                        <p className="text-[#ef4444] font-space font-bold text-base mt-2">
                          ₹{vehicle.price?.toLocaleString('en-IN')}
                        </p>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Link
                          to={`/vehicles/${vehicle._id}`}
                          className="flex-1 bg-black/40 hover:bg-black/60 border border-gray-800 text-gray-300 text-[9px] tracking-wider uppercase font-semibold font-space py-2 rounded-lg text-center transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Recent Activity & Purchase Summary (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Purchase Summary */}
            <div className="space-y-4">
              <h2 className="text-white font-space font-extrabold text-xl tracking-tight uppercase">
                Purchase Summary
              </h2>
              <div className="bg-[#1b1b1b] border border-gray-800/40 rounded-2xl p-6 space-y-4 shadow-md">
                <div className="flex justify-between items-center border-b border-gray-800/40 pb-3">
                  <span className="text-gray-400 text-sm">Total Purchases</span>
                  <span className="text-white font-space font-bold text-base">{user?.purchases?.length || 3}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800/40 pb-3">
                  <span className="text-gray-400 text-sm">Pending Orders</span>
                  <span className="text-yellow-500 font-space font-bold text-base">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Completed Orders</span>
                  <span className="text-green-400 font-space font-bold text-base">{user?.purchases?.length || 3}</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
              <h2 className="text-white font-space font-extrabold text-xl tracking-tight uppercase">
                Recent Activity
              </h2>
              
              <div className="bg-[#1b1b1b] border border-gray-800/40 rounded-2xl p-6 shadow-md">
                <div className="relative border-l border-gray-800 pl-6 space-y-6">
                  
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0.5 bg-green-500/25 border border-green-500/50 p-1 rounded-full text-green-400">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    </span>
                    <h4 className="text-white text-xs font-bold font-space">Purchased Honda City ZX</h4>
                    <span className="text-[10px] text-gray-500">2 hours ago</span>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[30px] top-0.5 bg-primary/20 border border-[#ef4444]/40 p-1 rounded-full text-[#ef4444]">
                      <Sparkles className="w-2.5 h-2.5" />
                    </span>
                    <h4 className="text-white text-xs font-bold font-space">Viewed BMW X5</h4>
                    <span className="text-[10px] text-gray-500">1 day ago</span>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[30px] top-0.5 bg-[#ef4444]/20 border border-[#ef4444]/40 p-1 rounded-full text-[#ef4444]">
                      <Heart className="w-2.5 h-2.5" />
                    </span>
                    <h4 className="text-white text-xs font-bold font-space">Added Fortuner to favorites</h4>
                    <span className="text-[10px] text-gray-500">3 days ago</span>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[30px] top-0.5 bg-blue-500/20 border border-blue-500/40 p-1 rounded-full text-blue-400">
                      <Activity className="w-2.5 h-2.5" />
                    </span>
                    <h4 className="text-white text-xs font-bold font-space">Updated User Profile</h4>
                    <span className="text-[10px] text-gray-500">1 week ago</span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Row 5: Featured Brands */}
        <div className="space-y-6 border-t border-gray-900 pt-10">
          <h2 className="text-white font-space font-extrabold text-xl tracking-tight uppercase text-center">
            Featured Brands
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {['BMW', 'Mercedes', 'Audi', 'Toyota', 'Honda', 'Mahindra', 'Hyundai'].map((brand, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.08, color: '#ef4444' }}
                className="bg-[#1b1b1b] border border-gray-800/40 rounded-xl px-6 py-3 font-space font-bold text-sm tracking-wider uppercase cursor-pointer hover:border-gray-800 transition-colors"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Row 6: Bottom Section CTA */}
        <div className="bg-gradient-to-r from-black to-[#1c0f0f] border border-gray-800/40 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl shadow-black mt-16 animate-slide-up">
          <div className="text-center sm:text-left space-y-2">
            <h3 className="text-white font-space font-extrabold text-2xl uppercase tracking-tight">
              Need help choosing?
            </h3>
            <p className="text-gray-400 text-sm max-w-lg">
              Our experts are ready to answer your questions and arrange test drives for any vehicle.
            </p>
          </div>
          <Link
            to="/contact"
            className="bg-[#ef4444] hover:bg-[#dc2626] text-white text-xs tracking-wider uppercase font-semibold font-space py-3.5 px-8 rounded-lg transition-all duration-300 shadow-md shadow-[#ef4444]/15 hover:scale-105 active:scale-95 text-center shrink-0 w-full sm:w-auto"
          >
            Contact Dealer
          </Link>
        </div>

      </div>
    </div>
  )
}

export default DashboardHome
