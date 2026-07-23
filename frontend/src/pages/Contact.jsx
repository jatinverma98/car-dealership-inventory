import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#111111] text-white px-6 py-14 font-sans">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-heading font-light text-center tracking-tight">
          Contact <span className="text-[#ef4444] font-normal">Us</span>
        </h1>

        <p className="text-center text-gray-300 font-normal mt-5 max-w-[650px] mx-auto text-base leading-relaxed">
          We'd love to hear from you. Reach out to our team of specialists today.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mt-16">

          <div className="space-y-8">

            <div className="flex gap-5 bg-[#1b1b1b] border border-gray-800/60 p-6 rounded-2xl">
              <Mail className="text-[#ef4444]" size={28} />

              <div>
                <h3 className="font-heading font-semibold text-base">Email</h3>
                <p className="text-gray-300 font-normal text-sm mt-1">
                  sales@autodealhub.com
                </p>
              </div>
            </div>

            <div className="flex gap-5 bg-[#1b1b1b] border border-gray-800/60 p-6 rounded-2xl">
              <Phone className="text-[#ef4444]" size={28} />

              <div>
                <h3 className="font-heading font-semibold text-base">Phone</h3>
                <p className="text-gray-300 font-normal text-sm mt-1">
                  +1 (800) 555-0199
                </p>
              </div>
            </div>

            <div className="flex gap-5 bg-[#1b1b1b] border border-gray-800/60 p-6 rounded-2xl">
              <MapPin className="text-[#ef4444]" size={28} />

              <div>
                <h3 className="font-heading font-semibold text-base">Location</h3>
                <p className="text-gray-300 font-normal text-sm mt-1">
                  128 Showroom Avenue, Suite 400, Beverly Hills, CA
                </p>
              </div>
            </div>

          </div>

          <form className="bg-[#1b1b1b] border border-gray-800/60 rounded-2xl p-8 space-y-5">

            <input
              className="w-full bg-[#262626] p-3.5 rounded-xl border border-gray-800 text-white placeholder-gray-500 font-sans text-sm focus:border-primary outline-none transition-colors"
              placeholder="Full Name"
            />

            <input
              className="w-full bg-[#262626] p-3.5 rounded-xl border border-gray-800 text-white placeholder-gray-500 font-sans text-sm focus:border-primary outline-none transition-colors"
              placeholder="Email"
            />

            <input
              className="w-full bg-[#262626] p-3.5 rounded-xl border border-gray-800 text-white placeholder-gray-500 font-sans text-sm focus:border-primary outline-none transition-colors"
              placeholder="Subject"
            />

            <textarea
              rows="5"
              className="w-full bg-[#262626] p-3.5 rounded-xl border border-gray-800 text-white placeholder-gray-500 font-sans text-sm focus:border-primary outline-none transition-colors"
              placeholder="Message"
            />

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-md shadow-primary/10"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}