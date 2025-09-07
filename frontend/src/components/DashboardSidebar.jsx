import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  X, 
  BookOpen, 
  FileText, 
  User, 
  LogOut,
  BarChart3,
  ChevronRight
} from "lucide-react";

export default function DashboardSidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const menuItems = [
    { path: "/dashboard/results", name: "Results", icon: BarChart3 },
    // { path: "/dashboard/my-materials", name: "My Materials", icon: BookOpen },
    // { path: "/dashboard/profile", name: "Profile", icon: User },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-[#043D3B] to-[#0A5C59] text-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pt-16 px-6 pb-6 h-full flex flex-col">
          {/* User Info */}
          {user && (
            <div className="flex items-center space-x-4 p-4 bg-white bg-opacity-10 rounded-xl mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <p className="font-semibold">{user.name || "User"}</p>
                <p className="text-teal-200 text-sm">{user.email}</p>
              </div>
            </div>
          )}

          <h2 className="text-xl font-bold mb-6 flex items-center">
            <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              My Dashboard
            </span>
          </h2>

          {/* Navigation Menu */}
          <nav className="flex-1">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-xl bg-white bg-opacity-5 hover:bg-opacity-10 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-teal-700 bg-opacity-50 rounded-lg group-hover:bg-opacity-100 transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout button */}
          {user && (
            <button
              onClick={handleLogout}
              className="mt-6 flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}