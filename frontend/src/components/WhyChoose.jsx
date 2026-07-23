import { ShieldCheck, Tags, CheckCircle } from 'lucide-react'

const WhyChoose = () => {
  const cards = [
    {
      title: 'Verified Vehicles',
      desc: 'Each vehicle in our showroom is meticulously inspected by expert technicians to ensure it meets our strict quality standards.',
      icon: <CheckCircle className="w-8 h-8 text-primary" />
    },
    {
      title: 'Best Prices',
      desc: 'We offer fair, transparent pricing on all vehicles with absolutely zero hidden fees or unexpected dealership charges.',
      icon: <Tags className="w-8 h-8 text-primary" />
    },
    {
      title: 'Secure Purchase',
      desc: 'Our transaction process is transparent and fully secure, backed by trusted financial integrations and quick documentation.',
      icon: <ShieldCheck className="w-8 h-8 text-primary" />
    }
  ]

  return (
    <section className="bg-dark py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-slide-up">
          <span className="text-primary text-xs font-medium tracking-[0.25em] uppercase font-sans">
            WHY CHOOSE US
          </span>
          <h2 className="text-white text-3xl sm:text-4xl font-heading font-light tracking-tight mt-2">
            The Auto Deal Hub Difference
          </h2>
          <p className="text-gray-300 font-normal text-sm sm:text-base mt-4 leading-relaxed max-w-[650px] mx-auto">
            We provide a premium, transparent car purchasing experience designed around your absolute confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-cardgray border border-gray-900 rounded-xl p-8 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col items-start"
            >
              <div className="p-4 bg-black/40 rounded-xl border border-gray-900 mb-6 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              
              <h3 className="text-white font-heading font-semibold text-xl mb-3">
                {card.title}
              </h3>
              
              <p className="text-gray-300 font-normal text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChoose
