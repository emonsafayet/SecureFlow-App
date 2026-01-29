import { Link } from "react-router-dom";

import { MenuIconRegistry } from "@/core/menu/menu.icons";
import type { MenuItem } from "@/core/menu/menu.types";

interface Props {
  menu: MenuItem;
}

function SidebarMenuItem({ menu }: Props) {
  if (!menu.isActive) return null;

  return (
    <li>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Icon */}
        {menu.iconClass && MenuIconRegistry[menu.iconClass]}

        {/* Label */}
        {menu.url ? (
          <Link to={menu.url}>{menu.name}</Link>
        ) : (
          <span>{menu.name}</span>
        )}
      </div>

      {/* Children */}
      {menu.children && menu.children.length > 0 && (
        <ul style={{ marginLeft: 16 }}>
          {menu.children.map((child) => (
            <SidebarMenuItem key={child.id} menu={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default SidebarMenuItem;
