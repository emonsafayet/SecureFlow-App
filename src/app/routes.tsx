import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../modules/auth/LoginPage";
import DashboardPage from "../modules/dashboard/DashboardPage";
import UsersPage from "../modules/users/UsersPage";
import RequirePermission from "./permission.guard";
import AppShell from "../components/layout/AppShell";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/*  Protected routes with AppShell */}
        <Route element={<AppShell />}>
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
