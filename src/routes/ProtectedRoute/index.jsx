import { Outlet, Navigate } from "react-router-dom";

import { getToken } from "@/services/storage";

const ProtectedRoute = () => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/main" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
