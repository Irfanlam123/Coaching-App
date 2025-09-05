import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import StudyMaterials from "./pages/StudyMaterials";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Results from "./pages/dashboard/Results";
import UploadMaterials from "./pages/admin/UploadMaterials";
import AddResults from "./pages/admin/AddResults";
import { useAuth } from "./context/AuthContext";
import Contact from "./pages/Contact";


function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "study-materials", element: <StudyMaterials /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "contact", element: <Contact /> },

      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "results",
        element: (
          <PrivateRoute>
            <Results />
          </PrivateRoute>
        ),
      },
      { path: "admin/upload-materials", element: <UploadMaterials /> },
      { path: "admin/add-results", element: <AddResults /> },
    ],
  },
]);

export default router;
