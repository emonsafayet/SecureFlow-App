import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { snackbarService } from "../services/snackbar.service";

export function SnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] =
    useState<"success" | "error" | "info" | "warning">("info");

  useEffect(() => {
    snackbarService.register(({ message, severity = "info" }) => {
      setMessage(message);
      setSeverity(severity);
      setOpen(true);
    });
  }, []);

  return (
    <>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
