import { create } from "zustand";
import { fetchMyMenus } from "./menu.api";
import type { MenuItem } from "./menu.types";
interface MenuState {
  menus: MenuItem[];
  permissions: string[];
  loadMenus: () => Promise<void>;
}

export const useMenuStore = create<MenuState>((set) => ({
  menus: [],
  permissions: [],

  loadMenus: async () => {
    try {
      const { menus, permissions } = await fetchMyMenus();
      set({ menus, permissions });
    } catch (error) {
      console.error("Failed to load menus", error);
      set({ menus: [], permissions: [] });
    }
  },
}));

