import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox, Button, FormControlLabel, Stack } from "@mui/material";

import {
  userRoleSchema,
  type UserRoleFormValues,
} from "./userRole.schema";

interface Props {
  allRoles: { id: string; name: string }[];
  defaultRoleIds: string[];
  onSubmit: (values: UserRoleFormValues) => void;
}

export function UserRoleForm({
  allRoles,
  defaultRoleIds,
  onSubmit,
}: Props) {
  const { handleSubmit, setValue, watch } =
    useForm<UserRoleFormValues>({
      resolver: zodResolver(userRoleSchema),
      defaultValues: { roleIds: [] },
    });

  const selected = watch("roleIds");

  useEffect(() => {
    setValue("roleIds", defaultRoleIds);
  }, [defaultRoleIds, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        {allRoles.map((r) => (
          <FormControlLabel
            key={r.id}
            control={
              <Checkbox
                checked={selected.includes(r.id)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...selected, r.id]
                    : selected.filter((x) => x !== r.id);
                  setValue("roleIds", updated, { shouldValidate: true });
                }}
              />
            }
            label={r.name}
          />
        ))}

        <Button type="submit" variant="contained">
          Save Roles
        </Button>
      </Stack>
    </form>
  );
}
