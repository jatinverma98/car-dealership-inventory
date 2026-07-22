import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import VehicleCard from "../components/VehicleCard";

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const res = await axios.get("/vehicles");
        setFeaturedCars(res.data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  return (
    <div className="bg-[#111111] text-white">

      {/* Welcome Section */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="relative rounded-2xl overflow-hidden h-[450px]">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&auto=format&fit=crop"
            alt="Car Banner"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/60 flex items-center">
            <div className="px-10 max-w-xl">
              <h1 className="text-5xl font-bold leading-tight">
                Find Your
                <span className="text-primary"> Perfect Car</span>
              </h1>

              <p className="mt-5 text-gray-300">
                Browse quality vehicles from trusted brands. Compare models,
                explore details, and choose the right car for your journey.
              </p>

              <div className="flex gap-4 mt-8">
                <Link
                  to="/inventory"
                  className="bg-primary px-6 py-3 rounded-lg hover:bg-red-700 transition"
                >
                  Browse Cars
                </Link>

                <Link
                  to="/contact"
                  className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#1b1b1b] p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Verified Cars</h3>
            <p className="text-gray-400">
              Every vehicle is inspected before being listed.
            </p>
          </div>

          <div className="bg-[#1b1b1b] p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Best Prices</h3>
            <p className="text-gray-400">
              Fair pricing with no hidden charges.
            </p>
          </div>

          <div className="bg-[#1b1b1b] p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Secure Purchase</h3>
            <p className="text-gray-400">
              Safe and transparent buying process.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Featured Cars
          </h2>

          <Link
            to="/inventory"
            className="text-primary hover:underline"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((vehicle) => (
              <VehicleCard
                key={vehicle._id}
                vehicle={vehicle}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;