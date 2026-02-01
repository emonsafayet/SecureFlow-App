import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/core/http/axios"; 
import CancelButton from "@/components/buttons/CancelButton";
import SaveButton from "@/components/buttons/SaveButton";
import Can from "@/core/auth/Can";
 import { Permissions } from "@/core/auth/permissions";

interface RoleDto {
  id: string;
  name: string;
  description?: string;
  assigned: boolean;
}

interface UserDto {
  id: string;
  email: string;
  fullName?: string;
}

export default function UserRolesPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserDto | null>(null);
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user + roles
  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        setLoading(true);

        const [userRes, rolesRes] = await Promise.all([
          api.get(`/api/users/${id}`),
          api.get(`/api/users/${id}/roles`),
        ]);

        setUser(userRes.data);
        setRoles(rolesRes.data);
      } catch {
        setError("Failed to load user roles");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const toggleRole = (roleId: string) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === roleId ? { ...r, assigned: !r.assigned } : r
      )
    );
  };

  const saveChanges = async () => {
    if (!id) return;

    try {
      setSaving(true);

      const assignedRoleIds = roles
        .filter((r) => r.assigned)
        .map((r) => r.id);

      await api.put(`/api/users/${id}/roles`, {
        roleIds: assignedRoleIds,
      });

      navigate("/users");
    } catch {
      setError("Failed to save role changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-slate-500">Loading user roles…</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600 bg-red-50 border rounded">
        {error}
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-6 max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Manage Roles
        </h1>
        <p className="text-sm text-slate-500">
          User: {user.email}
        </p>
      </div>

      {/* Role list */}
      <div className="space-y-3 border rounded-lg p-4 bg-white">
        {roles.map((role) => (
          <label
            key={role.id}
            className="flex items-center gap-3 text-sm"
          >
            <input
              type="checkbox"
              checked={role.assigned}
              onChange={() => toggleRole(role.id)}
              className="h-4 w-4 rounded border-slate-300"
            />
            <div>
              <div className="font-medium">{role.name}</div>
              {role.description && (
                <div className="text-xs text-slate-500">
                  {role.description}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <CancelButton onClick={() => navigate("/users")}>
          Cancel
        </CancelButton>  
        <Can permission={Permissions.Users.Update}>
          <SaveButton loading={saving} onClick={saveChanges} />
        </Can> 
      </div>
    </div>
  );
}
