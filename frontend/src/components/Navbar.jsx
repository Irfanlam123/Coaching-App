import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Menu, X, Home, BookOpen, GraduationCap, Info, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "../assets/logo.jpeg";

export default function Navbar({ onDashboardToggle }) {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: "/", name: "Home", icon: <Home className="w-5 h-5" /> },
    { path: "/services", name: "Services", icon: <GraduationCap className="w-5 h-5" /> },
    { path: "/study-materials", name: "Study Materials", icon: <BookOpen className="w-5 h-5" /> },
    { path: "/about", name: "About", icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <nav className={`bg-gradient-to-r from-[#043D3B] to-[#0A5C59] text-white shadow-xl fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'py-2 shadow-2xl' : 'py-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with animation */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <img 
                className="rounded-3xl w-8 h-8 object-contain transform group-hover:rotate-12 transition-transform duration-300" 
                src={Logo} 
                alt="Viraam Vaani Logo" 
              />
            </div>
            <span className="text-xl font-bold">
              <span className="text-white group-hover:text-blue-100 transition-colors duration-300">Viraam</span>
              <span className="text-blue-500 group-hover:text-blue-300 transition-colors duration-300">Vaani</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === item.path
                    ? "text-white bg-[#0e6a67] shadow-inner scale-105"
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
                className="p-2.5 rounded-full bg-white text-[#0e6a67] hover:bg-[#106865] hover:text-white shadow-md transition-all duration-300 transform hover:scale-110"
                title="Dashboard"
              >
                <User className="w-5 h-5" />
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-gradient-to-r from-[#baf5f3] to-[#0e6a67] text-black rounded-md text-sm font-medium shadow-md hover:opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Signin
              </Link>
            )}      
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <button
                onClick={onDashboardToggle}
                className="p-2 rounded-full bg-white text-[#0e6a67] hover:bg-[#106865] hover:text-white transition-all duration-300 transform hover:scale-110"
                title="Dashboard"
              >
                <User className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-[#0e6a67] transition-all duration-300 relative group"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 transform rotate-180 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" />
              )}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>

        {/* Mobile Side Menu with enhanced animation */}
        {mobileMenuOpen && (
          <>
            {/* Animated Overlay */}
            <div 
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm animate-fade-in"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Animated Side Menu */}
            <div className="md:hidden fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-[#022725] to-[#0A5C59] shadow-2xl z-50 transform transition-transform duration-500 ease-out animate-slide-in-right">
              <div className="p-6 h-full flex flex-col relative overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
                  <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-300 rounded-full animate-ping"></div>
                </div>

                {/* Close Button */}
                <div className="flex justify-end mb-6 z-10">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300 transform hover:rotate-90"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Logo in Mobile Menu */}
                <div className="flex items-center space-x-2 mb-8 z-10 transform hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <img className="rounded-3xl w-10 h-10 object-contain" src={Logo} alt="Logo" />
                  </div>
                  <span className="text-2xl font-bold">
                    <span className="text-white">Viraam</span>
                    <span className="text-blue-500">Vaani</span>
                  </span>
                </div>

                {/* Navigation Links with staggered animation */}
                <div className="flex-1 space-y-3 z-10">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-4 rounded-xl text-base font-medium transition-all duration-300 transform hover:translate-x-2 ${
                        location.pathname === item.path
                          ? "text-white bg-gradient-to-r from-[#0e6a67] to-[#0A5C59] shadow-inner scale-105"
                          : "text-blue-100 hover:text-white hover:bg-[#0A5C59]/50"
                      } animate-fade-in-up`}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="text-blue-300">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Mobile Login/Register Button */}
                {!user && (
                  <div className="pt-6 border-t border-[#0A5C59] z-10">
                    <Link
                      to="/login"
                      className="flex items-center justify-center space-x-2 w-full px-4 py-4 bg-gradient-to-r from-[#baf5f3] to-[#0e6a67] text-black rounded-xl font-medium shadow-md hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogIn className="w-5 h-5" />
                      <span>Signin / Register</span>
                    </Link>
                  </div>
                )}

                {/* Footer in Mobile Menu */}
                <div className="pt-6 text-center text-blue-200 text-sm z-10">
                  <p>Empowering Education</p>
                  <p className="text-xs mt-1">© 2024 Viraam Vaani</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add custom animations to global CSS */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.5s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </nav>
  );
}