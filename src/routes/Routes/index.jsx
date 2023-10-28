import { lazy, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "@/pages/ErrorPage";

import AuthRoute from "../AuthRoute";
import StandardRoute from "../StandardRoute";
import ProtectedRoute from "../ProtectedRoute";

const AuthMainPage = lazy(() => import("@/pages/AuthMainPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const CallbackPage = lazy(() => import("@/pages/CallbackPage"));

// Define public routes accessible to all users
const routesForPublic = [
  {
    path: "/service",
    element: <div>Service Page</div>,
  },
  {
    path: "/about-us",
    element: <div>About Us</div>,
  },
  {
    path: "/auth/callback",
    element: <CallbackPage />,
  },
];

const routesForUnAuthenticated = [
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/main",
        element: <AuthMainPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
];

// Define routes accessible only to authenticated users
const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <StandardRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/profile",
            element: <div>User Profile</div>,
          },
          {
            path: "/logout",
            element: <div>Logout</div>,
          },
        ],
      },
      ...routesForUnAuthenticated,
    ],
  },
];

const Routes = () => {
  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
