import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { AlertProvider } from "./AlertProvider";
import { SnackbarProvider } from "./SnackbarProvider";
import { LoadingOverlay } from "./LoadingOverlay";
import { getTheme } from "../theme";
import { useUiStore } from "../theme/store/ui.store";

interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  const darkMode = useUiStore((s) => s.darkMode);

  return (
    <ThemeProvider theme={getTheme(darkMode)}>
      <CssBaseline />
      <AlertProvider>
        <SnackbarProvider>
          <LoadingOverlay />
          {children}
        </SnackbarProvider>
      </AlertProvider>
    </ThemeProvider>
  );
}
