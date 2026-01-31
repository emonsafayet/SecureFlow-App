import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar open={sidebarOpen} />

      <div className="flex flex-col flex-1">
        <Topbar onMenuClick={() => setSidebarOpen((v) => !v)} />

        <main className="flex-1 p-6 bg-slate-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
