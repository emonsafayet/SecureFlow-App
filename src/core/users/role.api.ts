import { api } from "../api/axios.instance";

export interface UserRoleDto {
  roleId: string;
  roleName: string;
}
export interface RoleDto {
  id: string;
  name: string;
}
export const getUserRoles = (userId: string) =>
  api.get<UserRoleDto[]>(`/users/${userId}/roles`);

export const assignUserRoles = (userId: string, roleIds: string[]) =>
  api.post(`/users/${userId}/roles`, roleIds);

export const getAllRoles = () =>
  api.get<RoleDto[]>(`/roles`);
