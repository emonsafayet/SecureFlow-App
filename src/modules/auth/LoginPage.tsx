import { useAuthStore } from "../../core/auth/auth.store";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = () => {
    login("fake-jwt-token");
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
