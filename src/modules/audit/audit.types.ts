export interface AuditLogDto {
  id: number;
  entityType: string;
  entityId: number;
  action: string;
  performedBy: string;
  performedOn: string;

  beforeData?: string;
  afterData?: string;
  changes?: string;
}
