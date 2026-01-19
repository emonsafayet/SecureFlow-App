import { create } from "zustand";
import { tokenStorage } from "./auth.storage";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  restore: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: tokenStorage.get(),
  isAuthenticated: !!tokenStorage.get(),

  login: (token) => {
    tokenStorage.set(token);
    set({ token, isAuthenticated: true });
  },

  logout: () => {
    tokenStorage.remove();
    set({ token: null, isAuthenticated: false });
  },

  restore: () => {
    const token = tokenStorage.get();
    if (token) {
      set({ token, isAuthenticated: true });
    }
  },
}));
