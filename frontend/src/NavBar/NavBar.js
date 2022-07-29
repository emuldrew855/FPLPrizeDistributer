import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#05fb86" }}>
        <Toolbar>
          <Button sx={{ color: "white", backgroundColor: "#2e1137" }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
