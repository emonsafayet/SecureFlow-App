import { useEffect, useCallback } from "react";
import { useAuthStore } from "../core/auth/auth.store";

export function useAppInitializer() {
  const {
    restore,
    setAuth,
    markAuthInitialized,
  } = useAuthStore();

  const bootstrap = useCallback(async () => {
    try {
      await restore();
      const { token,permissions } = useAuthStore.getState();
      if (token) {
        setAuth(token,permissions);
      }

      markAuthInitialized();
    } catch (err) {
      console.error("App initialization failed:", err);
      useAuthStore.getState().logout();
    }
  }, [restore, setAuth, markAuthInitialized]);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);
}
