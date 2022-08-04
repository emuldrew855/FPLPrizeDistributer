import { TextField } from "@mui/material";
import { createTheme, styled } from "@mui/material/styles";

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

export const ValidationTextField = styled(TextField)({
  "& input:valid + fieldset": {
    borderColor: "white",
    borderWidth: 2,
  },
  "& input:invalid + fieldset": {
    borderColor: "white",
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important", // override inline-style
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "#05fb86",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#31e9a5",
    },
  },
  // MuiFormControl-root-MuiTextField-root
  "& .MuiFormControl-root": {
    "& .MuiTextField-root": {
      "& .MuiFormHelperText-root": {
        color: "white",
      },
    },
  },
  "& .MuiFormHelperText-root": {
    color: "white",
  },
  "& .MuiFormLabel": {
    color: "white",
  },
});
