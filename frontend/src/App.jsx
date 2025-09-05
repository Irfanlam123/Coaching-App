import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";
import { useState, useEffect } from "react";

export default function App() {
  const { user } = useAuth();

 

 

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 shadow-lg">
        <Navbar />
      </header>
<<<<<<< HEAD

      {/* Main Content (only this scrolls) */} 
      <main className="flex-1 overflow-y-auto">
        <div className="animate-fadeIn p-4 min-h-[calc(100vh-140px)]">
          <Outlet />
        </div>
        <Footer />
      </main>
=======
      
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

>>>>>>> b89a731a33db732f356d9199fe054f32c8032deb
    </div>
  );
}