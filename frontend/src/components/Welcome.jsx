import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="bg-[#111111] text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">

        <div>
          <p className="text-primary font-medium text-xs tracking-[0.25em] uppercase mb-3">
            AUTO DEAL HUB
          </p>

          <h1 className="text-5xl lg:text-6xl font-heading font-light leading-tight tracking-tight">
            Find Your
            <span className="text-primary font-normal"> Perfect Car</span>
          </h1>

          <p className="text-gray-300 font-normal mt-6 text-base sm:text-lg max-w-[650px] leading-relaxed">
            Browse quality vehicles from trusted brands.
            Compare prices, check details, and find the right car for you.
          </p>

          <div className="flex gap-4 mt-8">

            <Link
              to="/inventory"
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md shadow-primary/10"
            >
              Browse Cars
            </Link>

            <Link
              to="/contact"
              className="border border-gray-600 hover:border-primary hover:text-primary text-white px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              Contact
            </Link>

          </div>

          <div className="flex gap-10 mt-10">

            <div>
              <h2 className="text-3xl font-heading font-light text-primary tracking-tight">500+</h2>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mt-1">Cars</p>
            </div>

            <div>
              <h2 className="text-3xl font-heading font-light text-primary tracking-tight">50+</h2>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mt-1">Brands</p>
            </div>

            <div>
              <h2 className="text-3xl font-heading font-light text-primary tracking-tight">1000+</h2>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mt-1">Customers</p>
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