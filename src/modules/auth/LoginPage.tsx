import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../core/auth/auth.store";
import { useMenuStore } from "../../core/menu/menu.store";
import { authApi } from "../../core/auth/auth.api"; //  real API

function LoginPage() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 1️ Call backend login
    const response = await authApi.login({
      username: "admin",      // TEMP
      password: "password",   // TEMP
    });

    const token = response.accessToken;

    // 2️ Load menus + permissions from backend
    const { permissions } = await useMenuStore.getState().loadMenus();

    // 3️ Set auth state using backend permissions
    setAuth(token, permissions);

    // 4️ Navigate only AFTER auth + menus ready
    navigate("/dashboard");
  };

  return (
    <>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default LoginPage;
