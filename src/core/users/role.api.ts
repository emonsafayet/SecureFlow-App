import { axiosInstance } from "../api/axios.instance";

 

export interface UserRoleDto {
  roleId: string;
  roleName: string;
}

export const getUserRoles = (userId: string) =>
  axiosInstance.get<UserRoleDto[]>(`/users/${userId}/roles`);

export const assignUserRoles = (userId: string, roleIds: string[]) =>
  axiosInstance.post(`/users/${userId}/roles`, roleIds);

// assumed / existing
export const getAllRoles = () =>
  axiosInstance.get<{ id: string; name: string }[]>(`/roles`);
