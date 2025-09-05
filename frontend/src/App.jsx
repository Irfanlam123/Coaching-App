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

      {/* Main Content (only this scrolls) */} 
      <main className="flex-1 overflow-y-auto">
        <div className="animate-fadeIn p-4 min-h-[calc(100vh-140px)]">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
}