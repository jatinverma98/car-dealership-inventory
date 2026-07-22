import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import { useAuth } from '../../context/AuthContext'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { user: currentUser } = useAuth()

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users')
      setUsers(res.data)
    } catch (err) {
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (id) => {
    if (id === currentUser._id) {
      return setError("You can't delete your own account")
    }
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      await axios.delete(`/users/${id}`)
      setUsers(users.filter((u) => u._id !== id))
      setSuccess('User deleted successfully')
    } catch (err) {
      setError('Failed to delete user')
    }
  }

  const handleRoleChange = async (id, newRole) => {
    if (id === currentUser._id) {
      return setError("You can't change your own role")
    }
    try {
      const res = await axios.put(`/users/${id}/role`, { role: newRole })
      setUsers(users.map((u) => (u._id === id ? res.data : u)))
      setSuccess('User role updated')
    } catch (err) {
      setError('Failed to update role')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="flex min-h-screen bg-dark">

      {/* sidebar */}
      <div className="w-56 bg-darkgray border-r border-gray-800 px-4 py-6 flex flex-col gap-1">
        {[
          { label: 'Dashboard', to: '/admin/dashboard' },
          { label: 'Vehicles', to: '/admin/manage-vehicles' },
          { label: 'Add Vehicle', to: '/admin/add-vehicle' },
          { label: 'Purchases', to: '/admin/purchases' },
          { label: 'Restock', to: '/admin/restock' },
          { label: 'Users', to: '/admin/users', active: true },
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
          <h1 className="text-white text-2xl font-bold">Manage Users</h1>
          <span className="text-gray-400 text-sm">
            Total: {users.length} users
          </span>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded mb-4 text-sm">
            {success}
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
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Name</th>
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Email</th>
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Role</th>
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Joined</th>
                  <th className="text-left text-gray-400 text-xs px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-10">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((u, index) => (
                    <tr
                      key={u._id}
                      className="border-b border-gray-800 hover:bg-gray-800/20 transition-colors"
                    >
                      <td className="text-gray-500 text-sm px-6 py-4">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                            {u.name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-white text-sm">{u.name}</span>
                          {u._id === currentUser._id && (
                            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                              You
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="text-gray-400 text-sm px-6 py-4">
                        {u.email}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          disabled={u._id === currentUser._id}
                          className="bg-dark border border-gray-700 text-white px-2 py-1 rounded text-xs focus:outline-none focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="text-gray-400 text-sm px-6 py-4">
                        {new Date(u.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          disabled={u._id === currentUser._id}
                          className="text-red-400 hover:text-red-300 text-xs transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          🗑️ Delete
                        </button>
                      </td>
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

export default Users