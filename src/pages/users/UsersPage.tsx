import { useEffect, useState, useCallback } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

import { DataTable } from "../../components/DataTable/DataTable";
import { DataTablePagination } from "../../components/DataTable/DataTablePagination";
import { ColumnSelector } from "../../components/DataTable/ColumnSelector";

import { EditButton } from "../../components/buttons/EditButton";
import { DeleteButton } from "../../components/buttons/DeleteButton";
import { ViewButton } from "../../components/buttons/ViewButton";

import { useColumnPrefs } from "../../hooks/useColumnPrefs";
import { alertService } from "../../services/alert.service";
import { snackbarService } from "../../services/snackbar.service";
import { loadingService } from "../../services/loading.service";
import { userService } from "../../services/user.service";

import { Can } from "../../auth/Can";
import { FormModal } from "../../components/modal/FormModal";
import { UserForm } from "../../forms/users/UserForm";
import type { UserFormValues } from "../../forms/users/user.schema";
import type { ValidationErrorResponse } from "../../services/errors";

/* =======================
   TYPES (BACKEND ALIGNED)
======================= */

interface User {
  id: string;      // Guid
  userId: number;  // DB id
  email: string;
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  userType: string;
}

interface PagedResult<T> {
  items: T[];
  totalCount: number;
}

/* =======================
   PAGE
======================= */

export default function UsersPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [data, setData] = useState<PagedResult<User>>({
    items: [],
    totalCount: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);

  /* Load users */
  const load = useCallback(async () => {
    loadingService.show();
    try {
      const res = await userService.getUsers({
        pageNumber: page + 1,
        pageSize,
      });

      setData({
        items: res.data,
        totalCount: res.totalCount,
      });
    } finally {
      loadingService.hide();
    }
  }, [page, pageSize]);

  useEffect(() => {
    load();
  }, [load]);

  /* -----------------------
     CRUD
  ----------------------- */

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(user: User) {
    setEditing(user);
    setModalOpen(true);
  }

  async function handleSubmit(values: UserFormValues) {
    setSaving(true);
    try {
      if (editing) {
        await userService.update(editing.userId, values);
        snackbarService.show({ message: "User updated", severity: "success" });
      } else {
        await userService.create(values);
        snackbarService.show({ message: "User created", severity: "success" });
      }

      setModalOpen(false);
      load();
    } catch (e: unknown) {
      const err = e as ValidationErrorResponse;
      const first =
        err?.errors && Object.values(err.errors)[0]?.[0];

      snackbarService.show({
        message: first ?? "Operation failed",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  async function deleteUser(user: User) {
    const ok = await alertService.confirm({
      message: `Delete user ${user.email}?`,
    });

    if (!ok) return;

    await userService.delete(user.userId);

    snackbarService.show({
      message: "User deleted",
      severity: "success",
    });

    load();
  }

  /* -----------------------
     TABLE COLUMNS
  ----------------------- */

  const allColumns: Array<{
    field: keyof User;
    header: string;
    render?: (row: User) => React.ReactElement;
  }> = [
    { field: "email", header: "Email" },
    { field: "firstName", header: "First Name" },
    { field: "lastName", header: "Last Name" },
    { field: "userType", header: "User Type" },
    {
      field: "isActive",
      header: "Active",
      render: (row) => (
        <Typography>{row.isActive ? "Yes" : "No"}</Typography>
      ),
    },
    {
      field: "id",
      header: "Actions",
      render: (row) => (
        <Stack direction="row" spacing={1}>
          <Can permission="USER_VIEW">
            <ViewButton onClick={() => console.log(row.userId)} />
          </Can>
          <Can permission="USER_EDIT">
            <EditButton onClick={() => openEdit(row)} />
          </Can>
          <Can permission="USER_DELETE">
            <DeleteButton onClick={() => deleteUser(row)} />
          </Can>
        </Stack>
      ),
    },
  ];

  const { visibleColumns, visibleFields, toggleField } =
    useColumnPrefs("users.columns", allColumns);

  /* -----------------------
     RENDER
  ----------------------- */

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Users</Typography>

        <Stack direction="row" spacing={1}>
          <ColumnSelector
            columns={allColumns}
            visibleFields={visibleFields}
            onToggle={toggleField}
          />

          <Can permission="USER_CREATE">
            <Button variant="contained" onClick={openCreate}>
              Create User
            </Button>
          </Can>
        </Stack>
      </Stack>

      <DataTable<User>
        columns={visibleColumns}
        rows={data.items}
      />

      <DataTablePagination
        page={page}
        pageSize={pageSize}
        total={data.totalCount}
        onPageChange={setPage}
        onPageSizeChange={(s) => {
          setPage(0);
          setPageSize(s);
        }}
      />

      <FormModal
        open={modalOpen}
        title={editing ? "Edit User" : "Create User"}
        onClose={() => setModalOpen(false)}
        onSubmit={() =>
          document
            .getElementById("user-form")
            ?.dispatchEvent(new Event("submit", { bubbles: true }))
        }
        submitting={saving}
      >
        <UserForm
          defaultValues={
            editing
              ? {
                 name: `${editing.firstName} ${editing.lastName}`.trim(),
                 email: editing.email,
                 status: editing.isActive ? "Active" : "Inactive",
                }
              : undefined
          }
          onSubmit={handleSubmit}
        />
      </FormModal>
    </Box>
  );
}
