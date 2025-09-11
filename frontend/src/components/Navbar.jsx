import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "../assets/logo.jpeg";

export default function Navbar({ onDashboardToggle }) {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", name: "Home" },
    { path: "/services", name: "Services" },
    { path: "/study-materials", name: "Study Materials" },
    { path: "/about", name: "About" },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#043D3B] to-[#0A5C59] text-white shadow-xl fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <img className="rounded-3xl w-8 h-8 object-contain" src={Logo} alt="Logo" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-white">Viraam</span>
              <span className="text-blue-500">Vaani</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? "text-white bg-[#0e6a67] shadow-inner"
                    : "text-blue-100 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User/Admin Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <button
                onClick={onDashboardToggle}
                className="p-2.5 rounded-full bg-white text-[#0e6a67] hover:bg-[#106865] hover:text-white shadow-md"
                title="Dashboard"
              >
                <User className="w-5 h-5" />
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-[#baf5f3] to-[#0e6a67] text-black rounded-md text-sm font-medium shadow-md"
              >
                Register
              </Link>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center">
            {user && (
              <button
                onClick={onDashboardToggle}
                className="p-2 mr-2 rounded-full bg-white text-[#0e6a67]"
                title="Dashboard"
              >
                <User className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-[#0e6a67]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#043D3B] shadow-xl border-t border-[#0A5C59]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? "text-white bg-[#0e6a67]"
                      : "text-blue-100 hover:text-white hover:bg-[#0A5C59]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
