import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IconFileCertificate, IconLogout } from "@tabler/icons-react";
import { X } from "lucide-react";

export default function UserSidebar({ isOpen, onClose, onLogout }) {
  const location = useLocation();

  const menuItems = [
    { path: "/user/results", label: "Results", icon: <IconFileCertificate size={18} /> },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className="fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-[#065666] to-[#0a7c74] shadow-2xl p-6 flex flex-col justify-between z-50"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mt-12 mb-6 flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-1">User Dashboard</h2>
            <p className="text-teal-200 text-sm">Manage your learning</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "bg-white/25 text-white shadow-inner"
                      : "text-teal-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="flex-1 font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="pt-4">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/20 hover:bg-red-500 text-white font-medium transition-all duration-200"
          >
            <IconLogout size={18} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}