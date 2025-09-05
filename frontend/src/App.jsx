import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";
import { useState, useEffect } from "react";
// import CursorTrail from "./components/cursorTrail";
// import FloatingParticles from "./components/cursorTrail";

export default function App() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white">Premium Institute</h2>
          <p className="text-blue-200 mt-2">Loading excellence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Add FloatingParticles as a background element */}
      {/* <FloatingParticles /> */}
      
      <header className="sticky top-0 z-50 shadow-lg">
        <Navbar onMenuClick={toggleSidebar} />
      </header>
      
      <div className="flex flex-1">
        {user && (
          <>
            {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeSidebar}></div>}
            <div className={`fixed top-0 left-0 h-full w-64 transform transition-transform duration-300 ease-in-out z-50 md:relative md:z-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
              <Sidebar onClose={closeSidebar} />
            </div>
          </>
        )}
        <main className={`flex-1 transition-all duration-300 ${user && sidebarOpen ? "md:ml-64" : ""}`}>
          <div className="animate-fadeIn p-4">
            <Outlet />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}