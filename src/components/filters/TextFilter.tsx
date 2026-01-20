import { TextField } from "@mui/material";

interface TextFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextFilter({ value, onChange }: TextFilterProps) {
  return (
    <TextField
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
    />
  );
}
