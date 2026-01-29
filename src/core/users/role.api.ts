import { api } from "../api/axios.instance";

 

export interface UserRoleDto {
  roleId: string;
  roleName: string;
}

export const getUserRoles = (userId: string) =>
  api.get<UserRoleDto[]>(`/users/${userId}/roles`);

export const assignUserRoles = (userId: string, roleIds: string[]) =>
  api.post(`/users/${userId}/roles`, roleIds);

// assumed / existing
export const getAllRoles = () =>
  api.get<{ id: string; name: string }[]>(`/roles`);
