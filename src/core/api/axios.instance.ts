import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.errors) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      message: "Something went wrong",
    });
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized – redirect to login");
    }
    return Promise.reject(error);
  }
);
