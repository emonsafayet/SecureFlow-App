import type { MenuItem } from "./menu.types";

export const mockMenus: MenuItem[] = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
    identifierName: "DASHBOARD_VIEW",
    iconClass: "Dashboard",
    isActive: true,
    order: 1,
    children: [],
    isParent: false,
    sequence: 0,
    canEdit: false
  },
  {
    id: 2,
    name: "Users",
    url: "/users",
    identifierName: "USER_MANAGE",
    iconClass: "Users",
    isActive: true,
    order: 2,
    children: [],
    isParent: false,
    sequence: 0,
    canEdit: false
  },
];
