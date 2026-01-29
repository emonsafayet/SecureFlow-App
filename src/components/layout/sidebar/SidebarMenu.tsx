import type { MenuItem } from "@/core/menu/menu.types";
import SidebarMenuItem from "./SidebarMenuItem";
 

interface Props {
  menus: MenuItem[];
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
