import { api } from "../api/axios.instance";
import type { ApiResponse } from "../api/api-response";

/* ============================
   Request / Response Contracts
   ============================ */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

/* ============================
   Auth API
   ============================ */

export const authApi = {
  login: async (payload: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      payload
    );
    const data = response.data.data as
      | LoginResponse
      | (LoginResponse & { AccessToken?: string; RefreshToken?: string });

    // Handle possible PascalCase keys from backend
    return {
      accessToken: (data as any)?.accessToken ?? (data as any)?.AccessToken ?? "",
      refreshToken:
        (data as any)?.refreshToken ?? (data as any)?.RefreshToken ?? "",
    };
  },
};
