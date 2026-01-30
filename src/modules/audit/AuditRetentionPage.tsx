import { useEffect, useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { auditRetentionService } from "./auditRetention.service";
import type { AuditRetentionDto } from "./auditRetention.types";

const OPTIONS = [
  { label: "90 days", value: 90 },
  { label: "180 days", value: 180 },
  { label: "1 year", value: 365 },
  { label: "3 years", value: 1095 },
  { label: "Forever", value: -1 },
];

export default function AuditRetentionPage() {
  const [data, setData] = useState<AuditRetentionDto | null>(null);
  const [value, setValue] = useState<number | "">("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await auditRetentionService.get();
    setData(res);
    setValue(res.retentionDays);
  }

  async function save() {
    if (value === "") return;

    setSaving(true);
    try {
      await auditRetentionService.update(value);
      await load();
    } finally {
      setSaving(false);
    }
  }

  if (!data) return null;

  return (
    <Box p={2} maxWidth={480}>
      <Typography variant="h5" mb={1}>
        Audit Retention Policy
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Define how long audit logs are retained before
        automatic deletion. This policy applies system-wide.
      </Typography>

      <TextField
        select
        fullWidth
        label="Retention Period"
        value={value}
        onChange={(e) =>
          setValue(Number(e.target.value))
        }
      >
        {OPTIONS.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </TextField>

      <Box mt={3}>
        <Button
          variant="contained"
          onClick={save}
          disabled={saving}
        >
          Save Policy
        </Button>
      </Box>

      <Box mt={3}>
        <Typography variant="caption" color="text.secondary">
          Last updated by {data.lastUpdatedBy} on{" "}
          {new Date(data.lastUpdatedOn).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
}
