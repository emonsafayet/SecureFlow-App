import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { assignUserRoles, getAllRoles, getUserRoles } from "../../core/users/role.api";
import { UserRoleForm } from "../../forms/users/UserRoleForm";

 

export default function UserRolesPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [assigned, setAssigned] = useState<string[]>([]);
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function load() {
      const [userRoles, allRoles] = await Promise.all([
        getUserRoles(id!),
        getAllRoles(),
      ]);

      setAssigned(userRoles.data.map((r) => r.roleId));
      setRoles(allRoles.data);
      setLoading(false);
    }
    load();
  }, [id]);

  const onSubmit = async (values: { roleIds: string[] }) => {
    await assignUserRoles(id!, values.roleIds);
    alert("Roles updated successfully");
  };

  if (loading) return <CircularProgress />;

  return (
    <UserRoleForm
      allRoles={roles}
      defaultRoleIds={assigned}
      onSubmit={onSubmit}
    />
  );
}
