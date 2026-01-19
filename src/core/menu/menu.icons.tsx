import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

import type { ReactNode } from "react";

export const MenuIconRegistry: Record<string, ReactNode> = {
  Dashboard: <DashboardIcon />,
  Users: <PeopleIcon />,
  Settings: <SettingsIcon />,
};