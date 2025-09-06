// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebarDashboard from "../../components/adminSidebarDahsboard";
const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebarDashboard />

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Outlet /> {/* nested routes will render here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;