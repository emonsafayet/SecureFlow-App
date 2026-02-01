import { useAuthStore } from "@/core/auth/auth.store";

interface Props {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: Props) {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="h-14 flex items-center justify-between px-4 border-b bg-white">
      <div className="flex items-center gap-2">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="px-2 py-1 text-slate-700 hover:bg-slate-100 rounded"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-600">
          {user?.email}
        </span>

        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
