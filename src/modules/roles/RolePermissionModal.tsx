import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";

import { FormModal } from "@/components/modal/FormModal";
import {
  rolePermissionService,
  type RolePermissionDto,
} from "@/services/rolePermission.service";

interface Props {
  roleId: number;
  roleName: string;
  onClose: () => void;
}

export default function RolePermissionModal({
  roleId,
  roleName,
  onClose,
}: Props) {
  const [permissions, setPermissions] = useState<RolePermissionDto[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await rolePermissionService.get(roleId);
      setPermissions(res);
    }

    load();
  }, [roleId]);

  function toggle(id: number) {
    setPermissions((prev) =>
      prev.map((p) =>
        p.permissionId === id
          ? { ...p, assigned: !p.assigned }
          : p
      )
    );
  }

  async function save() {
    setSaving(true);
    try {
      const ids = permissions
        .filter((p) => p.assigned)
        .map((p) => p.permissionId);

      await rolePermissionService.assign(roleId, ids);
      onClose();
    } finally {
      setSaving(false);
    }
  }

  // group by resource
  const grouped = permissions.reduce<Record<string, RolePermissionDto[]>>(
    (acc, p) => {
      acc[p.resource] ??= [];
      acc[p.resource].push(p);
      return acc;
    },
    {}
  );

  return (
    <FormModal
      open
      title={`Permissions – ${roleName}`}
      submitting={saving}
      onClose={onClose}
      onSubmit={save}
    >
      <Box display="flex" flexDirection="column" gap={2}>
        {Object.entries(grouped).map(([resource, items]) => (
          <Box key={resource}>
            <Typography variant="subtitle1" fontWeight={600}>
              {resource}
            </Typography>

            {items.map((p) => (
              <FormControlLabel
                key={p.permissionId}
                control={
                  <Checkbox
                    checked={p.assigned}
                    onChange={() => toggle(p.permissionId)}
                  />
                }
                label={`${p.action} — ${p.description}`}
              />
            ))}

            <Divider sx={{ my: 1 }} />
          </Box>
        ))}
      </Box>
    </FormModal>
  );
}
