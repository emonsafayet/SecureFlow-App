import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import { DataTable } from "@/components/DataTable/DataTable";
import type { Column } from "@/components/DataTable/types";
import AuditLogFilters from "./AuditLogFilters";
import type { AuditLogDto } from "./audit.types";
import { auditLogService } from "@/services/auditLog.service";
import { exportToCsv } from "@/utils/csv";

export default function AuditLogsPage() {
  const [rows, setRows] = useState<AuditLogDto[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [exporting, setExporting] = useState(false); 

  const [filters, setFilters] = useState<{
    entityType?: string;
    action?: string;
    fromDate?: string;
    toDate?: string;
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
async function exportCsv() {
  setExporting(true);
  try {
    const data = await auditLogService.exportLogs(filters);

    exportToCsv(
      "audit-logs.csv",
      data.map((x) => ({
        Entity: x.entityType,
        Action: x.action,
        PerformedBy: x.performedBy,
        Date: new Date(x.performedOn).toISOString(),
        EntityId: x.entityId,
        Changes: x.changes ?? "",
      }))
    ); 

  } finally {
    setExporting(false);
  }
}
  return (
    <Box p={2}>
     <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            >
            <Typography variant="h5">
                Audit Logs
            </Typography>

            <Button
                variant="outlined"
                onClick={exportCsv}
                disabled={exporting}
            >
                {exporting ? "Exporting…" : "Export CSV"}
            </Button>
            </Stack>


     <AuditLogFilters
        entityType={filters.entityType}
        action={filters.action}
        fromDate={filters.fromDate}
        toDate={filters.toDate}
        onChange={(k, v) =>
            setFilters((f) => ({ ...f, [k]: v }))
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
