import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const path = (config.url ?? "").replace(/^\//, "");
  const isLogin = path === "auth/login" || path.endsWith("/auth/login") || path.includes("auth/login");
  if (isLogin) {
    return config;
  }
  const fromStorage = localStorage.getItem("access_token");
  const fromDefaults = api.defaults.headers.common["Authorization"];
  const token =
    (typeof fromDefaults === "string" && fromDefaults.replace(/^Bearer\s+/i, "").trim()) ||
    fromStorage;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;