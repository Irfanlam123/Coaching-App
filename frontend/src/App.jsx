import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar"; // Make sure Sidebar exists
import { useAuth } from "./context/AuthContext";
import { useState } from "react";

export default function App() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 shadow-lg">
        <Navbar />
      </header>

      <div className="flex flex-1">
        {/* Sidebar only visible if user is logged in */}
        {user && (
          <>
            {/* Overlay for mobile */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                onClick={closeSidebar}
              ></div>
            )}

            {/* Sidebar */}
            <div
              className={`fixed top-0 left-0 h-full w-64 transform transition-transform duration-300 ease-in-out z-50 md:relative md:z-auto ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
              }`}
            >
              <Sidebar onClose={closeSidebar} />
            </div>
          </>
        )}

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            user && sidebarOpen ? "md:ml-64" : ""
          }`}
        >
          <div className="animate-fadeIn p-4 min-h-[calc(100vh-140px)]">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
