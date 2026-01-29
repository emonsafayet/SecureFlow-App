import { api } from "./axios.instance";

export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export const userApi = {
  getAll: () =>
    api.get<UserDto[]>("/users"),

  getById: (id: string) =>
    api.get<UserDto>(`/users/${id}`),

  create: (data: Partial<UserDto>) =>
    api.post("/users", data),

  update: (id: string, data: Partial<UserDto>) =>
    api.put(`/users/${id}`, data),

  delete: (id: string) =>
    api.delete(`/users/${id}`),
};
