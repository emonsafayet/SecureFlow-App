import { http } from "@/services/http";
import type { AuditRetentionDto } from "./auditRetention.types";

export const auditRetentionService = {
  get() {
    return http<AuditRetentionDto>("/api/audit-retention");
  },

  update(retentionDays: number) {
    return http<void>("/api/audit-retention", {
      method: "PUT",
      body: JSON.stringify({ retentionDays }),
    });
  },
};
