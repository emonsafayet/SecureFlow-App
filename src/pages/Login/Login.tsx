import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/core/auth/auth.store";
import { useMenuStore } from "@/core/menu/menu.store";
import { login, setAuthToken } from "@/services/auth.service";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Login
      const res = await login({ email, password });
      const data = (res as { data?: { accessToken?: string; AccessToken?: string } })?.data ?? (res as { accessToken?: string; AccessToken?: string });
      const token = data?.accessToken ?? (data as { AccessToken?: string })?.AccessToken;
      if (!token) throw new Error("Token missing");

      // 2. Persist token and attach to axios before menu request
      localStorage.setItem("access_token", token);
      setAuthToken(token);

      // 3. Load menus/current (populates menu store with menus + permissions)
      await useMenuStore.getState().loadMenus();
      const permissions = useMenuStore.getState().permissions;

      // 4. Update auth store (required by RequirePermission on protected routes)
      useAuthStore.getState().setAuth(token, permissions);

      // 5. Navigate
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold">SecureFlow</h1>
          <p className="text-slate-500">Sign in to your workspace</p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="admin@secureflow.com"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="••••••••"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}




