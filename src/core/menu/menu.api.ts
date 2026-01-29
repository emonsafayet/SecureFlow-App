import type { ApiResponse } from "../api/api-response";
import { api } from "../api/axios.instance";
import type { MenuItem } from "./menu.types";

export interface MenuResponse {
  menus: MenuItem[];
  permissions: string[];
}

export async function fetchMyMenus(): Promise<MenuResponse> {
  const response = await api.get<ApiResponse<{
    menus: MenuItem[];
    permissions: string[];
  }>>("/menus/current"); // api endpoint

  return response.data.data;
}
