import { MenuIconRegistry } from "./menu.icons";

export function resolveMenuIcon(iconKey?: string) {
  if (!iconKey) return null;
  return MenuIconRegistry[iconKey] ?? null;
}
