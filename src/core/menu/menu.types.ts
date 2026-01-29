export interface MenuItem {
  id: number;
  name: string;
  url?: string;
  identifierName: string;  
  iconClass?: string;
  parentId?: number;
  isParent: boolean;
  sequence: number;
  order: number;
  isActive: boolean;
  canEdit: boolean;
  children?: MenuItem[];
}
