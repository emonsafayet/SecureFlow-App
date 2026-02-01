import { create } from "zustand";
import type {  AuthUser } from "./auth.types";
import { decodeJwt } from "./auth.utils";

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  permissions: string[];
  isAuthenticated: boolean;
  isAuthInitialized: boolean;

  login: (token: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  permissions: [],
  isAuthenticated: false,
  isAuthInitialized: false,

  login: (token) => {
    const user = decodeJwt(token);

    localStorage.setItem("access_token", token);

    set({
      accessToken: token,
      user,
      permissions: user.permissions,
      isAuthenticated: true,
      isAuthInitialized: true,
    });
  },

  logout: () => {
    localStorage.removeItem("access_token");

    set({
      accessToken: null,
      user: null,
      permissions: [],
      isAuthenticated: false,
      isAuthInitialized: true,
    });
  },

  hydrate: () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      set({ isAuthInitialized: true });
      return;
    }

    try {
      const user = decodeJwt(token);

      set({
        accessToken: token,
        user,
        permissions: user.permissions,
        isAuthenticated: true,
        isAuthInitialized: true,
      });
    } catch {
      localStorage.removeItem("access_token");
      set({
        accessToken: null,
        user: null,
        permissions: [],
        isAuthenticated: false,
        isAuthInitialized: true,
      });
    }
  },
}));
