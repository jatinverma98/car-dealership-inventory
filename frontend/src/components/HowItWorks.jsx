import { Search, Compass, MessageSquare, ClipboardCheck } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      step: '01',
      title: 'Browse Cars',
      desc: 'Explore our premium collection of luxury sedans, sports coupes, robust SUVs, and hybrid models.',
      icon: <Search className="w-6 h-6 text-primary" />
    },
    {
      step: '02',
      title: 'Compare Vehicles',
      desc: 'Filter by mileage, pricing, fuel configuration, and detailed specifications to find the exact match.',
      icon: <Compass className="w-6 h-6 text-primary" />
    },
    {
      step: '03',
      title: 'Contact Dealer',
      desc: 'Reach out to our specialists to ask questions, schedule viewings, or arrange secure test drives.',
      icon: <MessageSquare className="w-6 h-6 text-primary" />
    },
    {
      step: '04',
      title: 'Complete Purchase',
      desc: 'Finalize clear paperwork with flexible payment structures and hit the road in your new drive.',
      icon: <ClipboardCheck className="w-6 h-6 text-primary" />
    }
  ]

  return (
    <section className="bg-dark py-20 px-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-slide-up">
          <span className="text-primary text-xs font-medium tracking-[0.25em] uppercase font-sans">
            HOW IT WORKS
          </span>
          <h2 className="text-white text-3xl sm:text-4xl font-heading font-light tracking-tight mt-2">
            How It Works
          </h2>
          <p className="text-gray-300 font-normal text-sm sm:text-base mt-4 leading-relaxed max-w-[650px] mx-auto">
            Our streamlined process makes selecting and purchasing your next luxury vehicle completely effortless.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-cardgray border border-gray-900 rounded-xl p-6 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-black/40 rounded-lg border border-gray-800">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 font-heading font-light text-3xl group-hover:text-primary/10 transition-colors duration-300">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-white font-heading font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 font-normal text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
