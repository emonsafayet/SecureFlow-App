import { IconButton, Tooltip } from "@mui/material";

interface Props {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: "primary" | "error" | "info";
  disabled?: boolean;
}

export function IconActionButton({
  title,
  icon,
  onClick,
  color = "primary",
  disabled,
}: Props) {
  return (
    <Tooltip title={title}>
      <span>
        <IconButton
          size="small"
          color={color}
          onClick={onClick}
          disabled={disabled}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}
