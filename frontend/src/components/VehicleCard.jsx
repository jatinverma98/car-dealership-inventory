import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getImageUrl } from '../utils/imageHelper'

const VehicleCard = ({ vehicle }) => {
  const imageUrl = getImageUrl(vehicle)

  const getSpecs = (vehicle) => {
    const modelLower = vehicle.model?.toLowerCase() || ''
    const makeLower = vehicle.make?.toLowerCase() || ''

    const fuelType = vehicle.fuelType || (modelLower.includes('electric') || makeLower.includes('tesla') ? 'Electric' : 'Petrol')
    const transmission = vehicle.transmission || (modelLower.includes('manual') ? 'Manual' : 'Automatic')
    
    let mileage
    if (vehicle.mileage) {
      mileage = typeof vehicle.mileage === 'number' ? `${vehicle.mileage.toLocaleString()} km` : vehicle.mileage
    } else {
      const seed = vehicle._id ? parseInt(vehicle._id.substring(18), 16) || 15 : 15
      const mileageNum = ((seed % 80) + 10) * 1000
      mileage = `${mileageNum.toLocaleString()} km`
    }

    return {
      fuelType,
      transmission,
      mileage,
    }
  }

  const specs = getSpecs(vehicle)

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group bg-[#242424] rounded-2xl overflow-hidden shadow-xl shadow-black/50 border border-gray-800/60 hover:border-gray-700/80 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 flex flex-col h-full font-sans"
    >
      
      {/* Top Image Section */}
      <div className="relative overflow-hidden h-[260px] bg-black/40 shrink-0">
        <img
          src={imageUrl}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-500 ease-out"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#242424] via-black/15 to-transparent pointer-events-none" />

        {vehicle.quantity === 0 && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm z-10">
            <span className="text-[#ef4444] font-sans font-semibold text-xs tracking-widest border border-[#ef4444] px-4 py-2 uppercase rounded-xl">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand */}
          <span className="text-xs text-gray-400 font-medium tracking-wide uppercase block mb-1">
            {vehicle.make}
          </span>

          {/* Vehicle Name */}
          <h3 className="text-white font-heading font-semibold text-xl leading-snug">
            {vehicle.model}
          </h3>

          {/* Price */}
          <div className="mt-3 mb-6">
            <p className="text-[#ef4444] font-heading font-bold text-2xl tracking-tight leading-none">
              ₹{vehicle.price?.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        <div>
          {/* Specifications Two-Column Layout with Thin Divider Lines */}
          <div className="space-y-0 text-xs font-medium mb-6">
            <div className="flex justify-between items-center border-b border-gray-700/50 py-2.5">
              <span className="text-gray-400 font-medium">Fuel Type</span>
              <span className="text-white font-medium">{specs.fuelType}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700/50 py-2.5">
              <span className="text-gray-400 font-medium">Transmission</span>
              <span className="text-white font-medium">{specs.transmission}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700/50 py-2.5">
              <span className="text-gray-400 font-medium">Mileage</span>
              <span className="text-white font-medium">{specs.mileage}</span>
            </div>
          </div>

          {/* VIEW DETAILS Full-width Button */}
          <Link
            to={`/vehicles/${vehicle._id}`}
            className="block w-full bg-[#ef4444] hover:bg-[#dc2626] group-hover:brightness-110 text-white font-sans font-semibold text-xs uppercase tracking-wider py-3.5 rounded-xl text-center shadow-md shadow-[#ef4444]/15 hover:shadow-lg hover:shadow-[#ef4444]/30 hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            VIEW DETAILS
          </Link>
        </div>
      </div>

    </motion.div>
  )
}

export default VehicleCard