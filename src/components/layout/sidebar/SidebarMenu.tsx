import { NavLink } from "react-router-dom";
import type { MenuItem } from "@/core/menu/menu.types";

interface Props {
  item: MenuItem;
}

export default function SidebarMenu({ item }: Props) {
  if (!item.url && !item.children?.length) return null;

  return (
    <div>
      {item.url && (
        <NavLink
          to={item.url}
          className={({ isActive }) =>
            `block px-3 py-2 rounded text-sm ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`
          }
        >
          {item.name}
        </NavLink>
      )}

      {item.children && item.children.length > 0 && (
        <div className="ml-4 mt-1 space-y-1">
          {item.children.map((child) => (
            <SidebarMenu key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  );
}
