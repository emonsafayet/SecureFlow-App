import type { ReactNode } from "react";
import { useAuthStore } from "./auth.store";

interface CanProps {
  permission: string | string[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * <Can permission="Permissions.Users.Update">
 *   <SaveButton />
 * </Can>
 */
export default function Can({
  permission,
  children,
  fallback = null,
}: CanProps) {
  const permissions = useAuthStore(
    (s) => s.user?.permissions ?? []
  );

  const required = Array.isArray(permission)
    ? permission
    : [permission];

  const allowed = required.every((p) =>
    permissions.includes(p)
  );

  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
