import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState, useCallback } from "react";
import Sidebar from "./sidebar/Sidebar";
import TopBar from "./Topbar";
 

export default function AppShell() {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <TopBar onMenuClick={handleToggle} />
      <Sidebar open={open} onClose={handleToggle} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
