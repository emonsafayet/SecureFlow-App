import { Box, MenuItem, TextField } from "@mui/material";


interface Props {
  entityType?: string;
  action?: string;
  fromDate?: string;
  toDate?: string;
  onChange: (key: string, value?: string) => void;
}

 
export default function AuditLogFilters({
  entityType,
  action,
  fromDate,
  toDate,
  onChange,
}: Props) {
  return (
    <Box display="flex" gap={2} mb={2} flexWrap="wrap">
      <TextField
        select
        label="Entity"
        value={entityType ?? ""}
        onChange={(e) => onChange("entityType", e.target.value || undefined)}
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
        onChange={(e) => onChange("action", e.target.value || undefined)}
        sx={{ minWidth: 160 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Create">Create</MenuItem>
        <MenuItem value="Update">Update</MenuItem>
        <MenuItem value="Delete">Delete</MenuItem>
        <MenuItem value="Assign">Assign</MenuItem>
      </TextField>

      <TextField
        type="date"
        label="From"
        InputLabelProps={{ shrink: true }}
        value={fromDate ?? ""}
        onChange={(e) => onChange("fromDate", e.target.value || undefined)}
      />

      <TextField
        type="date"
        label="To"
        InputLabelProps={{ shrink: true }}
        value={toDate ?? ""}
        onChange={(e) => onChange("toDate", e.target.value || undefined)}
      />
    </Box>
  );
}
