  import { createBrowserRouter, Navigate } from "react-router-dom";
  import App from "./App";

  // Pages
  import Home from "./pages/Home";
  import About from "./pages/About";
  import Services from "./pages/Services";
  import StudyMaterials from "./pages/StudyMaterials";
  import Login from "./pages/Login";
  import Signup from "./pages/Signup";
  import Results from "./pages/User/Results";
  import MyMaterials from "./pages/User/MyMaterials";
  import UploadMaterials from "./pages/admin/UploadMaterials";
  import AddResults from "./pages/admin/AddResults";
  import Contact from "./pages/Contact";
  import AdminDashboard from "./components/Dashboard/AdminDashboard";
  import ResourcesBlog from "./pages/ResourcesBlog";
  import FounderStory from "./pages/SuccessStories";
  import UserDashboard from "./components/Dashboard/UserDashboard";
  import AddSchedule from "./pages/admin/addShedule";

  import ShowSchedule from "./pages/ShowSchedule";
import GetInfo from "./pages/admin/GetInfo";

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
        { path: "story", element: <FounderStory /> },
        { path: "blog", element: <ResourcesBlog /> },
        { path: "show-schedule", element: <ShowSchedule /> },

        // Auth
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },

        // User Dashboard
        {
          path: "user",
          element: <UserDashboard />,
          children: [
            { index: true, element: <Navigate to="results" replace /> },
            { path: "results", element: <Results /> },
            { path: "my-materials", element: <MyMaterials /> },
          ],
        },

        // Admin Dashboard
        {
          path: "admin",
          element: <AdminDashboard />,
          children: [
            { index: true, element: <Navigate to="upload-materials" replace /> },
            { path: "upload-materials", element: <UploadMaterials /> },
            { path: "add-results", element: <AddResults /> },
            { path: "get-info", element: <GetInfo /> },
            { path: "add-schedule", element: <AddSchedule /> },
          ],
        },

        // Catch all route
        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ]);

  export default router;
