import { useEffect } from "react";
import { useAuthStore } from "@/core/auth/auth.store";

export function useAppInitializer() {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);
}
