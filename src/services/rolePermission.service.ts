import { http } from "./http";

export interface RolePermissionDto {
  permissionId: number;
  name: string;
  action : string;
  resource: string;
  description :string;
  assigned: boolean;
}

export const rolePermissionService = {
  get(roleId: number) {
    return http<RolePermissionDto[]>(
      `/api/roles/${roleId}/permissions`
    );
  },

  assign(roleId: number, permissionIds: number[]) {
    return http<void>(
      `/api/roles/${roleId}/permissions`,
      {
        method: "POST",
        body: JSON.stringify(permissionIds),
      }
    );
  },
};
