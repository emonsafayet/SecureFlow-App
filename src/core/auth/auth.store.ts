import { create } from "zustand";
import { tokenStorage } from "./auth.storage";
import { api } from "../api/axios.instance";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  permissions: string[];
  isAuthInitialized: boolean;

  setAuth: (token: string, permissions: string[]) => void;
  logout: () => void;
  restore: () => void;
  markAuthInitialized: () => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  token: tokenStorage.get(),
  isAuthenticated: !!tokenStorage.get(),
  permissions: [],
  isAuthInitialized: false,

  setAuth: (token, permissions) => {
    tokenStorage.set(token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    set({
      token,
      permissions,
      isAuthenticated: true,
    });
  },

  logout: () => {
    tokenStorage.remove();
    delete api.defaults.headers.common.Authorization;
    set({
      token: null,
      permissions: [],
      isAuthenticated: false,
      isAuthInitialized: true,
    });
  },

  restore: () => {
    const token = tokenStorage.get();
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      set({
        token,
        isAuthenticated: true,
      });
    }
  },

  markAuthInitialized: () => {
    set({ isAuthInitialized: true });
  },
}));
