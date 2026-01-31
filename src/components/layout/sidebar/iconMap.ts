import {
  LayoutDashboard,
  Users,
  Shield,
  FileText,
  Settings,
  Circle,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  users: Users,
  roles: Shield,
  shield: Shield,
  evidences: FileText,
  reports: FileText,
  settings: Settings,
  default: Circle,
};
