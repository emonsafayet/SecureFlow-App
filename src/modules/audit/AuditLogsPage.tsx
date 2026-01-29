import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { DataTable } from "@/components/DataTable/DataTable";
import type { Column } from "@/components/DataTable/types";
import AuditLogFilters from "./AuditLogFilters";
import type { AuditLogDto } from "./audit.types";
import { auditLogService } from "@/services/auditLog.service";

export default function AuditLogsPage() {
  const [rows, setRows] = useState<AuditLogDto[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState<{
    entityType?: string;
    action?: string;
  }>({});

 useEffect(() => {
  async function loadAuditLogs() {
    const res = await auditLogService.getLogs({
      pageNumber: page,
      pageSize,
      ...filters,
    });

    setRows(res.data);
    setTotal(res.totalCount);
  }

  loadAuditLogs();
}, [page, pageSize, filters]);

   

  const columns: Column<AuditLogDto>[] = [
    { field: "entityType", header: "Entity" },
    { field: "action", header: "Action" },
    { field: "performedBy", header: "Performed By" },
    {
      field: "performedOn",
      header: "Date",
      render: (r) =>
        new Date(r.performedOn).toLocaleString(),
    },
    {
      field: "changes",
      header: "Details",
      render: (r) => r.changes ?? "-",
    },
  ];

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2}>
        Audit Logs
      </Typography>

      <AuditLogFilters
        entityType={filters.entityType}
        action={filters.action}
        onChange={(k, v) =>
          setFilters((f) => ({ ...f, [k]: v || undefined }))
        }
      />

      <DataTable
        columns={columns}
        rows={rows}
        pagination={{
          page,
          pageSize,
          total,
        }}
        onPageChange={(p, ps) => {
          setPage(p);
          setPageSize(ps);
        }}
        serverSide
      />
    </Box>
  );
}
