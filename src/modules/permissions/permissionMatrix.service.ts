import { http } from "@/services/http";
import type { PermissionMatrixDto } from "./permissionMatrix.types";

export const permissionMatrixService = {
  getMatrix() {
    return http<PermissionMatrixDto>("/api/permissions/matrix");
  },

  assign(roleId: number, permissionIds: number[]) {
    return http<void>(`/api/roles/${roleId}/permissions`, {
      method: "POST",
      body: JSON.stringify(permissionIds),
    });
  },
};
