import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

import {
  getUserRoles,
  getAllRoles,
  assignUserRoles,
} from "@/core/users/role.api";
import { UserRoleForm } from "@/forms/users/UserRoleForm";

export default function UserRolesPage() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [assignedRoles, setAssignedRoles] = useState<string[]>([]);
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function load() {
      const [userRolesRes, rolesRes] = await Promise.all([
        getUserRoles(id!),
        getAllRoles(),
      ]);

      setAssignedRoles(userRolesRes.data.map((r) => r.roleId));
      setRoles(rolesRes.data);
      setLoading(false);
    }

    load();
  }, [id]);

  const handleSubmit = async (values: { roleIds: string[] }) => {
    await assignUserRoles(id!, values.roleIds);
    alert("Roles updated successfully");
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box p={2}>
      <UserRoleForm
        allRoles={roles}
        defaultRoleIds={assignedRoles}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
