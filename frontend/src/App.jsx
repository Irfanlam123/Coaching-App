import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AdminSidebar from "./pages/admin/AdminSidebar";
import UserSidebar from "./pages/User/UserSidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const { user, logout, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="relative">
      <Navbar onDashboardToggle={()=>setSidebarOpen(!sidebarOpen)} />

      {user && user.role === "admin" && <AdminSidebar isOpen={sidebarOpen} onClose={()=>setSidebarOpen(false)} onLogout={logout} />}
      {user && user.role === "user" && <UserSidebar isOpen={sidebarOpen} onClose={()=>setSidebarOpen(false)} onLogout={logout} />}

      <div className="">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default App;
