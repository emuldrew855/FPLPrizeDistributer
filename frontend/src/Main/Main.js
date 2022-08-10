import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { themeButton, style, ValidationTextField } from "../Common/theme";
import { PrizeSelection as PrizeSelector } from "./PrizeSelection";

export default function Main() {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [leagueId, setValue] = useState(838035);
  const handleChange = (e) => setValue(e.target.value);
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
          <h3>Add number of prizes</h3>
          <PrizeSelector
            leagueId={leagueId}
            prizes={[{ id: 0, prize: 0 }]}
            modify={false}
          />
        </Box>
      </Modal>
    </>
  );
}
