import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/core/api/auth.api";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      login: async (email, password) => {
        set({ loading: true });

        try {
          const res = await authApi.login({ email, password });

          const { accessToken, user } = res.data;

          set({
            user,
            token: accessToken,
            isAuthenticated: true,
            loading: false,
          });

          localStorage.setItem("access_token", accessToken);
        } catch (err) {
          set({ loading: false });
          throw err;
        }
      },

      logout: () => {
        localStorage.removeItem("access_token");

        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "secureflow-auth",
    }
  )
);
