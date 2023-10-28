import { Outlet, Navigate } from "react-router-dom";

import { getToken } from "@/services/storage";

const AuthRoute = () => {
  const token = getToken();

  if (token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoute;
