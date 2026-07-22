import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#111111] text-white px-6 py-14">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center">
          Contact <span className="text-[#e63946]">Us</span>
        </h1>

        <p className="text-center text-gray-400 mt-5">
          We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mt-16">

          <div className="space-y-8">

            <div className="flex gap-5 bg-[#1b1b1b] p-6 rounded-xl">
              <Mail className="text-[#e63946]" size={30} />

              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-400">
                  support@carhub.com
                </p>
              </div>
            </div>

            <div className="flex gap-5 bg-[#1b1b1b] p-6 rounded-xl">
              <Phone className="text-[#e63946]" size={30} />

              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-400">
                  +91 60050 40752
                </p>
              </div>
            </div>

            <div className="flex gap-5 bg-[#1b1b1b] p-6 rounded-xl">
              <MapPin className="text-[#e63946]" size={30} />

              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-gray-400">
                  Ahmedabad, Gujarat, India
                </p>
              </div>
            </div>

          </div>

          <form className="bg-[#1b1b1b] rounded-xl p-8 space-y-5">

            <input
              className="w-full bg-[#262626] p-3 rounded outline-none"
              placeholder="Full Name"
            />

            <input
              className="w-full bg-[#262626] p-3 rounded outline-none"
              placeholder="Email"
            />

            <input
              className="w-full bg-[#262626] p-3 rounded outline-none"
              placeholder="Subject"
            />

            <textarea
              rows="6"
              className="w-full bg-[#262626] p-3 rounded outline-none"
              placeholder="Message"
            />

            <button
              type="submit"
              className="bg-[#e63946] hover:bg-red-700 transition px-8 py-3 rounded font-semibold"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}