import type { MenuItemDto } from "./menu.types";

export const mockMenus: MenuItemDto[] = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    identifier: "DASHBOARD_VIEW",
    icon: "Dashboard",
    isActive: true,
    order: 1,
    children: [],
  },
  {
    id: 2,
    name: "Users",
    path: "/users",
    identifier: "USER_MANAGE",
    icon: "Users",
    isActive: true,
    order: 2,
    children: [],
  },
];
