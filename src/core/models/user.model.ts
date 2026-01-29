import type { UserTypeEnum } from "./user-type.enum";

export interface User {
  id: number;
  userGuidId: string;
  firstName?: string;
  lastName?: string;
  email: string;
  proImgEvidenceId?: number;
  userType: UserTypeEnum;
  isActive: boolean;

  tenantId: number;
}
