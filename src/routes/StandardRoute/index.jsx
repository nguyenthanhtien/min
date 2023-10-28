import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import AuthBG from "@/components/layouts/AuthBG";

const ProtectedRoute = () => {
  return (
    <AuthBG>
      <Suspense>
        <Outlet />
      </Suspense>
    </AuthBG>
  );
};

export default ProtectedRoute;
