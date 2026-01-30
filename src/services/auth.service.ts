import api from "@/core/http/axios";

// Login API — must not send any Authorization header; interceptor skips /auth/login
export const login = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await api.post("auth/login", payload);
  return res.data;
};

//  Set token globally (VERY IMPORTANT)
export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Clear token on logout
export const clearAuthToken = () => {
  delete api.defaults.headers.common["Authorization"];
};
