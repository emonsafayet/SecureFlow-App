type ConfirmOptions = {
  title?: string;
  message: string;
};

let confirmHandler: ((opts: ConfirmOptions) => Promise<boolean>) | null = null;

export const alertService = {
  registerConfirm(handler: typeof confirmHandler) {
    confirmHandler = handler;
  },

  confirm(opts: ConfirmOptions) {
    if (!confirmHandler) {
      throw new Error("AlertProvider not mounted");
    }
    return confirmHandler(opts);
  },
};
