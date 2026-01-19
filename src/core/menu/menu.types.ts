export interface MenuItemDto {
  id: number;
  name: string;
  path?: string;              // from Url (nullable)
  identifier: string;         // from IdentifierName (CRITICAL)
  icon?: string;              // from IconClass
  isActive: boolean;
  order: number;
  children?: MenuItemDto[];
}
