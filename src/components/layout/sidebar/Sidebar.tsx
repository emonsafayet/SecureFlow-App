import SidebarMenu from "./SidebarMenu";
import { useMenuStore } from "../../../core/menu/menu.store";

function Sidebar() {
  const menus = useMenuStore((s) => s.menus);
  const loading = useMenuStore((s) => s.loading);

  if (loading) {
    return <div>Loading menu...</div>;
  }

  return (
    <aside style={{ width: 220, padding: 16, background: "#f4f4f4" }}>
      <h3>SecureFlow</h3>
      <SidebarMenu menus={menus} />
    </aside>
  );
}

export default Sidebar;
