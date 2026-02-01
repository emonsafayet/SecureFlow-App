import React from "react";

interface CancelButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function CancelButton({
  onClick,
  disabled = false,
  children = "Cancel",
}: CancelButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="
        px-4 py-2 rounded-md border border-slate-300
        bg-white text-slate-700 text-sm font-medium
        hover:bg-slate-50
        focus:outline-none focus:ring-2 focus:ring-slate-300/40
        disabled:opacity-60 disabled:cursor-not-allowed
      "
    >
      {children}
    </button>
  );
}
