import DeleteIcon from "@mui/icons-material/Delete";
import { IconActionButton } from "./IconActionButton";

export function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <IconActionButton
      title="Delete"
      icon={<DeleteIcon fontSize="small" />}
      onClick={onClick}
      color="error"
    />
  );
}
