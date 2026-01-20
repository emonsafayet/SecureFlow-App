import { useEffect, useState } from "react";
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
 

/* =======================
   TYPES
======================= */

interface User {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
}

interface PagedResult<T> {
  items: T[];
  totalCount: number;
}

/* =======================
   MOCK API
======================= */

async function fetchUsers(
  page: number,
  pageSize: number
): Promise<PagedResult<User>> {
  await new Promise((r) => setTimeout(r, 400));

  const all: User[] = Array.from({ length: 57 }).map((_, i) => ({
    id: String(i + 1),
    name: `User ${i + 1}`,
    email: `user${i + 1}@mail.com`,
    status: i % 2 === 0 ? "Active" : "Inactive",
  }));

  return {
    items: all.slice(page * pageSize, page * pageSize + pageSize),
    totalCount: all.length,
  };
}

/* =======================
   PAGE
======================= */

export default function UsersPage() {
  /* Pagination */
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  /* Data */
  const [data, setData] = useState<PagedResult<User>>({
    items: [],
    totalCount: 0,
  });

  /* CRUD Modal State */
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [saving, setSaving] = useState(false);

  /* Load data */
  const load = async () => {
    loadingService.show();
    try {
      const res = await fetchUsers(page, pageSize);
      setData(res);
    } finally {
      loadingService.hide();
    }
  };

  useEffect(() => {
    load();
  }, [page, pageSize]);

  /* -----------------------
     CRUD HANDLERS
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

    if (editing) {
      await userService.update(editing.id, values);
      snackbarService.show({
        message: "User updated successfully",
        severity: "success",
      });
    } else {
      await userService.create(values);
      snackbarService.show({
        message: "User created successfully",
        severity: "success",
      });
    }

    setSaving(false);
    setModalOpen(false);
    load();
  }

  async function deleteUser(user: User) {
    const ok = await alertService.confirm({
      message: `Delete ${user.name}?`,
    });

    if (!ok) return;

    snackbarService.show({
      message: "User deleted",
      severity: "success",
    });

    load();
  }

  /* -----------------------
     Columns
  ----------------------- */

  const allColumns: Array<{
    field: keyof User;
    header: string;
    render?: (row: User) => React.ReactElement;
  }> = [
    { field: "name", header: "Name" },
    { field: "email", header: "Email" },
    { field: "status", header: "Status" },
    {
      field: "id",
      header: "Actions",
      render: (row: User) => (
        <Stack direction="row" spacing={1}>
          <Can permission="USER_VIEW">
            <ViewButton onClick={() => console.log("view", row.id)} />
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
     Render
  ----------------------- */

  return (
    <Box>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
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

      {/* Table */}
      <DataTable<User>
        columns={visibleColumns}
        rows={data.items}
      />

      {/* Pagination */}
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

      {/* CREATE / EDIT MODAL */}
      <FormModal
        open={modalOpen}
        title={editing ? "Edit User" : "Create User"}
        onClose={() => setModalOpen(false)}
        onSubmit={() =>
          document
            .getElementById("user-form")
            ?.dispatchEvent(
              new Event("submit", { cancelable: true, bubbles: true })
            )
        }
        submitting={saving}
      >
        <UserForm
          defaultValues={editing ?? undefined}
          onSubmit={handleSubmit}
        />
      </FormModal>
    </Box>
  );
}
