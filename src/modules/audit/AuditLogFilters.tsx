import { Box, MenuItem, TextField } from "@mui/material";

interface Props {
  entityType?: string;
  action?: string;
  onChange: (key: string, value: string) => void;
}

export default function AuditLogFilters({
  entityType,
  action,
  onChange,
}: Props) {
  return (
    <Box display="flex" gap={2} mb={2}>
      <TextField
        select
        label="Entity"
        value={entityType ?? ""}
        onChange={(e) => onChange("entityType", e.target.value)}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="User">User</MenuItem>
        <MenuItem value="Role">Role</MenuItem>
        <MenuItem value="Vendor">Vendor</MenuItem>
      </TextField>

      <TextField
        select
        label="Action"
        value={action ?? ""}
        onChange={(e) => onChange("action", e.target.value)}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Create">Create</MenuItem>
        <MenuItem value="Update">Update</MenuItem>
        <MenuItem value="Delete">Delete</MenuItem>
        <MenuItem value="Assign">Assign</MenuItem>
      </TextField>
    </Box>
  );
}
