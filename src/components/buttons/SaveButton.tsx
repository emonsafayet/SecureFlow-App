import { Button, CircularProgress } from "@mui/material";

export function SaveButton({
  loading,
}: {
  loading?: boolean;
}) {
  return (
    <Button
      type="submit"
      variant="contained"
      startIcon={loading ? <CircularProgress size={14} /> : null}
      disabled={loading}
    >
      Save
    </Button>
  );
}
