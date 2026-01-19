import { create } from "zustand";
import { tokenStorage } from "./auth.storage";
import { useMenuStore } from "../menu/menu.store";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  permissions: string[];

  setAuth: (token: string, permissions: string[]) => void;
  logout: () => void;
  restore: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: tokenStorage.get(),
  isAuthenticated: !!tokenStorage.get(),
  permissions: [],

  // Called AFTER backend returns permissions
  setAuth: (token, permissions) => {
    tokenStorage.set(token);
    set({
      token,
      permissions,
      isAuthenticated: true,
    });
  },

  logout: () => {
    tokenStorage.remove();
    useMenuStore.getState().clearMenus();

    set({
      token: null,
      permissions: [],
      isAuthenticated: false,
    });
  },

  // Restore ONLY token (permissions come from API)
  restore: () => {
    const token = tokenStorage.get();
    if (token) {
      set({
        token,
        isAuthenticated: true,
        permissions: [],
      });
    }
  },
}));
