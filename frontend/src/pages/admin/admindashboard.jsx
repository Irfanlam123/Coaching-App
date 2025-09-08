import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminSidebar from "./adminSidebarDahsboard";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size - FIXED: Proper initialization and cleanup
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-manage sidebar based on screen size
      if (mobile) {
        // On mobile, sidebar should be closed by default
        setSidebarOpen(false);
      } else {
        // On desktop, sidebar should be open by default
        setSidebarOpen(true);
      }
    };

    // Set initial state immediately
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Removed sidebarOpen dependency to prevent infinite loops

  // Authentication check - FIXED: Added proper loading state
  useEffect(() => {
    if (user === null) {
      // Still loading, do nothing
      return;
    }
    
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  // Show loading state while checking authentication
  if (user === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#043D3B] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Redirect if not admin (handled by useEffect, but added safety check)
  if (!user || user.role !== "admin") {
    return null;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // FIXED: Proper sidebar classes that work consistently
  const getSidebarClasses = () => {
    if (isMobile) {
      return sidebarOpen 
        ? "fixed inset-y-0 left-0 z-50 w-64 transform translate-x-0" 
        : "fixed inset-y-0 left-0 z-50 w-64 transform -translate-x-full";
    } else {
      return sidebarOpen 
        ? "relative z-30 w-64 flex-shrink-0" 
        : "relative z-30 w-0 flex-shrink-0 overflow-hidden";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar - FIXED: Consistent behavior */}
      <div className={getSidebarClasses()}>
        <AdminSidebar 
          onClose={() => setSidebarOpen(false)} 
          isMobile={isMobile}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 md:hidden py-3 px-4 flex items-center justify-between shadow-sm">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#043D3B]"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-900 ml-2">Admin Dashboard</h1>
          </div>
          
          <div className="w-10"></div> {/* Spacer for balance */}
        </header>

        {/* Desktop Header - FIXED: Added sidebar toggle for desktop too */}
        <header className="hidden md:flex items-center justify-between bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 mr-4 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#043D3B]"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-[#043D3B] to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
