import { Link } from "react-router-dom";
import type { MenuItemDto } from "../../../core/menu/menu.types";
import { resolveMenuIcon } from "../../../core/menu/menu.utils";

interface Props {
  menu: MenuItemDto;
}

function SidebarMenuItem({ menu }: Props) {
  if (!menu.isActive) return null;

  return (
    <li>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {resolveMenuIcon(menu.icon)}
        {menu.path ? (
          <Link to={menu.path}>{menu.name}</Link>
        ) : (
          <span>{menu.name}</span>
        )}
      </div>

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
