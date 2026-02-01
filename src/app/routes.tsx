import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "@/pages/Login/Login";
import DashboardPage from "@/modules/dashboard/DashboardPage";
import UsersPage from "@/modules/users/UsersPage";
import UserRolesPage from "@/modules/users/UserRolesPage";
import RolesPage from "@/modules/roles/RolesPage";
import AuditLogsPage from "@/modules/audit/AuditLogsPage";
import PermissionMatrixPage from "@/modules/permissions/PermissionMatrixPage";
import AuditRetentionPage from "@/modules/audit/AuditRetentionPage";
import MainLayout from "@/components/layout/MainLayout";
import ForbiddenPage from "@/pages/Forbidden/ForbiddenPage";
import RequireAuth from "./auth.guard";
 

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Forbidden */}
        <Route path="/forbidden" element={<ForbiddenPage />} />

        {/* Protected (AUTH ONLY) */}
        <Route element={<RequireAuth />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id/roles" element={<UserRolesPage />} />

            <Route path="/roles" element={<RolesPage />} />

            <Route path="/audit-logs" element={<AuditLogsPage />} />
            <Route path="/audit-retention" element={<AuditRetentionPage />} />

            <Route
              path="/permissions/matrix"
              element={<PermissionMatrixPage />}
            />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
