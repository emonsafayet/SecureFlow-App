import { useAuthStore } from "./auth.store";

export function hasPermission(permission?: string): boolean {
  if (!permission) return true;

  const permissions = useAuthStore.getState().permissions;
  return permissions.includes(permission);
}
