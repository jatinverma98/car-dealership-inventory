import { useState, useEffect } from "react";
import axios from "../api/axios";
import VehicleCard from "../components/VehicleCard";
import SearchFilters from "../components/SearchFilters";

const Inventory = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    make: "",
    model: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("/vehicles");
      setVehicles(res.data);
    } catch {
      setError("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};

      if (filters.make) params.make = filters.make;
      if (filters.model) params.model = filters.model;
      if (filters.category) params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      const res = await axios.get("/vehicles/search", { params });

      setVehicles(res.data);
    } catch {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({
      make: "",
      model: "",
      category: "",
      minPrice: "",
      maxPrice: "",
    });

    fetchVehicles();
  };

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const res = await axios.get("/vehicles");
        if (isMounted) setVehicles(res.data);
      } catch {
        if (isMounted) setError("Failed to load vehicles");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      <div className="mb-8">
        <h1 className="text-white font-heading font-light text-4xl sm:text-5xl tracking-tight">
          Inventory
        </h1>

        <p className="text-gray-300 font-normal text-base mt-2 leading-relaxed max-w-[650px]">
          Browse our collection of available vehicles.
        </p>
      </div>

      <SearchFilters
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <div className="flex items-center justify-between my-8">
        <h2 className="text-white font-heading font-normal text-xl tracking-tight">
          Available Vehicles

          <span className="text-gray-400 text-sm ml-2 font-normal font-sans">
            ({vehicles.length})
          </span>
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 mt-4">
            Loading vehicles...
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-400">{error}</p>

          <button
            onClick={fetchVehicles}
            className="mt-4 text-primary hover:underline"
          >
            Try Again
          </button>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">
            No vehicles found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle._id}
              vehicle={vehicle}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Inventory;