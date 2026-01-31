import { useEffect } from "react";
import { useMenuStore } from "@/core/menu/menu.store";
import SidebarMenuItem from "./SidebarMenuItem";

interface Props {
  open: boolean;
}

export default function Sidebar({ open }: Props) {
  const { menus, loadMenus } = useMenuStore();

  useEffect(() => {
    loadMenus();
  }, [loadMenus]);

  return (
    <aside
      className={`h-screen bg-slate-900 text-white transition-all duration-300 ${
        open ? "w-64" : "w-16"
      }`}
    >
      <div className="h-14 flex items-center justify-center border-b border-slate-700">
        <span className="font-bold">{open ? "SecureFlow" : "SF"}</span>
      </div>

      <nav className="p-2 space-y-1">
        {menus.map((menu) => (
          <SidebarMenuItem
            key={menu.id}
            item={menu}
            collapsed={!open}
          />
        ))}
      </nav>
    </aside>
  );
}
