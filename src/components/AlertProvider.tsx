import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { alertService } from "../services/alert.service";

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [resolver, setResolver] = useState<(v: boolean) => void>();
  const [message, setMessage] = useState("");

  useEffect(() => {
    alertService.registerConfirm(({ message }) => {
      setMessage(message);
      setOpen(true);
      return new Promise((res) => setResolver(() => res));
    });
  }, []);

  const close = (result: boolean) => {
    setOpen(false);
    resolver?.(result);
  };

  return (
    <>
      {children}

      <Dialog open={open}>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button onClick={() => close(false)}>Cancel</Button>
          <Button color="error" onClick={() => close(true)}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
