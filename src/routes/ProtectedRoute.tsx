import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/core/auth/auth.store";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const token = useAuthStore((s) => s.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
