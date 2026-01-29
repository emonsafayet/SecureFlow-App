import { http } from "./http";

export interface RoleDto {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

export const roleService = {
  getRoles() {
    return http<RoleDto[]>("/api/roles");
  },

  getById(id: number) {
    return http<RoleDto>(`/api/roles/${id}`);
  },

  create(data: Omit<RoleDto, "id">) {
    return http<number>("/api/roles", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(id: number, data: Omit<RoleDto, "id">) {
    return http<void>(`/api/roles/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...data, id }),
    });
  },

  delete(id: number) {
    return http<void>(`/api/roles/${id}`, {
      method: "DELETE",
    });
  },
};
