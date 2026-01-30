import type { ApiResponse } from "../api/api-response";
import { api } from "../api/axios.instance";
import type { MenuItem } from "./menu.types";

export interface MenuResponse {
  menus: MenuItem[];
  permissions: string[];
}

const normalizeMenus = (items: any[] = []): MenuItem[] =>
  items.map((m) => ({
    id: m.id ?? m.Id,
    name: m.name ?? m.Name,
    url: m.url ?? m.Url ?? undefined,
    identifierName: m.identifierName ?? m.IdentifierName,
    iconClass: m.iconClass ?? m.IconClass ?? undefined,
    parentId: m.parentId ?? m.ParentId ?? undefined,
    isParent: m.isParent ?? m.IsParent ?? false,
    sequence: m.sequence ?? m.Sequence ?? 0,
    order: m.order ?? m.Order ?? 0,
    isActive: m.isActive ?? m.IsActive ?? false,
    canEdit: m.canEdit ?? m.CanEdit ?? false,
    children: m.children ? normalizeMenus(m.children) : undefined,
  }));

export async function fetchMyMenus(): Promise<MenuResponse> {
  const response = await api.get<
    ApiResponse<{
      menus?: MenuItem[];
      permissions?: string[];
      Menus?: MenuItem[];
      Permissions?: string[];
    }>
  >("/menus/current");

  const data = response.data.data ?? {};
  const menus = normalizeMenus(data.menus ?? data.Menus ?? []);
  const permissions = (data.permissions ?? data.Permissions ?? []) as string[];

  return { menus, permissions };
}
