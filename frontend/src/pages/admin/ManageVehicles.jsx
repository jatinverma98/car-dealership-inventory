import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [error, setError] = useState('')

  const fetchVehicles = async () => {
    try {
      const res = await axios.get('/vehicles')
      setVehicles(res.data)
    } catch (err) {
      setError('Failed to load vehicles')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return
    try {
      await axios.delete(`/vehicles/${id}`)
      setVehicles(vehicles.filter((v) => v._id !== id))
    } catch (err) {
      setError('Failed to delete vehicle')
    }
  }

  const handleEditStart = (vehicle) => {
    setEditingId(vehicle._id)
    setEditForm({
      make: vehicle.make,
      model: vehicle.model,
      category: vehicle.category,
      price: vehicle.price,
      quantity: vehicle.quantity,
    })
  }

  const handleEditSave = async (id) => {
    try {
      const res = await axios.put(`/vehicles/${id}`, {
        ...editForm,
        price: Number(editForm.price),
        quantity: Number(editForm.quantity),
      })
      setVehicles(vehicles.map((v) => (v._id === id ? res.data : v)))
      setEditingId(null)
    } catch (err) {
      setError('Failed to update vehicle')
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  return (
    <div className="flex min-h-screen bg-dark">

      {/* sidebar */}
      <div className="w-56 bg-darkgray border-r border-gray-800 px-4 py-6 flex flex-col gap-1">
        {[
          { label: 'Dashboard', to: '/admin/dashboard' },
          { label: 'Vehicles', to: '/admin/manage-vehicles', active: true },
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl font-bold">Manage Vehicles</h1>
          <Link
            to="/admin/add-vehicle"
            className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Add Vehicle
          </Link>
        </div>

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
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Make</th>
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Model</th>
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Category</th>
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Price (₹)</th>
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Stock</th>
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-10">
                      No vehicles found
                    </td>
                  </tr>
                ) : (
                  vehicles.map((v) => (
                    <tr key={v._id} className="border-b border-gray-800 hover:bg-gray-800/20 transition-colors">
                      {editingId === v._id ? (
                        <>
                          <td className="px-4 py-3">
                            <input
                              value={editForm.make}
                              onChange={(e) => setEditForm({ ...editForm, make: e.target.value })}
                              className="bg-dark border border-gray-600 text-white px-2 py-1 rounded text-sm w-full focus:outline-none focus:border-primary"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              value={editForm.model}
                              onChange={(e) => setEditForm({ ...editForm, model: e.target.value })}
                              className="bg-dark border border-gray-600 text-white px-2 py-1 rounded text-sm w-full focus:outline-none focus:border-primary"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              value={editForm.category}
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                              className="bg-dark border border-gray-600 text-white px-2 py-1 rounded text-sm w-full focus:outline-none focus:border-primary"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={editForm.price}
                              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                              className="bg-dark border border-gray-600 text-white px-2 py-1 rounded text-sm w-full focus:outline-none focus:border-primary"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={editForm.quantity}
                              onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
                              className="bg-dark border border-gray-600 text-white px-2 py-1 rounded text-sm w-28 focus:outline-none focus:border-primary"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditSave(v._id)}
                                className="text-green-400 hover:text-green-300 text-xs border border-green-700 px-2 py-1 rounded transition-colors"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="text-gray-400 hover:text-gray-300 text-xs border border-gray-600 px-2 py-1 rounded transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
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
                          <td className="px-6 py-4">
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleEditStart(v)}
                                className="text-blue-400 hover:text-blue-300 text-xs transition-colors"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => handleDelete(v._id)}
                                className="text-red-400 hover:text-red-300 text-xs transition-colors"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageVehicles