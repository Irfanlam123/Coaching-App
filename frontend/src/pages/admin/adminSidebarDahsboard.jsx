import { Link, useLocation } from "react-router-dom";
import { Upload, BarChart3, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { path: "/admin/upload-materials", name: "Upload Materials", icon: Upload },
    { path: "/admin/add-results", name: "Add Results", icon: BarChart3 },
    {path:"/admin/get-info", name:"GetData" , icon:BarChart3},
    {path:"/admin/add-schedule", name:"uploadSchedule" , icon:Upload},
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-64 bg-[#043D3B] text-white h-full flex flex-col">
      <div className="p-4 border-b border-[#0A5C59]">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-[#0A5C59] text-white"
                    : "text-gray-300 hover:bg-[#0A5C59] hover:text-white"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      
      <div className="p-4 border-t border-[#0A5C59]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}