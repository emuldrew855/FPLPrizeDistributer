import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import NavBar from "./NavBar/NavBar";
import Footer from "./Footer/Footer";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

class App extends Component {
  handleClick() {
    console.log("Set up league button clicked");
    axios
      .get("http://localhost:8080/getLeague")
      .then(function (response) {
        console.log(`Response ${JSON.stringify(response)}`);
      })
      .catch(function (error) {
        console.log(`Error: ${error}`);
      });
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="App">
          <header className="App-header">
            <h1> Fantasy Football Prize Distributer</h1>
            <img
              src="https://fantasy.premierleague.com/img/share/facebook-share.png"
              className="App-logo"
              alt="logo"
            />
            <ThemeProvider theme={theme}>
              <Button
                color="primary"
                className="btn"
                variant="contained"
                onClick={this.handleClick}
              >
                Set Up League
              </Button>
            </ThemeProvider>
          </header>
          <Footer className="ft" />
        </div>
      </>
    );
  }
}

export default App;
