import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../core/auth/auth.store";

function RequireAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
