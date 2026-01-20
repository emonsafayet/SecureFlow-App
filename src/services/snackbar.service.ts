type SnackbarOptions = {
  message: string;
  severity?: "success" | "error" | "info" | "warning";
};

let showSnackbar: ((opts: SnackbarOptions) => void) | null = null;

export const snackbarService = {
  register(fn: typeof showSnackbar) {
    showSnackbar = fn;
  },

  show(opts: SnackbarOptions) {
    if (!showSnackbar) {
      throw new Error("SnackbarProvider not mounted");
    }
    showSnackbar(opts);
  },
};
