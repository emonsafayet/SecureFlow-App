import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconActionButton } from "./IconActionButton";

export function ViewButton({ onClick }: { onClick: () => void }) {
  return (
    <IconActionButton
      title="View"
      icon={<VisibilityIcon fontSize="small" />}
      onClick={onClick}
      color="info"
    />
  );
}
