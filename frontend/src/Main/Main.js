import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { themeButton, style, ValidationTextField } from "../theme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

export default function Main() {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const handleChange = (e) => setValue(e.target.value);
  const [leagueId, setValue] = React.useState("838035");
  function setUpLeague() {
    console.log(`LeagueId: ${leagueId}`);
    // Perform league id validation
    if (leagueId === "" || leagueId === undefined) {
      window.alert("Invalid league id");
    } else {
      //  Create post request to database
      window.location = `http://localhost:3001/league/${leagueId}`;
    }
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
          <br></br>
          <ValidationTextField
            label="Required"
            required
            variant="outlined"
            defaultValue="Success"
            id="validation-outlined-input"
            value={leagueId}
            sx={{
              input: { color: "white" },
            }}
            onChange={handleChange}
            helperText="Please input your league id"
          />
          <h2> How many prizes should there be? </h2>
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
