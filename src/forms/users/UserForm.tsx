import { TextField, MenuItem, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserFormValues } from "./user.schema";

interface Props {
  defaultValues?: UserFormValues;
  onSubmit: (values: UserFormValues) => void;
}

export function UserForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultValues ?? {
      name: "",
      email: "",
      status: "Active",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="user-form">
      <Stack spacing={2}>
        <TextField
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />

        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        <TextField
          select
          label="Status"
          {...register("status")}
          fullWidth
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
      </Stack>
    </form>
  );
}
