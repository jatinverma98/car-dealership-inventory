import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

const AddVehicle = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [form, setForm] = useState({
    make: '',
    model: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
  })

  const categories = ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Truck']

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await axios.post('/vehicles', {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      })
      setSuccess('Vehicle added successfully!')
      setForm({ make: '', model: '', category: '', price: '', quantity: '', description: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add vehicle')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-dark">

      {/* sidebar */}
      <div className="w-56 bg-darkgray border-r border-gray-800 px-4 py-6 flex flex-col gap-1">
        {[
          { label: 'Dashboard', to: '/admin/dashboard' },
          { label: 'Vehicles', to: '/admin/manage-vehicles' },
          { label: 'Add Vehicle', to: '/admin/add-vehicle', active: true },
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
        <h1 className="text-white text-2xl font-bold mb-8">Add New Vehicle</h1>

        <div className="bg-darkgray rounded-xl p-8 max-w-2xl">

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded mb-6 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Make</label>
                <input
                  type="text"
                  name="make"
                  value={form.make}
                  onChange={handleChange}
                  placeholder="Enter make"
                  required
                  className="w-full bg-dark border border-gray-700 text-white px-4 py-2.5 rounded text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600"
                />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Model</label>
                <input
                  type="text"
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  placeholder="Enter model"
                  required
                  className="w-full bg-dark border border-gray-700 text-white px-4 py-2.5 rounded text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark border border-gray-700 text-white px-4 py-2.5 rounded text-sm focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                  className="w-full bg-dark border border-gray-700 text-white px-4 py-2.5 rounded text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-xs mb-1 block">Quantity in Stock</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                required
                className="w-full bg-dark border border-gray-700 text-white px-4 py-2.5 rounded text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs mb-1 block">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter description"
                rows={3}
                className="w-full bg-dark border border-gray-700 text-white px-4 py-2.5 rounded text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-600 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded font-semibold transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary hover:bg-red-700 text-white py-3 rounded font-semibold transition-colors text-sm disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Vehicle'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default AddVehicle