import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import typography from "./typography";
import components from "./components";
import { darkPalette } from "./palette.dark";
import { lightPalette } from "./palette.light";

export const theme = createTheme({
  palette,
  typography,
  components,
});

export function getTheme(dark: boolean) {
  return createTheme({
    palette: dark ? darkPalette : lightPalette,
    typography,
    components,
  });
}
