import { http } from "./http";
import type { AuditLogDto } from "@/modules/audit/audit.types";

export interface AuditLogQuery {
  pageNumber: number;
  pageSize: number;
  entityType?: string;
  action?: string;
  fromDate?: string; // ISO string
  toDate?: string;   // ISO string
}

export interface AuditLogResponse {
  data: AuditLogDto[];
  totalCount: number;
}

export const auditLogService = {
  getLogs(params: AuditLogQuery) {
    const qs = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    );

    return http<AuditLogResponse>(`/api/audit-logs?${qs}`);
  },
 //  EXPORT (no pagination)
  exportLogs(params: Omit<AuditLogQuery, "pageNumber" | "pageSize">) {
    const qs = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    );

    return http<AuditLogDto[]>(`/api/audit-logs/export?${qs}`);
  }, 

};
