import { useAppInitializer } from "./app/useAppInitializer";
import { AppRoutes } from "./app/routes";
import { useAuthStore } from "./core/auth/auth.store";

function App() {
  useAppInitializer();

  const isAuthInitialized = useAuthStore((s) => s.isAuthInitialized);

  if (!isAuthInitialized) {
    return <div>Initializing application...</div>;
  }

  return <AppRoutes />;
}

export default App;
