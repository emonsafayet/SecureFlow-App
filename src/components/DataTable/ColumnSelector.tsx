import {
  Menu,
  MenuItem,
  Checkbox,
  IconButton,
  ListItemText,
} from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { useState } from "react";

interface Props {
  columns: { field: string; header: string }[];
  visibleFields: string[];
  onToggle: (field: string) => void;
}

export function ColumnSelector({
  columns,
  visibleFields,
  onToggle,
}: Props) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
        <ViewColumnIcon />
      </IconButton>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
      >
        {columns.map((c) => (
          <MenuItem key={c.field} onClick={() => onToggle(c.field)}>
            <Checkbox checked={visibleFields.includes(c.field)} />
            <ListItemText primary={c.header} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
