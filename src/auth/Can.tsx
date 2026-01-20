import type { ReactNode } from "react";
import type { Permission } from "./permissions";
import { useAuthStore } from "./auth.store";

export function Can({
  permission,
  children,
}: {
  permission: Permission;
  children: ReactNode;
}) {
  const has = useAuthStore((s) =>
    s.hasPermission(permission)
  );

  if (!has) return null;

  return <>{children}</>;
}
