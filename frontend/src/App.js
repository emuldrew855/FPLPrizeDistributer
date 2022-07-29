import React from "react";
import "./App.css";
import axios from "axios";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

let leagueId = 838035;
const host = "http://localhost:8080/";
const theme = createTheme({
  palette: {
    primary: {
      light: "#05fb86",
      main: "#05fb86",
      dark: "#2ec98d",
      contrastText: "black",
    },
  },
});

const style = {
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

function setUpLeague() {
  console.log(`Set up league button clicked with leagueId: ${leagueId}`);
  const data = JSON.stringify({ leagueId });

  const config = {
    method: "post",
    url: `${host}setupLeague`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(`Response: ${JSON.stringify(response.data)}`);
    })
    .catch(function (error) {
      console.log(`Error: ${error}`);
    });
}

function App() {
  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <>
      <NavBar />
      <div className="App">
        <header className="App-header">
          <h1> Fantasy Football Prize Distributer</h1>
          <img
            style={{ borderRadius: "25px" }}
            src="logo600.png"
            className="App-logo"
            alt="logo"
          />
          <ThemeProvider theme={theme}>
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
                id="outlined-basic"
                variant="outlined"
                value={leagueId}
                helperText="Please input your league id"
              />
              <br></br>
              <ThemeProvider theme={theme}>
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
        </header>
        <Footer className="ft" />
      </div>
    </>
  );
}

export default App;
