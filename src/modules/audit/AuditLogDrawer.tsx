import {
  Drawer,
  Box,
  Typography,
  Divider,
} from "@mui/material";

import type { AuditLogDto } from "./audit.types";

interface Props {
  log: AuditLogDto;
  onClose: () => void;
}

function safeJsonParse(value?: string) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export default function AuditLogDrawer({ log, onClose }: Props) {
  const before = safeJsonParse(log.beforeData);
  const after = safeJsonParse(log.afterData);

  return (
    <Drawer anchor="right" open onClose={onClose}>
      <Box width={520} p={2}>
        <Typography variant="h6">Audit Log Details</Typography>

        <Typography variant="body2" color="text.secondary">
          {log.entityType} • {log.action}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography><strong>Performed By:</strong> {log.performedBy}</Typography>
        <Typography><strong>Date:</strong> {new Date(log.performedOn).toLocaleString()}</Typography>
        <Typography><strong>Entity ID:</strong> {log.entityId}</Typography>

        <Divider sx={{ my: 2 }} />

        {before && (
          <>
            <Typography variant="subtitle1">Before</Typography>
            <pre style={{ background: "#f5f5f5", padding: 8, overflow: "auto" }}>
              {JSON.stringify(before, null, 2)}
            </pre>
          </>
        )}

        {after && (
          <>
            <Typography variant="subtitle1">After</Typography>
            <pre style={{ background: "#f5f5f5", padding: 8, overflow: "auto" }}>
              {JSON.stringify(after, null, 2)}
            </pre>
          </>
        )}

        {!before && !after && log.changes && (
          <>
            <Typography variant="subtitle1">Changes</Typography>
            <pre>{log.changes}</pre>
          </>
        )}
      </Box>
    </Drawer>
  );
}
