import { Outlet } from "react-router-dom"; 
import Topbar from "./Topbar";
import { Sidebar } from "lucide-react";

export default function MainLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 overflow-auto p-4 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
