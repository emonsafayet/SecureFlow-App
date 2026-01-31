import api from "@/core/http/axios";
import type { MenuItem } from "./menu.types";

export interface MenuResponse {
  menus: MenuItem[];
  permissions: string[];
}

function normalizeMenu(m: Record<string, unknown>): MenuItem {
  const children = m.children ?? m.Children;
  return {
    id: (m.id ?? m.Id ?? 0) as number,
    name: (m.name ?? m.Name ?? "") as string,
    url: (m.url ?? m.Url ?? undefined) as string | undefined,
    identifierName: (m.identifierName ?? m.IdentifierName ?? "") as string,
    iconClass: (m.iconClass ?? m.IconClass ?? "dashboard") as string,
    parentId: (m.parentId ?? m.ParentId ?? null) as number | null | undefined,
    isParent: (m.isParent ?? m.IsParent ?? false) as boolean,
    order: (m.order ?? m.Order ?? 0) as number,
    isActive: (m.isActive ?? m.IsActive ?? true) as boolean,
    children: Array.isArray(children)
      ? (children as Record<string, unknown>[]).map((c) => normalizeMenu(c))
      : undefined,
  };
}

interface ApiMenuResponse {
  data?: { menus?: unknown[]; Menus?: unknown[]; permissions?: string[]; Permissions?: string[] };
  menus?: unknown[];
  Menus?: unknown[];
  permissions?: string[];
  Permissions?: string[];
}

export async function fetchMyMenus(): Promise<MenuResponse> {
  const res = await api.get<ApiMenuResponse>("menus/current");
  const body = res.data;
  const inner = (body && "data" in body ? body.data : body) ?? {};
  const rawMenus = inner.menus ?? inner.Menus ?? [];
  const menus = Array.isArray(rawMenus) ? rawMenus.map((m) => normalizeMenu(m as Record<string, unknown>)) : [];
  const permissions = (inner.permissions ?? inner.Permissions ?? []) as string[];
  return { menus, permissions };
}
