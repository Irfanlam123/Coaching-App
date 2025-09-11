import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AdminSidebar from "./pages/admin/AdminSidebar";
import UserSidebar from "./pages/User/UserSidebar";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
function App() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => setSidebarOpen(!sidebarOpen);
  const handleSidebarClose = () => setSidebarOpen(false);

  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar onDashboardToggle={handleSidebarToggle} />

      {/* Conditional Sidebar */}
      {user && user.role === "admin" && (
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
          onLogout={logout}
        />
      )}
      {user && user.role === "user" && (
        <UserSidebar
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
          onLogout={logout}
        />
      )}

      {/* Main Content */}
      <div className="">
        <Outlet />
        <Footer/>
      </div>
    </div>
  );
}

export default App;
