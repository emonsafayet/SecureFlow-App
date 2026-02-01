export interface JwtPayload {
  sub: string;
  email: string;
  tenant_id: string;
  user_type: string;
  permission?: string[] | string;
  exp: number;
}

export interface AuthUser {
  id: string;
  email: string;
  tenantId: string;
  userType: string;
  permissions: string[];
}
