import { MenuItem, TextField } from "@mui/material";

interface SelectFilterProps {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export function SelectFilter({
  value,
  options,
  onChange,
}: SelectFilterProps) {
  return (
    <TextField
      select
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
    >
      <MenuItem value="">All</MenuItem>
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
