import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  isActive: z.boolean(),
});

export type RoleFormValues = z.infer<typeof schema>;

interface Props {
  defaultValues?: RoleFormValues;
  onSubmit: (values: RoleFormValues) => void;
  formId: string;
}

export default function RoleForm({ defaultValues, onSubmit, formId }: Props) {
  const { register, handleSubmit } = useForm<RoleFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? { isActive: true },
  });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Role Name" {...register("name")} required />
        <TextField label="Description" {...register("description")} />
        <FormControlLabel
          control={<Checkbox {...register("isActive")} />}
          label="Active"
        />
      </Box>
    </form>
  );
}
