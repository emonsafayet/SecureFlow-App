import { create } from "zustand";
import { fetchMyMenus } from "./menu.api";
import type { MenuItem } from "./menu.types";
import { filterMenusByPermission } from "./menu.utils";

interface MenuState {
  menus: MenuItem[];
  loading: boolean;

  loadMenus: () => Promise<{
    menus: MenuItem[];
    permissions: string[];
  }>;

  clearMenus: () => void;

  /** Derived */
  visibleMenus: () => MenuItem[];
}

export const useMenuStore = create<MenuState>((set, get) => ({
  menus: [],
  loading: false,

  loadMenus: async () => {
    set({ loading: true });

    const { menus, permissions } = await fetchMyMenus();

    set({ menus, loading: false });

    // permissions should already be stored in auth store
    return { menus, permissions };
  },

  clearMenus: () => {
    set({ menus: [], loading: false });
  },

  /** Permission-aware menus */
  visibleMenus: () =>
    filterMenusByPermission(get().menus),
}));
