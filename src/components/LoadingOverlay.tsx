import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { loadingService } from "../services/loading.service";

export function LoadingOverlay() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadingService.register(setOpen);
  }, []);

  return (
    <Backdrop
      open={open}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
