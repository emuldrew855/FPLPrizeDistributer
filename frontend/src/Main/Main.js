import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { themeButton, style } from "../theme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

export default function Main() {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const handleChange = (e) => setValue(e.target.value);
  const [leagueId, setValue] = React.useState("838035");
  function setUpLeague() {
    console.log(`LeagueId: ${leagueId}`);
    // Perform league id validation
    window.location = `http://localhost:3001/league/${leagueId}`;
  }
  return (
    <>
      <h1> Fantasy Football Prize Distributer</h1>
      <img
        style={{ borderRadius: "25px" }}
        src="logo600.png"
        className="App-logo"
        alt="logo"
      />
      <ThemeProvider theme={themeButton}>
        <Button
          color="primary"
          className="btn"
          variant="contained"
          onClick={openModal}
        >
          Set Up League
        </Button>
      </ThemeProvider>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Input league details
          </Typography>
          <TextField
            required
            id="standard-required"
            variant="standard"
            label="Required"
            value={leagueId}
            onChange={handleChange}
            helperText="Please input your league id"
          />
          <br></br>
          <ThemeProvider theme={themeButton}>
            <Button
              color="primary"
              className="btn"
              variant="contained"
              onClick={setUpLeague}
            >
              Submit
            </Button>
          </ThemeProvider>
        </Box>
      </Modal>
    </>
  );
}
