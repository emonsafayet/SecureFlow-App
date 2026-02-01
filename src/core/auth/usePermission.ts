import { useAuthStore } from "./auth.store";

export function usePermission(permission: string): boolean {
  return useAuthStore(
    (s) => s.user?.permissions.includes(permission) ?? false
  );
}
