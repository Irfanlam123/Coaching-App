import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard ,User } from "lucide-react";

export default function Navbar({ onDashboardToggle }) {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: "/", name: "Home" },
    { path: "/services", name: "Services" },
    { path: "/study-materials", name: "Study Materials" },
    { path: "/about", name: "About" },
  
  ];

  return (
    <nav className="bg-[#043D3B] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <img
                className="rounded-3xl"
                src="./src/assets/logo.jpeg"
                alt="Logo"
              />
            </div>
            <span className="text-xl font-bold">
              <span className="text-white">Viraam</span>
              <span className="text-orange-500">Vaani</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group ${
                  location.pathname === item.path
                    ? "text-white bg-[#0e6a67]"
                    : "text-blue-100 hover:text-white hover:bg-[#106865]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* ✅ Dashboard Icon (Right side) */}
          <div className="hidden md:flex items-center space-x-3">
            {user && (
              <button
                onClick={onDashboardToggle}
                className={`p-2 rounded-full transition-colors ${
                  location.pathname.startsWith("/dashboard")
                    ? "bg-[#0e6a67] text-white"
                    : "text-blue-100 hover:bg-[#106865] hover:text-white"
                }`}
                title="Dashboard"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {!user && (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-[#0b7471] hover:bg-[#106865] text-white rounded-md text-sm font-medium transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-[#0b7471] hover:bg-[#106865] text-white rounded-md text-sm font-medium transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
