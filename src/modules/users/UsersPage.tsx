import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import { DataTable } from "@/components/DataTable/DataTable";
import type { Column } from "@/components/DataTable/types";
import { userService, type UserDto } from "@/services/user.service";
import UserRoleModal from "./UserRoleModal";

interface UserRow extends UserDto {
  fullName: string;
}

export default function UsersPage() {
  const [rows, setRows] = useState<UserRow[]>([]);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadUsers() {
      const res = await userService.getUsers({
        pageNumber: 1,
        pageSize: 10,
      });

      if (!mounted) return;

      const users: UserRow[] = res.data.map((u) => ({
        ...u,
        fullName: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim(),
      }));

      setRows(users);
    }

    loadUsers();

    return () => {
      mounted = false;
    };
  }, []);

  const columns: Column<UserRow>[] = [
    {
      field: "fullName",
      header: "Name",
    },
    {
      field: "email",
      header: "Email",
    },
    {
      field: "userType",
      header: "User Type",
    },
    {
      field: "isActive",
      header: "Status",
      render: (row) => (row.isActive ? "Active" : "Inactive"),
    },
    {
      field: "id",
      header: "Actions",
      render: (row) => (
        <Button
          size="small"
          onClick={() =>
            setSelectedUser({
              id: row.id,
              email: row.email,
            })
          }
        >
          Assign Roles
        </Button>
      ),
    },
  ];

  return (
    <Box p={2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Users</Typography>
      </Stack>

      <DataTable<UserRow>
        columns={columns}
        rows={rows}
      />

      {selectedUser && (
        <UserRoleModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </Box>
  );
}
