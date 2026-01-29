import { api } from "./axios.instance";
import type { LoginRequest, LoginResponse } from "../models/auth.model";

export const authApi = {
  login: (data: LoginRequest) =>
    api.post<LoginResponse>("/auth/login", data),

  logout: () =>
    api.post("/auth/logout"),

  me: () =>
    api.get("/auth/me"),
};
