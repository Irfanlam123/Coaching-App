import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "../../pages/admin/AdminSidebar";
import { Menu } from "lucide-react";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar closed by default

  // Agar login nahi hai ya role admin nahi hai to login page pe bhej do
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={logout}
      />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Button to toggle sidebar */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="mb-4 p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center gap-2"
        >
          <Menu size={20} />
          Open Admin Menu
        </button>
        
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;