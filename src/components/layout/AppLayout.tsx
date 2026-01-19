import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <Topbar onMenuClick={handleMenuClick} />

      <div style={{ display: "flex" }}>
        <Sidebar open={sidebarOpen} />

        <main style={{ padding: 16, flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
