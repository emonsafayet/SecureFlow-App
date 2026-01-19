import type { ApiResponse } from "../api/api-response";
import { api } from "../api/axios.instance";
import type { MenuItemDto } from "./menu.types";

export interface MenuResponse {
  menus: MenuItemDto[];
  permissions: string[];
}

export async function fetchMyMenus(): Promise<MenuResponse> {
  const response = await api.get<ApiResponse<{
    menus: MenuItemDto[];
    permissions: string[];
  }>>("/menus/current"); // api endpoint

  return response.data.data;
}
