import { http } from "./http";
import type { UserFormValues } from "../forms/users/user.schema";

export interface PaginationResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export interface UserDto {
  id: string;
  userId: number;
  email: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  userType: string;
}

export const userService = {
  getUsers(params: {
    pageNumber: number;
    pageSize: number;
    isActive?: boolean;
  }) {
    const qs = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    );

    return http<PaginationResponse<UserDto>>(
      `/api/users?${qs.toString()}`
    );
  },

  create(data: UserFormValues) {
    return http<{ userId: number }>("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(userId: number, data: UserFormValues) {
    return http<void>(`/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete(userId: number) {
    return http<void>(`/api/users/${userId}`, {
      method: "DELETE",
    });
  },
};
