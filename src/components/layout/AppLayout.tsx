import { Outlet } from "react-router-dom";
 
import Topbar from "./Topbar"; 
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div>
      <Topbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <main style={{ padding: 16, flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
