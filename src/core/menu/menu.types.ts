export interface MenuItem {
  id: number;
  name: string;
  url?: string;
  identifierName: string;
  iconClass?: string;
  parentId?: number | null;
  isParent: boolean;
  order: number;
  isActive?: boolean;
  children?: MenuItem[];
}
