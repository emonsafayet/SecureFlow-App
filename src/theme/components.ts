import { Components } from "@mui/material/styles";

const components: Components = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor: "#f1f5f9",
      },
    },
  },
};

export default components;
