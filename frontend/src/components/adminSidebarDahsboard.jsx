// src/components/AdminSidebarDashboard.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, BookOpen, BarChart3, Upload } from "lucide-react";

const AdminSidebarDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const links = [
    { 
      path: "/admin/upload-materials", 
      name: "Upload Materials", 
      icon: <Upload className="w-5 h-5" />
    },
    { 
      path: "/admin/add-results", 
      name: "Add Results", 
      icon: <BarChart3 className="w-5 h-5" />
    },
  ];

  return (
    <div className="w-64 bg-[#043D3B] text-white min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <BookOpen className="w-6 h-6" />
        Admin Panel
      </h2>
      
      <nav className="flex flex-col space-y-2 flex-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              location.pathname === link.path
                ? "bg-white text-[#043D3B] font-semibold"
                : "hover:bg-[#065755]"
            }`}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav>
      
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#065755] transition mt-auto"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
};

export default AdminSidebarDashboard;