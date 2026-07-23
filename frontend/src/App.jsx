import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VehicleDetail from "./pages/VehicleDetail";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Dashboard from "./pages/admin/Dashboard";
import AddVehicle from "./pages/admin/AddVehicle";
import ManageVehicles from "./pages/admin/ManageVehicles";
import Restock from "./pages/admin/Restock";
import Purchases from "./pages/admin/Purchases";
import Users from "./pages/admin/Users";

// Protect routes that require login
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-white text-center mt-20">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Protect admin routes
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="text-white text-center mt-20">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />

      <Routes>

        {/* Public Routes */}

        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Protected Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/inventory"
          element={<Inventory />}
        />

        <Route
          path="/vehicles/:id"
          element={
            <ProtectedRoute>
              <VehicleDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-vehicle"
          element={
            <AdminRoute>
              <AddVehicle />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-vehicles"
          element={
            <AdminRoute>
              <ManageVehicles />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/restock"
          element={
            <AdminRoute>
              <Restock />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/purchases"
          element={
            <AdminRoute>
              <Purchases />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />

        {/* Fallback */}

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>
    </div>
  );
};

export default App;