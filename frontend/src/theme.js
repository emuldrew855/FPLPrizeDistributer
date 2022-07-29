import { createTheme } from "@mui/material/styles";

export const themeButton = createTheme({
  palette: {
    primary: {
      light: "#05fb86",
      main: "#05fb86",
      dark: "#2ec98d",
      contrastText: "black",
    },
  },
});

export const style = {
  position: "absolute",
  top: "35%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  color: "white",
  bgcolor: "#6c6c84",
  border: "2px solid #05fb86",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
};
