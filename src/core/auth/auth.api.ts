import { api } from "../api/axios.instance";

/* ============================
   Request / Response Contracts
   ============================ */

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
}

/* ============================
   Auth API
   ============================ */

export const authApi = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", payload);
    return response.data;
  },
};
