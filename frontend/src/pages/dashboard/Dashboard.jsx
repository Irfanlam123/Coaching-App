import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex-1 p-6 overflow-auto h-screen">
      {/* Nested routes render here */}
      <Outlet />
    </div>
  );
}
