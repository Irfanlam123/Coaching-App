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
import AdminDashboard from "./pages/admin/AdminDashboard";
import SuccessStories from "./pages/SuccessStories";
import ResourcesBlog from "./pages/ResourcesBlog";

// Create wrapper components for protected routes
const PrivateRoute = ({ children }) => {
  // This will be handled by the Dashboard component itself
  return children;
};

const AdminRoute = ({ children }) => {
  // This will be handled by the AdminDashboard component itself
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "study-materials", element: <StudyMaterials /> },
      { path: "contact", element: <Contact /> },
      { path: "story", element: <SuccessStories/> },
      { path: "blog", element: <ResourcesBlog /> },

      // Auth
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      // User Dashboard - protection handled in Dashboard component
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <Navigate to="/dashboard/results" replace /> },
          { path: "results", element: <Results /> },
          { path: "my-materials", element: <MyMaterials /> },
        ],
      },

      // Admin routes - protection handled in AdminDashboard component
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
        children: [
          { index: true, element: <Navigate to="/admin/upload-materials" replace /> },
          { path: "upload-materials", element: <UploadMaterials /> },
          { path: "add-results", element: <AddResults /> },
        ],
      },

      // Catch all route - redirect to home
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default router;