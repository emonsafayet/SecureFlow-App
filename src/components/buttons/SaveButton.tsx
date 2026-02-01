interface SaveButtonProps {
  onClick?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
}

export default function SaveButton({
  onClick,
  loading,
  children = "Save",
}: SaveButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="px-4 py-2 rounded bg-blue-600 text-white
                 hover:bg-blue-700 disabled:opacity-60"
    >
      {loading ? "Saving..." : children}
    </button>
  );
}
