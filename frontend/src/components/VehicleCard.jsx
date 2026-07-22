import { Link } from 'react-router-dom'

const VehicleCard = ({ vehicle }) => {
  const imageUrl =
    vehicle.images && vehicle.images.length > 0
      ? `http://localhost:5000${vehicle.images[0]}`
      : `https://source.unsplash.com/400x300/?${vehicle.make},car`

  return (
    <div className="bg-cardgray rounded-lg overflow-hidden hover:border border-primary transition-all duration-300 group">

      <div className="relative overflow-hidden h-48">
        <img
          src={imageUrl}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {vehicle.quantity === 0 && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-red-500 font-bold text-lg border border-red-500 px-3 py-1 rounded">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-white font-semibold text-lg">
              {vehicle.make} {vehicle.model}
            </h3>
            <span className="text-gray-400 text-sm">{vehicle.category}</span>
          </div>
          <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
            {vehicle.category}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-primary font-bold text-xl">
              ₹{vehicle.price.toLocaleString('en-IN')}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Stock: {vehicle.quantity}
            </p>
          </div>
          <Link
            to={`/vehicles/${vehicle._id}`}
            className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>

    </div>
  )
}

export default VehicleCard