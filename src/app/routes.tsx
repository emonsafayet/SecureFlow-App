import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../modules/auth/LoginPage";
import DashboardPage from "../modules/dashboard/DashboardPage";
import AppLayout from "../components/layout/AppLayout";
import RequirePermission from "./permission.guard";
import UsersPage from "../modules/users/UsersPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={
              <RequirePermission permission="DASHBOARD_VIEW">
                <DashboardPage />
              </RequirePermission>
            }
          />

          <Route
            path="/users"
            element={
              <RequirePermission permission="USER_MANAGE">
                <UsersPage />
              </RequirePermission>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
