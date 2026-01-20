import type { UserFormValues } from "../forms/users/user.schema";

 
export const userService = {
  async create(data: UserFormValues) {
    console.log("CREATE USER", data);
    await new Promise((r) => setTimeout(r, 500));
  },

  async update(id: string, data: UserFormValues) {
    console.log("UPDATE USER", id, data);
    await new Promise((r) => setTimeout(r, 500));
  },
};
