// src/router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import StudyMaterials from "./pages/StudyMaterials";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Results from "./pages/dashboard/Results";
import UploadMaterials from "./pages/admin/UploadMaterials";
import AddResults from "./pages/admin/AddResults";
import Contact from "./pages/Contact";
import MyMaterials from "./pages/dashboard/MyMaterials";
import Dashboard from "./pages/dashboard/Dashboard";
import { useAuth } from "./context/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard"; // 🔥 admin dashboard

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  return user && user.role === "admin" ? children : <Navigate to="/login" />;
}

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "about", element: <About /> },
//       { path: "services", element: <Services /> },
//       { path: "study-materials", element: <StudyMaterials /> },
//       { path: "contact", element: <Contact /> },

//       // Auth
//       { path: "login", element: <Login /> },
//       { path: "signup", element: <Signup /> },

//       // User Dashboard
//       {
//         path: "dashboard",
//         element: (
//           <PrivateRoute>
//             <Dashboard />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "dashboard/results",
//         element: (
//           <PrivateRoute>
//             <Results />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "dashboard/my-materials",
//         element: (
//           <PrivateRoute>
//             <MyMaterials />
//           </PrivateRoute>
//         ),
//       },

//       // Admin routes (protected)
//       {
//         path: "admin",
//         element: (
//           <AdminRoute>
//             <AdminDashboard />
//           </AdminRoute>
//         ),
//         children: [
//           { path: "upload-materials", element: <UploadMaterials /> },
//           { path: "add-results", element: <AddResults /> },
//         ],
//       },
//     ],
//   },
// ]);

// export default router;
// src/router.jsx
// ... other imports ...

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // ... other routes ...

      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "study-materials", element: <StudyMaterials /> },
      { path: "contact", element: <Contact /> },

      // Auth
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      
      // User Dashboard
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/results",
        element: (
          <PrivateRoute>
            <Results />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/my-materials",
        element: (
          <PrivateRoute>
            <MyMaterials />
          </PrivateRoute>
        ),
      },

      // Admin routes (protected)
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
        children: [
          { 
            index: true, 
            element: <Navigate to="/admin/upload-materials" replace /> 
          },
          { path: "upload-materials", element: <UploadMaterials /> },
          { path: "add-results", element: <AddResults /> },
        ],
      },
    ],
  },
]);

export default router;