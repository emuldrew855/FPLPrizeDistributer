import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Modal, ThemeProvider, Typography } from "@mui/material";
import { style, themeButton } from "../Common/theme";
import LogIn from "../SignIn/LogIn";
import Logout from "../SignIn/Logout";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#05fb86" }}>
          <Toolbar>
            <Button
              sx={{
                color: "white",
                backgroundColor: "#2e1137",
                ":hover": { backgroundColor: "#279971" },
              }}
              onClick={openModal}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Log in
          </Typography>
          <br></br>
          <LogIn />
          <Logout />
          <ThemeProvider theme={themeButton}>
            <Button
              color="primary"
              className="btn"
              variant="contained"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </ThemeProvider>
        </Box>
      </Modal>
    </>
  );
}
