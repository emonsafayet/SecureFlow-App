import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../modules/auth/LoginPage";
import DashboardPage from "../modules/dashboard/DashboardPage";
import UsersPage from "../modules/users/UsersPage";
import UserRolesPage from "../modules/users/UserRolesPage";
import RequirePermission from "./permission.guard";
import AppShell from "../components/layout/AppShell";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes with AppShell */}
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

          
          <Route
            path="/users/:id/roles"
            element={
              <RequirePermission permission="USER_MANAGE">
                <UserRolesPage user={{
                  id: "",
                  email: ""
                }} onClose={function (): void {
                  throw new Error("Function not implemented.");
                } } />
              </RequirePermission>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
