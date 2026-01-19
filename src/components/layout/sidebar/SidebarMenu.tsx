import SidebarMenuItem from "./SidebarMenuItem";
import type { MenuItemDto } from "../../../core/menu/menu.types";

interface Props {
  menus: MenuItemDto[];
}

function SidebarMenu({ menus }: Props) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {menus
        .sort((a, b) => a.order - b.order)
        .map((menu) => (
          <SidebarMenuItem key={menu.id} menu={menu} />
        ))}
    </ul>
  );
}

export default SidebarMenu;
