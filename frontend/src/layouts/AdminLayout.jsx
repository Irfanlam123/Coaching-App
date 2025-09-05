export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Admin Panel</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {children}
      </div>
    </div>
  );
}
