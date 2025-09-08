import {
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#043D3B] text-white relative rounded-t-2xl">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-4">
            <img
              className="w-7 h-4 rounded-full"
              src="./src/assets/footerlogo.jpeg"
              alt="Logo"
            />
            <h2 className="text-lg font-bold">Viraam Vaani</h2>
          </div>

          {/* Tagline */}
          <p className="text-sm leading-relaxed mb-6">
            “Viraam Vaani is a center of learning and growth, dedicated to
            nurturing minds with knowledge, values, and innovation. Our mission
            is to inspire students with the power of education, encourage
            critical thinking, and empower them to build a brighter future for
            themselves and society.”
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 text-xl mb-6">
            <a href="#">
              <FaXTwitter />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaFacebook />
            </a>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="border border-white px-4 py-2 rounded-md text-sm hover:bg-white hover:text-[#043D3B] transition"
          >
            ⬆ BACK TO TOP
          </button>
        </div>

        {/* Middle Section - Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <div className="flex flex-col space-y-3 text-sm">
            <Link to="/services" className="hover:underline">
              Services
            </Link>
            <Link to="/study-materials" className="hover:underline">
              Study Materials
            </Link>
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
            <Link to="/careers" className="hover:underline">
              Careers
            </Link>
          </div>
        </div>

        {/* Right Section - Legal */}
        <div>
          <h3 className="font-semibold mb-3">Institute</h3>
          <div className="flex flex-col space-y-3 text-sm">
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
            <Link to="/Story" className="hover:underline">
              Success Stories
            </Link>
            <Link to="/blog" className="hover:underline">
              Resources & Blog
            </Link>
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0e2322] text-center text-sm py-2">
        Copyright © {new Date().getFullYear()} Viraam Vaani. All Rights
        Reserved.
      </div>
    </footer>
  );
}
