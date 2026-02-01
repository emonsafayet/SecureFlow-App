import axios from "axios";
import { useAuthStore } from "@/core/auth/auth.store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
  withCredentials: false,
});

//
// REQUEST: attach token
//
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
},
  (error) => Promise.reject(error)
);

//
// RESPONSE: auto logout on 401
//
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // single source of truth
      useAuthStore.getState().logout();

      // hard redirect avoids stale state
      window.location.href = "/login";
    }
    if (error.response?.status  === 403) {
      // Authenticated but not authorized
      window.location.href = "/forbidden";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
