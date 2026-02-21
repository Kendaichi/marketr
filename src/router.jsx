import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./components/Layouts/GuestLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/guest",
    element: <GuestLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  { path: "/blog", element: <Blog /> },
  { path: "/blog/:slug", element: <BlogPost /> },
  { path: "/case-studies", element: <CaseStudies /> },
  { path: "/case-studies/:slug", element: <CaseStudyDetail /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
