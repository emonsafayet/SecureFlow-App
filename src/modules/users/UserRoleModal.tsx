import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

import { FormModal } from "@/components/modal/FormModal";
import {
  getUserRoles,
  getAllRoles,
  assignUserRoles,
} from "@/core/users/role.api";
import { UserRoleForm } from "@/forms/users/UserRoleForm";

interface Props {
  user: {
    id: string;
    email: string;
  };
  onClose: () => void;
}

export default function UserRoleModal({ user, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const [assignedRoleIds, setAssignedRoleIds] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const [userRolesRes, allRolesRes] = await Promise.all([
        getUserRoles(user.id),
        getAllRoles(),
      ]);

      setAssignedRoleIds(userRolesRes.data.map((r) => r.roleId));
      setRoles(allRolesRes.data);
      setLoading(false);
    }

    load();
  }, [user.id]);

  const handleSubmit = async (values: { roleIds: string[] }) => {
    setSubmitting(true);
    try {
      await assignUserRoles(user.id, values.roleIds);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormModal
      open
      title="Assign Roles"
      onClose={onClose}
      onSubmit={() => {
        // submit is triggered from inside the form
        const event = new Event("submit", { bubbles: true, cancelable: true });
        document.getElementById("user-role-form")?.dispatchEvent(event);
      }}
      submitting={submitting}
    >
      <Box>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {user.email}
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <UserRoleForm
            formId="user-role-form"
            allRoles={roles}
            defaultRoleIds={assignedRoleIds}
            onSubmit={handleSubmit}
          />
        )}
      </Box>
    </FormModal>
  );
}
