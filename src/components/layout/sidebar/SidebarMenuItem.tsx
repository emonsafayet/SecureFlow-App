import { NavLink } from "react-router-dom";
import type { MenuItem } from "@/core/menu/menu.types";
import { iconMap } from "./iconMap";

interface Props {
  item: MenuItem;
  collapsed: boolean;
}

export default function SidebarMenuItem({ item, collapsed }: Props) {
  const Icon = iconMap[item.iconClass ?? "dashboard"] ?? iconMap.default;

  return (
    <NavLink
      to={item.url || "#"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded transition ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-300 hover:bg-slate-800"
        }`
      }
    >
      <Icon size={18} />
      {!collapsed && <span>{item.name}</span>}
    </NavLink>
  );
}
