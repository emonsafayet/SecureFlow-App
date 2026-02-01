export const Permissions = {
  Dashboard: {
    View: "Permissions.Dashboard.View",
  },

  Users: {
    View: "Permissions.Users.View",
    Create: "Permissions.Users.Create",
    Update: "Permissions.Users.Update",
    Delete: "Permissions.Users.Delete",
  },

  Roles: {
    View: "Permissions.Roles.View",
    Create: "Permissions.Roles.Create",
    Update: "Permissions.Roles.Update",
    Delete: "Permissions.Roles.Delete",
    AssignPermissions: "Permissions.Roles.AssignPermissions",
  },

  AuditLogs: {
    View: "Permissions.AuditLogs.View",
  },

  AuditRetention: {
    Manage: "Permissions.AuditRetention.Manage",
  },

  Permissions: {
    View: "Permissions.Permissions.View",
  },

  Menus: {
    View: "Permissions.Menus.View",
  },
} as const;

/**
 * Optional: union type if you want extra safety later
 */
export type Permission =
  (typeof Permissions)[keyof typeof Permissions][keyof (typeof Permissions)[keyof typeof Permissions]];
