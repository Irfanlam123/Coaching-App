// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Sidebar({ onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      path: "/results",
      name: "Results",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      path: "/my-materials",
      name: "Study Materials",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <div className={`h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white p-4 transition-all duration-300 ease-in-out z-40 shadow-xl ${isExpanded ? 'w-64' : 'w-20'}`}>
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        {isExpanded && (
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Student Portal
          </h2>
        )}
        <div className="flex items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full hover:bg-blue-800 transition-colors duration-200 mr-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
            </svg>
          </button>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-blue-800 transition-colors duration-200 md:hidden"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center mb-8 p-3 rounded-lg bg-blue-800/30 backdrop-blur-sm">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </span>
        </div>
        {isExpanded && (
          <div className="ml-3 overflow-hidden">
            <p className="font-medium truncate">{user?.name || 'Student'}</p>
            <p className="text-blue-300 text-sm truncate">Class {user?.class || 'XII'}</p>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              onClick={handleLinkClick}
              className={`flex items-center p-3 rounded-lg transition-all duration-300 group ${
                location.pathname === item.path
                  ? "bg-blue-700 shadow-md"
                  : "hover:bg-blue-800/50"
              }`}
            >
              <span className={`transition-colors duration-300 ${location.pathname === item.path ? "text-blue-200" : "text-blue-400 group-hover:text-blue-200"}`}>
                {item.icon}
              </span>
              {isExpanded && (
                <span className="ml-3 font-medium">{item.name}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Quick Stats */}
      {isExpanded && (
        <div className="mt-8 p-4 bg-blue-800/20 rounded-lg border border-blue-700/30">
          <h3 className="text-sm font-semibold text-blue-300 mb-2">Performance</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Tests Completed</span>
              <span className="font-bold text-blue-300">12/15</span>
            </div>
            <div className="w-full bg-blue-900 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Button */}
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 rounded-lg bg-red-900/30 hover:bg-red-900/50 text-red-300 hover:text-red-100 transition-all duration-300 group border border-red-700/30"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {isExpanded && <span className="ml-3 font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}