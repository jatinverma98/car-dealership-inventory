import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import VehicleDetail from './pages/VehicleDetail'
import Dashboard from './pages/admin/Dashboard'
import AddVehicle from './pages/admin/AddVehicle'
import ManageVehicles from './pages/admin/ManageVehicles'
import Restock from './pages/admin/Restock'

// protects routes that need login
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="text-white text-center mt-20">Loading...</div>
  if (!user) return <Navigate to="/login" />
  return children
}

// protects routes that need admin role
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="text-white text-center mt-20">Loading...</div>
  if (!user) return <Navigate to="/login" />
  if (user.role !== 'admin') return <Navigate to="/" />
  return children
}

const App = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Routes>
        {/* public routes */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

        {/* protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/vehicles/:id" element={
          <ProtectedRoute>
            <VehicleDetail />
          </ProtectedRoute>
        } />

        {/* admin only routes */}
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        } />
        <Route path="/admin/add-vehicle" element={
          <AdminRoute>
            <AddVehicle />
          </AdminRoute>
        } />
        <Route path="/admin/manage-vehicles" element={
          <AdminRoute>
            <ManageVehicles />
          </AdminRoute>
        } />
        <Route path="/admin/restock" element={
          <AdminRoute>
            <Restock />
          </AdminRoute>
        } />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App