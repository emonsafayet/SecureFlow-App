import { create } from "zustand";
import type { MenuItemDto } from "./menu.types";
import { fetchMyMenus } from "./menu.api";

interface MenuState {
  menus: MenuItemDto[];
  loading: boolean;

  loadMenus: () => Promise<{
    menus: MenuItemDto[];
    permissions: string[];
  }>;

  clearMenus: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  menus: [],
  loading: false,

  loadMenus: async () => {
    set({ loading: true });

    const { menus, permissions } = await fetchMyMenus();

    set({ menus, loading: false });

    return { menus, permissions };
  },

  clearMenus: () => {
    set({ menus: [], loading: false });
  },
}));
