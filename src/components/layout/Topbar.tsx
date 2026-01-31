import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useUiStore } from "../../theme/store/ui.store";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const darkMode = useUiStore((s) => s.darkMode);
  const toggleDarkMode = useUiStore((s) => s.toggleDarkMode);

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar className="flex justify-between">
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={onMenuClick} color="inherit">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6">SecureFlow</Typography>
        </Box>

        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
