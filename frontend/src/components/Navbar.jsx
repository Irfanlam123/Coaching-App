import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, User, Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "../assets/logo.jpeg"
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
    <nav className="bg-gradient-to-r from-[#043D3B] to-[#0A5C59] text-white shadow-xl relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group transition-all duration-300 hover:scale-105"
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <img
                className="rounded-3xl w-8 h-8 object-contain"
                src={Logo}
                alt="ViraamVani Logo"
              />
            </div>
            <span className="text-xl font-bold tracking-tight">
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
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group overflow-hidden ${
                  location.pathname === item.path
                    ? "text-white bg-[#0e6a67] shadow-inner"
                    : "text-blue-100 hover:text-white"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {location.pathname !== item.path && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                )}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <button
                  onClick={onDashboardToggle}
                  className={`p-2.5 rounded-full transition-all duration-300 flex items-center space-x-1 ${
                    location.pathname.startsWith("/dashboard")
                      ? "bg-[#0e6a67] text-white shadow-inner"
                      : "bg-white text-[#0e6a67] hover:bg-[#106865] hover:text-white shadow-md hover:shadow-lg"
                  }`}
                  title="Dashboard"
                >
                  <User className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-gradient-to-r from-[#baf5f3] to-[#0e6a67] hover:from-[#788080] hover:to-[#0b7471] text-black rounded-md text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Resister
                </Link>
                {/* <Link
                  to="/signup"
                  className="px-4 py-2 bg-white text-[#0e6a67] hover:bg-gray-100 rounded-md text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Sign Up
                </Link> */}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user && (
              <button
                onClick={onDashboardToggle}
                className={`p-2 mr-2 rounded-full ${
                  location.pathname.startsWith("/dashboard")
                    ? "bg-[#0e6a67] text-white"
                    : "bg-white text-[#0e6a67]"
                }`}
                title="Dashboard"
              >
                <User className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-[#0e6a67] focus:outline-none"
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
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-white bg-[#0e6a67]"
                      : "text-blue-100 hover:text-white hover:bg-[#0A5C59]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!user && (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 mt-2 rounded-md text-base font-medium bg-[#0b7471] hover:bg-[#106865] text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-white text-[#0e6a67] hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}