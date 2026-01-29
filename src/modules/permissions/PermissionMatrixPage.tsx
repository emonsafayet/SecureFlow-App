import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";

import {
  permissionMatrixService,
} from "./permissionMatrix.service";
import type {
  PermissionMatrixDto,
} from "./permissionMatrix.types";

export default function PermissionMatrixPage() {
  const [matrix, setMatrix] = useState<PermissionMatrixDto | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await permissionMatrixService.getMatrix();
    setMatrix(res);
  }

  function toggle(roleId: number, permissionId: number) {
    if (!matrix) return;

    setMatrix({
      ...matrix,
      permissions: matrix.permissions.map((p) =>
        p.id === permissionId
          ? {
              ...p,
              assignments: p.assignments.includes(roleId)
                ? p.assignments.filter((r) => r !== roleId)
                : [...p.assignments, roleId],
            }
          : p
      ),
    });
  }

  async function save() {
    if (!matrix) return;

    setSaving(true);
    try {
      for (const role of matrix.roles) {
        const permissionIds = matrix.permissions
          .filter((p) => p.assignments.includes(role.id))
          .map((p) => p.id);

        await permissionMatrixService.assign(role.id, permissionIds);
      }
    } finally {
      setSaving(false);
    }
  }

  if (!matrix) return null;

  return (
    <Box p={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h5">
          Permission Matrix
        </Typography>

        <Button
          variant="contained"
          onClick={save}
          disabled={saving}
        >
          Save Changes
        </Button>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Permission</TableCell>
            {matrix.roles.map((r) => (
              <TableCell key={r.id}>
                {r.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {matrix.permissions.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                {p.resource}.{p.action}
              </TableCell>

              {matrix.roles.map((r) => (
                <TableCell key={r.id}>
                  <Checkbox
                    checked={p.assignments.includes(r.id)}
                    onChange={() =>
                      toggle(r.id, p.id)
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
