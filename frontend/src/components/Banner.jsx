import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-black py-20 px-6 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1800&auto=format&fit=crop"
          alt="Luxury Car Hero"
          className="w-full h-full object-cover opacity-50 scale-100 animate-scale-up"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 flex flex-col items-start animate-slide-up">
          
          <h1 className="text-white font-heading font-light text-5xl sm:text-6xl lg:text-7xl leading-[1.1] tracking-tight">
            Find Your <span className="text-primary font-normal">Perfect Car</span>
          </h1>

          <p className="mt-6 text-gray-300 text-base sm:text-lg max-w-[650px] leading-relaxed font-sans font-normal">
            Browse quality vehicles from trusted brands. Compare prices, explore details, and find the right vehicle for your needs.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/inventory"
              className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all duration-300 font-sans hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              Browse Inventory
            </Link>
            <Link
              to="/contact"
              className="border border-white/30 hover:border-primary hover:bg-primary/5 text-white text-xs font-semibold uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all duration-300 font-sans hover:scale-105 active:scale-95"
            >
              Contact Us
            </Link>
          </div>

          {/* Underneath Stats Grid */}
          <div className="grid grid-cols-3 gap-8 sm:gap-16 mt-16 pt-8 border-t border-white/10 w-full max-w-xl">
            <div>
              <div className="text-white font-heading font-light text-3xl sm:text-4xl tracking-tight">
                500+
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium mt-1 font-sans">
                Cars
              </div>
            </div>
            
            <div>
              <div className="text-white font-heading font-light text-3xl sm:text-4xl tracking-tight">
                50+
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium mt-1 font-sans">
                Brands
              </div>
            </div>

            <div>
              <div className="text-white font-heading font-light text-3xl sm:text-4xl tracking-tight">
                1000+
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium mt-1 font-sans">
                Happy Customers
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Banner
