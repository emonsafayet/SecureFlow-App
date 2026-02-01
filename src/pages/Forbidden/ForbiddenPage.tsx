import { useNavigate } from "react-router-dom";

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow text-center">
        <h1 className="text-3xl font-semibold text-slate-900 mb-2">
          Access Denied
        </h1>

        <p className="text-sm text-slate-600 mb-6">
          You don’t have permission to access this page.
          If you believe this is a mistake, contact your administrator.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
