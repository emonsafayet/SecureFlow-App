import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

 
import type { Column } from "@/components/DataTable/types";
import { roleService, type RoleDto } from "@/services/role.service";
import RoleModal from "./RoleModal";
import { DataTable } from "@/components/DataTable/DataTable";
import type { RoleFormValues } from "./RoleForm";

export default function RolesPage() {
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleDto | null>(null);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadRoles();
  }, []);

  async function loadRoles() {
    const res = await roleService.getRoles();
    setRoles(res);
  }

  const columns: Column<RoleDto>[] = [
    { field: "name", header: "Name" },
    { field: "description", header: "Description" },
    {
      field: "isActive",
      header: "Status",
      render: (r) => (r.isActive ? "Active" : "Inactive"),
    },
    {
      field: "id",
      header: "Actions",
      render: (r) => (
        <>
          <Button size="small" onClick={() => { setSelectedRole(r); setOpen(true); }}>
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            onClick={async () => {
              await roleService.delete(r.id);
              loadRoles();
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  async function handleSubmit(values: RoleFormValues) {
    setSubmitting(true);
    try {
      if (selectedRole) {
        await roleService.update(selectedRole.id, values);
      } else {
        await roleService.create(values);
      }
      setOpen(false);
      setSelectedRole(null);
      loadRoles();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box p={2}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Roles</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create Role
        </Button>
      </Stack>

      <DataTable columns={columns} rows={roles} />

      {open && (
        <RoleModal
          title={selectedRole ? "Edit Role" : "Create Role"}
          defaultValues={selectedRole ?? undefined}
          submitting={submitting}
          onSubmit={handleSubmit}
          onClose={() => {
            setOpen(false);
            setSelectedRole(null);
          }}
        />
      )}
    </Box>
  );
}
