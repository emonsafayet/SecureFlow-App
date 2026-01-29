import type { MenuItem } from "./menu.types";
import { hasPermission } from "@/core/auth/permission.utils";

export function filterMenusByPermission(
  menus: MenuItem[]
): MenuItem[] {
  return menus
    .filter(
      (menu) =>
        menu.isActive &&
        hasPermission(menu.identifierName)
    )
    .map((menu) => ({
      ...menu,
      children: menu.children
        ? filterMenusByPermission(menu.children)
        : undefined,
    }))
    .filter(
      (menu) =>
        !menu.children || menu.children.length > 0
    );
}
