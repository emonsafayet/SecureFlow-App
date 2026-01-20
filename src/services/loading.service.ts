let setLoading: ((v: boolean) => void) | null = null;

export const loadingService = {
  register(fn: (v: boolean) => void) {
    setLoading = fn;
  },

  show() {
    setLoading?.(true);
  },

  hide() {
    setLoading?.(false);
  },
};
