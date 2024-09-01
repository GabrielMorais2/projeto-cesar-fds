import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from "../components/Dashboard";
import ReportsGruops from "@/components/ReportGroups";
import DisciplineGroupManagement from "@/components/DisciplineGroupManagement";
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";

const Routes = () => {
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <div>User Home Page</div>,
        },
        {
          path: "/reports-groups",
          element: <ReportsGruops />,
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
      ],
    },
  ];

  const routesForNotAuthenticated = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ];
  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForNotAuthenticated,
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;