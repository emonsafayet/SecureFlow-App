import {
  Drawer,
  Toolbar,
  Box,
  useMediaQuery,
  type Theme,
} from "@mui/material";
import SidebarMenu from "./SidebarMenu";
import { useMenuStore } from "../../../core/menu/menu.store";

const drawerWidth = 240;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  const menus = useMenuStore((s) => s.menus);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", p: 1 }}>
        <SidebarMenu menus={menus} />
      </Box>
    </Drawer>
  );
}
