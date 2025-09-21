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
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  location.pathname === item.path
                    ? "text-white bg-[#0e6a67] shadow-inner"
                    : "text-blue-100 hover:text-white hover:bg-[#0A5C59]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <button
                onClick={onDashboardToggle}
                className="p-2.5 rounded-full bg-white text-[#0e6a67] hover:bg-[#106865] hover:text-white shadow-md transition-all"
                title="Dashboard"
              >
                <User className="w-5 h-5" />
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-[#baf5f3] to-[#0e6a67] text-black rounded-md text-sm font-medium shadow-md hover:opacity-90 transition-all"
              >
                Signin
              </Link>
            )}      
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user && (
              <button
                onClick={onDashboardToggle}
                className="p-2 mr-2 rounded-full bg-white text-[#0e6a67] hover:bg-[#106865] hover:text-white transition-all"
                title="Dashboard"
              >
                <User className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-[#0e6a67] transition-all"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Side Menu */}
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <div 
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Side Menu */}
            <div className="md:hidden fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-[#043D3B] to-[#0A5C59] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
              <div className="p-6 h-full flex flex-col">
                {/* Close Button */}
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Logo in Mobile Menu */}
                <div className="flex items-center space-x-2 mb-8">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <img className="rounded-3xl w-8 h-8 object-contain" src={Logo} alt="Logo" />
                  </div>
                  <span className="text-xl font-bold">
                    <span className="text-white">Viraam</span>
                    <span className="text-blue-500">Vaani</span>
                  </span>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        location.pathname === item.path
                          ? "text-white bg-[#0e6a67] shadow-inner"
                          : "text-blue-100 hover:text-white hover:bg-[#0A5C59]"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile Login/Register Button */}
                {!user && (
                  <div className="pt-6 border-t border-[#0A5C59]">
                    <Link
                      to="/login"
                      className="block w-full text-center px-4 py-3 bg-gradient-to-r from-[#baf5f3] to-[#0e6a67] text-black rounded-xl font-medium shadow-md hover:opacity-90 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Signin
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}