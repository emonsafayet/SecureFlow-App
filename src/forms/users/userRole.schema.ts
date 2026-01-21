import { z } from "zod";

export const userRoleSchema = z.object({
  roleIds: z
    .array(z.string().uuid())
    .min(1, "At least one role must be selected"),
});

export type UserRoleFormValues = z.infer<typeof userRoleSchema>;
