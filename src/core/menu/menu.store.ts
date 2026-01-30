import { create } from "zustand";
import api from "@/core/http/axios";
import type { MenuItem } from "./menu.types";

export const useMenuStore = create<{
  menus: MenuItem[];
  loadMenus: () => Promise<{ menus: MenuItem[]; permissions: string[] }>;
}>((set) => ({
  menus: [],

  loadMenus: async () => {
    const res = await api.get("menus/current");
    const data = res.data?.data ?? {};
    const menus = Array.isArray(data?.menus) ? data.menus : [];
    const permissions = (data?.permissions ?? data?.Permissions ?? []) as string[];

    set({ menus });
    return { menus, permissions };
  },
}));
