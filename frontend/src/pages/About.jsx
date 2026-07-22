import { Car, Search, ShoppingCart, ShieldCheck, BarChart3, Wrench } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Car size={32} />,
      title: "Vehicle Inventory",
      desc: "Manage cars with images, pricing, categories, and stock levels.",
    },
    {
      icon: <Search size={32} />,
      title: "Smart Search",
      desc: "Quickly search vehicles by make, model, category, and price.",
    },
    {
      icon: <ShoppingCart size={32} />,
      title: "Purchase System",
      desc: "Purchase available vehicles with automatic inventory updates.",
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Dashboard Analytics",
      desc: "Monitor purchases and inventory using charts and statistics.",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Secure Authentication",
      desc: "JWT authentication with role-based access control.",
    },
    {
      icon: <Wrench size={32} />,
      title: "Admin Management",
      desc: "Manage users, vehicles, inventory, and purchase records.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white px-6 py-14">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center">
          About <span className="text-[#e63946]">CarHub</span>
        </h1>

        <p className="text-gray-400 text-center mt-6 max-w-3xl mx-auto text-lg">
          CarHub is a modern dealership inventory management platform that
          helps dealerships organize vehicles, manage inventory, track
          purchases, and provide a seamless browsing experience.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-[#1b1b1b] rounded-xl p-8 hover:shadow-xl hover:shadow-red-600/20 transition"
            >
              <div className="text-[#e63946] mb-4">{item.icon}</div>

              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>

              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-[#1b1b1b] rounded-xl p-10">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Technology Stack
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            <div>
              <h3 className="text-[#e63946] font-semibold mb-3">
                Frontend
              </h3>

              <ul className="space-y-2 text-gray-300">
                <li>React</li>
                <li>Vite</li>
                <li>Tailwind CSS</li>
                <li>Axios</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#e63946] font-semibold mb-3">
                Backend
              </h3>

              <ul className="space-y-2 text-gray-300">
                <li>Node.js</li>
                <li>Express.js</li>
                <li>MongoDB</li>
                <li>Mongoose</li>
                <li>JWT</li>
                <li>bcrypt</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}