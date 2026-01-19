import { useEffect } from "react";
import { AppRoutes } from "./app/routes";
import { useAuthStore } from "./core/auth/auth.store";

function App() {
  const restore = useAuthStore((s) => s.restore);

  useEffect(() => {
    restore();
  }, [restore]);

  return <AppRoutes />;
}

export default App;
