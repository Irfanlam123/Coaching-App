import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardSidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-[#043D3B] text-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-xl"
      >
        ✕
      </button>

      <div className="mt-12 px-6 space-y-4">
        <h2 className="text-lg font-bold border-b border-white pb-2">
          My Dashboard
        </h2>

        {/* ✅ User Info */}
        {user && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="text-sm">Hi, {user.name || "User"}</span>
          </div>
        )}

        <nav className="flex flex-col space-y-3 mt-4">
          <Link to="/dashboard/results" onClick={onClose} className="hover:underline">
            Results
          </Link>
          <Link to="/dashboard/my-materials" onClick={onClose} className="hover:underline">
            My Materials
          </Link>
          <Link to="/dashboard/profile" onClick={onClose} className="hover:underline">
            Profile
          </Link>
        </nav>

        {/* ✅ Logout button inside sidebar */}
        {user && (
          <button
            onClick={handleLogout}
            className="mt-6 w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-colors duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
