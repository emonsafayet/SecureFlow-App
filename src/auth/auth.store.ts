import { create } from "zustand";
import type { Permission } from "./permissions";
 

interface AuthState {
  permissions: Permission[];
  hasPermission: (p: Permission) => boolean;
}

export const useAuthStore = create<AuthState>(() => ({
  // TEMP: hardcoded for now
  permissions: [
    "USER_VIEW",
    "USER_CREATE",
    "USER_EDIT",
    "USER_DELETE",
  ],

        hasPermission: (p) => {
        void p;
        return true;
        }
}));
