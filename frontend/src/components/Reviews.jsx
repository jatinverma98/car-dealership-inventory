import { motion } from 'framer-motion'

const Reviews = () => {
  const reviews = [
    {
      quote: "i have been using Auto Deal Hub for over a year now and i love it! i can't imagine buying vehicles without it. it's so easy to use, and the customer service is great.",
      name: "Imtiaz Ali",
      role: "VP, Design, Apple Inc",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
      bgClass: "bg-gradient-to-br from-[#b91c1c] via-[#991b1b] to-[#7f1d1d] text-white shadow-2xl shadow-red-950/50",
      rotateClass: "lg:-rotate-3 hover:rotate-0 hover:z-30 hover:scale-105",
      avatarBorder: "border-white/30"
    },
    {
      quote: "the vehicle inspection transparency and seamless checkout made buying my Corvette an absolute dream. hands down the best dealership experience.",
      name: "Marcus Vance",
      role: "Lead Engineer, Tesla",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
      bgClass: "bg-[#1c1c1c] border border-gray-800 text-white shadow-2xl shadow-black/80",
      rotateClass: "lg:rotate-2 hover:rotate-0 hover:z-30 hover:scale-105",
      avatarBorder: "border-[#b91c1c]"
    },
    {
      quote: "from browsing the showroom to receiving my GLE Coupe at my doorstep, Auto Deal Hub exceeded every expectation. top-tier inventory and team.",
      name: "Sarah Jenkins",
      role: "Director of Operations, Meta",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
      bgClass: "bg-gradient-to-br from-[#2a2a2a] via-[#1f1f1f] to-[#141414] border border-gray-800/80 text-white shadow-2xl",
      rotateClass: "lg:-rotate-2 hover:rotate-0 hover:z-30 hover:scale-105",
      avatarBorder: "border-gray-600"
    },
    {
      quote: "finding pristine luxury cars with zero hidden margins used to be impossible. Auto Deal Hub changed the game completely. seamless experience.",
      name: "Elena Rostova",
      role: "Managing Partner, Apex Capital",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
      bgClass: "bg-gradient-to-br from-[#dc2626] to-[#991b1b] text-white shadow-2xl shadow-red-900/60",
      rotateClass: "lg:rotate-3 hover:rotate-0 hover:z-30 hover:scale-105",
      avatarBorder: "border-white/30"
    }
  ]

  return (
    <section className="bg-dark py-24 px-6 border-t border-gray-900 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 animate-slide-up">
          <span className="text-primary text-xs font-medium tracking-[0.25em] uppercase font-sans">
            CLIENT STORIES
          </span>
          <h2 className="text-white text-3xl sm:text-5xl font-heading font-light tracking-tight mt-2">
            Client Stories
          </h2>
          <p className="text-gray-300 font-normal text-sm sm:text-base mt-4 leading-relaxed max-w-[650px] mx-auto">
            Read how we help luxury vehicle buyers acquire their dream cars with complete confidence.
          </p>
        </div>

        {/* Tilted Overlapping Card Showcase */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 lg:-space-x-6 py-8 px-4">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`relative w-full max-w-sm sm:max-w-md lg:w-80 rounded-[2rem] p-8 transition-all duration-300 cursor-pointer ${rev.bgClass} ${rev.rotateClass}`}
            >
              {/* Review Text */}
              <p className="text-sm sm:text-base font-normal leading-relaxed tracking-tight mb-8">
                "{rev.quote}"
              </p>

              {/* Author Details at Bottom */}
              <div className="flex items-center gap-4 pt-2">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className={`w-12 h-12 rounded-full object-cover border-2 ${rev.avatarBorder} shadow-md shrink-0`}
                />
                <div>
                  <h4 className="font-heading font-semibold text-base leading-tight">
                    {rev.name}
                  </h4>
                  <p className="text-xs opacity-75 mt-0.5 font-normal">
                    {rev.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Reviews
