import { FaXTwitter, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa6";

export default function Footer() {
  return (
<<<<<<< HEAD
    <footer className="bg-[#043D3B] text-white relative rounded-t-2xl">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-4">
  <img  className="w-7 h-4  rounded-full" src="./src/assets/footerlogo.jpeg" alt="" />
            <h2 className="text-lg font-bold">Viraam Vaani</h2>
          </div>

          {/* Tagline */}
          <p className="text-sm leading-relaxed mb-6">
            Empowering physicians with advanced multi-modal tools to improve
            treatment selection and patient outcomes.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 text-xl mb-6">
            <a href="#"><FaXTwitter /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebook /></a>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="border border-white px-4 py-2 rounded-md text-sm hover:bg-white hover:text-[#043D3B] transition"
          >
            ⬆ BACK TO TOP
          </button>
        </div>

        {/* Middle Section - Sitemap */}
        <div>
          <h3 className="font-semibold mb-3">Site Map</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Homepage</a></li>
            <li><a href="#" className="hover:underline">Technology</a></li>
            <li><a href="#" className="hover:underline">Ataraxis Breast</a></li>
            <li><a href="#" className="hover:underline">Resources & News</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Portal</a></li>
          </ul>
        </div>

        {/* Right Section - Legal */}
        <div>
          <h3 className="font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className=" no-underlinehover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Services</a></li>
            <li><a href="#" className="hover:underline">Lawyer’s Corners</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0e2322] text-center text-sm py-2">
        Copyright © 2024 Viraam Vaani All Rights Reserved.
      </div>
=======
    <footer className="bg-blue-900 text-white text-center py-4 mt-8">
      <p className="text-sm">
        © {new Date().getFullYear()} Coaching Institute. 
      </p>
>>>>>>> ef77a4d4e868756d05e5d4b6fc318de4fc2cf23f
    </footer>
  );
}
