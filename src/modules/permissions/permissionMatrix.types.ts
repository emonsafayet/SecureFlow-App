export interface MatrixRoleDto {
  id: number;
  name: string;
}

export interface MatrixPermissionDto {
  id: number;
  name: string;
  resource: string;
  action: string;
  assignments: number[];  
}

export interface PermissionMatrixDto {
  roles: MatrixRoleDto[];
  permissions: MatrixPermissionDto[];
}
