import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Checkbox,
  Button,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";

import {
  userRoleSchema,
  type UserRoleFormValues,
} from "./userRole.schema";

interface Props {
   formId: string;
  allRoles: { id: string; name: string }[];
  defaultRoleIds: string[];
  onSubmit: (values: UserRoleFormValues) => void;
}

export function UserRoleForm({
   formId,
  allRoles,
  defaultRoleIds,
  onSubmit,
}: Props) {
  const { handleSubmit, setValue, watch } =
    useForm<UserRoleFormValues>({
      resolver: zodResolver(userRoleSchema),
      defaultValues: { roleIds: [] },
    });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedRoles = watch("roleIds");

  useEffect(() => {
    setValue("roleIds", defaultRoleIds);
  }, [defaultRoleIds, setValue]);

  return (
    <form  id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="h6">
          Assign Roles
        </Typography>

        {allRoles.map((role) => (
          <FormControlLabel
            key={role.id}
            control={
              <Checkbox
                checked={selectedRoles.includes(role.id)}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...selectedRoles, role.id]
                    : selectedRoles.filter((id) => id !== role.id);

                  setValue("roleIds", updated, { shouldValidate: true });
                }}
              />
            }
            label={role.name}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          sx={{ alignSelf: "flex-start" }}
        >
          Save Roles
        </Button>
      </Stack>
    </form>
  );
}
