const AboutSection = () => {
  return (
    <section className="bg-dark py-20 px-6 border-t border-gray-900 font-sans">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Dealership Showcase Image */}
        <div className="lg:col-span-6 animate-slide-up">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-900 group">
            <img
              src="https://images.unsplash.com/photo-1562515649-dd00b73c4d51?q=80&w=800&auto=format&fit=crop"
              alt="Auto Deal Hub Dealership Showroom"
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/5">
              <p className="text-white text-sm font-semibold font-heading tracking-wide">
                Our Flagship Showroom
              </p>
              <p className="text-gray-400 text-xs mt-1 font-sans">
                Experience luxury and comfort in our modern gallery.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Dealership Description and Stats */}
        <div className="lg:col-span-6 animate-slide-up flex flex-col justify-center">
          <span className="text-primary text-xs font-medium tracking-[0.25em] uppercase font-sans">
            ESTABLISHMENT
          </span>
          <h2 className="text-white text-3xl sm:text-4xl font-heading font-light tracking-tight mt-2 mb-6">
            Why Choose Auto Deal Hub?
          </h2>
          
          <p className="text-gray-300 font-normal text-sm sm:text-base leading-relaxed mb-8 max-w-[650px]">
            At Auto Deal Hub, we specialize in connecting premium buyers with exceptionally curated luxury vehicles. Our dedicated team of specialists guides you through every step of the journey, ensuring total transparency, zero hidden margins, and complete peace of mind. Whether you are looking for high-performance sports cars, robust family cruisers, or modern hybrids, we guarantee a premium experience.
          </p>

          {/* Grid of Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-cardgray border border-gray-900 p-6 rounded-2xl">
            <div className="text-center">
              <div className="text-white font-heading font-light text-2xl tracking-tight">
                500+
              </div>
              <div className="text-gray-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider font-sans mt-1">
                Cars
              </div>
            </div>

            <div className="text-center border-l border-gray-800/60">
              <div className="text-white font-heading font-light text-2xl tracking-tight">
                50+
              </div>
              <div className="text-gray-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider font-sans mt-1">
                Brands
              </div>
            </div>

            <div className="text-center border-l border-gray-800/60">
              <div className="text-white font-heading font-light text-2xl tracking-tight">
                1000+
              </div>
              <div className="text-gray-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider font-sans mt-1">
                Customers
              </div>
            </div>

            <div className="text-center border-l border-gray-800/60">
              <div className="text-white font-heading font-light text-2xl tracking-tight text-primary">
                99%
              </div>
              <div className="text-gray-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider font-sans mt-1">
                Satisfaction
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default AboutSection
