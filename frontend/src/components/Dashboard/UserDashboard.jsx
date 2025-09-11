import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserSidebar from "../../pages/User/UserSidebar";

export default function UserDashboard() {
  const { user, logout } = useAuth();

  // Agar login nahi hai to login page pe bhej do
  if (!user || user.role !== "user") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - hamesha visible */}
      <UserSidebar onLogout={logout} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
