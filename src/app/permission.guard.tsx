import { Navigate } from "react-router-dom";
import { useAuthStore } from "../core/auth/auth.store";
import type { JSX } from "react";

interface Props {
  permission: string;
  children: JSX.Element;
}

function RequirePermission({ permission, children }: Props) {
  const permissions = useAuthStore((s) => s.permissions);

  if (!permissions.includes(permission)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequirePermission;
