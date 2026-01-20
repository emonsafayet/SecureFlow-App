import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  status: z.enum(["Active", "Inactive"]),
});

export type UserFormValues = z.infer<typeof userSchema>;
