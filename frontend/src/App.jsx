import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardSidebar from "./components/DashboardSidebar";
import { useState } from "react";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 shadow-lg">
        <Navbar onDashboardToggle={() => setIsSidebarOpen(true)} />
      </header>

      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
