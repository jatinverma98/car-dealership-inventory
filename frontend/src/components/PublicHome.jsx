import { Link } from 'react-router-dom'
import Banner from './Banner'
import WhyChoose from './WhyChoose'
import FeaturedCars from './FeaturedCars'
import HowItWorks from './HowItWorks'
import AboutSection from './AboutSection'
import Reviews from './Reviews'
import Footer from './Footer'

const PublicHome = () => {
  return (
    <div className="bg-dark text-white font-sans selection:bg-primary selection:text-white">
      
      {/* Section 1: Banner */}
      <Banner />

      {/* Section 2: Why Choose Us */}
      <WhyChoose />

      {/* Section 3: Featured Cars */}
      <FeaturedCars />

      {/* Section 4: How It Works */}
      <HowItWorks />

      {/* Section 5: About Section */}
      <AboutSection />

      {/* Section 6: Customer Reviews */}
      <Reviews />

      {/* Section 7: Call to Action */}
      <section className="bg-black py-20 px-6 text-center border-t border-gray-900 font-sans">
        <div className="max-w-3xl mx-auto animate-slide-up">
          <h2 className="text-white font-heading font-light text-3xl sm:text-4xl tracking-tight mb-4">
            Ready to Find Your Next Car?
          </h2>
          <p className="text-gray-300 font-normal text-sm sm:text-base leading-relaxed mb-8 max-w-[650px] mx-auto">
            Explore our real-time virtual showroom of vetted luxury vehicles. Filter by mileage, pricing, fuel type, and specifications to find your match today.
          </p>
          <Link
            to="/inventory"
            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all duration-300 font-sans hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 inline-block"
          >
            Browse Inventory
          </Link>
        </div>
      </section>

      {/* Section 8: Footer */}
      <Footer />

    </div>
  )
}

export default PublicHome
