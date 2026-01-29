import { useState } from "react";
import { authApi } from "@/core/api/auth.api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await authApi.login({
        email,
        password,
      });

      console.log("Login Success:", res.data); 
    } catch (err: unknown) {
      console.error("Login Failed:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Login</h2>

      <input type="email"  placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
