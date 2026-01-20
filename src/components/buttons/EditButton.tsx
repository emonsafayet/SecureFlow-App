import EditIcon from "@mui/icons-material/Edit";
import { IconActionButton } from "./IconActionButton";

export function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <IconActionButton
      title="Edit"
      icon={<EditIcon fontSize="small" />}
      onClick={onClick}
    />
  );
}
