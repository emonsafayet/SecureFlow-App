import Login from "@/pages/Login/Login";
import Dashboard from "@/pages/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
             <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
