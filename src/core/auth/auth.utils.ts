import { jwtDecode } from "jwt-decode";
import type {  JwtPayload,  AuthUser } from "./auth.types";

export function decodeJwt(token: string): AuthUser {
  const decoded = jwtDecode<JwtPayload>(token);

  const permissions = decoded.permission
    ? Array.isArray(decoded.permission)
      ? decoded.permission
      : [decoded.permission]
    : [];

  return {
    id: decoded.sub,
    email: decoded.email,
    tenantId: decoded.tenant_id,
    userType: decoded.user_type,
    permissions,
  };
}
