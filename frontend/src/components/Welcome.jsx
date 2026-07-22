import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">

        <div>
          <p className="text-primary font-semibold mb-3">
            Auto Deal Hub
          </p>

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            Find Your
            <span className="text-primary"> Perfect Car</span>
          </h1>

          <p className="text-gray-400 mt-6 text-lg max-w-lg">
            Browse quality vehicles from trusted brands.
            Compare prices, check details, and find the right car for you.
          </p>

          <div className="flex gap-4 mt-8">

            <Link
              to="/inventory"
              className="bg-primary px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition"
            >
              Browse Cars
            </Link>

            <Link
              to="/contact"
              className="border border-gray-600 px-6 py-3 rounded-lg hover:border-primary hover:text-primary transition"
            >
              Contact
            </Link>

          </div>

          <div className="flex gap-10 mt-10">

            <div>
              <h2 className="text-3xl font-bold text-primary">500+</h2>
              <p className="text-gray-400 text-sm">Cars</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary">50+</h2>
              <p className="text-gray-400 text-sm">Brands</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary">1000+</h2>
              <p className="text-gray-400 text-sm">Customers</p>
            </div>

          </div>

        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1600"
            alt="Car"
            className="rounded-2xl shadow-xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Welcome;