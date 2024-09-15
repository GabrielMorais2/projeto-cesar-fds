import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from "../components/Dashboard";
import ReportsGroups from "@/components/ReportGroups";
import DisciplineGroupManagement from "@/components/DisciplineGroupManagement";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import ErrorPage from "@/components/ErrorPage";
import AssessmentManagement from "@/components/AssessmentManagement";

const Routes = () => {
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
      errorElement: <ErrorPage />, 
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
      errorElement: <ErrorPage />, 
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <div>User Home Page</div>,
        },
        {
          path: "/reports-groups",
          element: <ReportsGroups />,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/disciplinas-grupos",
          element: <DisciplineGroupManagement />,
        },
        {
          path: "/avaliacoes",
          element: <AssessmentManagement />,
        },
      ],
    },
  ];

  const routesForNotAuthenticated = [
    {
      path: "/",
      element: <div>Home Page</div>,
      errorElement: <ErrorPage />, 
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <ErrorPage />, 
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForNotAuthenticated,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;