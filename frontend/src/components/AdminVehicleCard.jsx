import { useState } from 'react'
import { Plus, Minus, Loader2, Edit3, Trash2 } from 'lucide-react'
import axios from '../api/axios'
import { getImageUrl } from '../utils/imageHelper'

const AdminVehicleCard = ({ vehicle, onUpdate, onDelete, onEdit }) => {
  const [quantity, setQuantity] = useState(vehicle.quantity)
  const [updating, setUpdating] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const imageUrl = getImageUrl(vehicle)

  const handleStockChange = async (delta) => {
    if (updating) return
    const newQty = quantity + delta
    if (newQty < 0) return

    setUpdating(true)
    setErrorMsg('')

    try {
      const res = await axios.post(`/vehicles/${vehicle._id}/restock`, {
        amount: delta
      })

      const updatedQty = res.data && typeof res.data.quantity === 'number'
        ? res.data.quantity
        : newQty

      setQuantity(updatedQty)
      
      if (onUpdate) {
        onUpdate({ ...vehicle, quantity: updatedQty })
      }
    } catch (err) {
      console.error('Stock update failed:', err)
      setErrorMsg(err.response?.data?.message || 'Update failed')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="bg-[#1b1b1b] border border-gray-800/80 rounded-2xl p-5 shadow-xl hover:border-gray-700/80 transition-all duration-300 flex flex-col justify-between font-sans">
      
      <div>
        {/* Vehicle Image */}
        <div className="relative h-44 rounded-xl overflow-hidden bg-black/40 mb-4">
          <img
            src={imageUrl}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-sans font-semibold px-2.5 py-1 rounded-lg border border-white/10 uppercase tracking-wider">
            {vehicle.category || 'Vehicle'}
          </div>
          {quantity === 0 && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm">
              <span className="text-[#ef4444] font-sans font-semibold text-xs tracking-widest border border-[#ef4444] px-3 py-1.5 uppercase rounded-xl">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Title and Price */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase block">
              {vehicle.make}
            </span>
            <h3 className="text-white font-heading font-semibold text-lg leading-tight mt-0.5">
              {vehicle.model}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-[#ef4444] font-heading font-bold text-lg leading-tight block">
              ₹{vehicle.price?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Prominent Stock Quantity Block with + and - Controls */}
        <div className="bg-black/40 border border-gray-800 rounded-xl p-3.5 my-3 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase block">
              Current Stock
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className={`font-heading font-bold text-2xl leading-none ${
                quantity === 0
                  ? 'text-red-500'
                  : quantity <= 2
                  ? 'text-yellow-400'
                  : 'text-green-400'
              }`}>
                {quantity}
              </span>
              <span className="text-gray-500 text-[10px] font-medium">
                units
              </span>
            </div>
          </div>

          {/* Controls (+ and - buttons beside stock count) */}
          <div className="flex items-center gap-2">
            {updating ? (
              <div className="px-3 py-1.5 flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg">
                <Loader2 className="w-4 h-4 text-[#ef4444] animate-spin" />
                <span className="text-[10px] text-gray-400 font-medium">Updating...</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleStockChange(-1)}
                  disabled={quantity <= 0 || updating}
                  title="Decrease Stock (-1)"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center border border-gray-700 transition-all shadow-sm"
                >
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  onClick={() => handleStockChange(1)}
                  disabled={updating}
                  title="Increase Stock (+1)"
                  className="w-9 h-9 rounded-lg bg-[#ef4444] hover:bg-[#dc2626] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-md shadow-[#ef4444]/20"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
              </>
            )}
          </div>
        </div>

        {errorMsg && (
          <p className="text-red-400 text-[11px] mt-1 mb-2 font-medium">
            {errorMsg}
          </p>
        )}
      </div>

      {/* Admin Operations (Edit / Delete) */}
      <div className="flex gap-2 pt-3 border-t border-gray-800/60 mt-2">
        {onEdit && (
          <button
            onClick={() => onEdit(vehicle)}
            className="flex-1 bg-gray-800/60 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700/60 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-400" />
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(vehicle._id)}
            className="flex-1 bg-red-950/20 hover:bg-red-900/30 text-red-400 border border-red-900/40 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
            Delete
          </button>
        )}
      </div>

    </div>
  )
}

export default AdminVehicleCard
