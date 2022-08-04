import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  themeButton,
  style,
  ValidationTextField,
  StyledTableCell,
  StyledTableRow,
} from "../Common/theme";
import axios from "axios";
import { host } from "../Common/util";

let rows,
  prizes = [];

export default function League() {
  const totalPrize = 100;
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const str = window.location.href;
  const leagueId = str.substring(str.lastIndexOf("/") + 1, str.length);
  const [leagueData, getLeagueData] = useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  function saveChanges() {
    console.log("Changes saved!");
  }

  useEffect(() => {
    const data = JSON.stringify({ leagueId });
    const config = {
      method: "post",
      url: `${host}retrieveLeague`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (res) {
        getLeagueData(res.data);
        rows = res.data.new_entries.results.map(
          ({ entry_name, player_first_name, player_last_name }) => {
            return {
              teamName: entry_name,
              playerName: `${player_first_name} ${player_last_name}`,
            };
          }
        );
        prizes = res.data?.prizes;
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(`Error: ${error}`);
      });
  }, []);
  return isLoading ? (
    "loading"
  ) : (
    <>
      <div>
        <h1> League: {leagueData?.league?.name}</h1>
        <ThemeProvider theme={themeButton}>
          <Button
            color="primary"
            className="btn"
            variant="contained"
            onClick={openModal}
          >
            Configure prize
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
              Change Prize Configuration
            </Typography>
            <br></br>
            <h3> Total Prize Money: £{totalPrize}</h3>
            {prizes.map((prize) => (
              <>
                <ValidationTextField
                  label="Required"
                  required
                  variant="standard"
                  defaultValue="Success"
                  id="validation-outlined-input"
                  value={`${prize.prize}`}
                  sx={{
                    input: { color: "white" },
                  }}
                  helperText="Provide 1st prize with a %"
                />
                £{totalPrize * (prize.prize / 100)}
                <br></br>
              </>
            ))}
            <br></br>
            <ThemeProvider theme={themeButton}>
              <Button
                style={{ marginRight: "3%" }}
                color="primary"
                className="btn"
                variant="contained"
                onClick={saveChanges}
              >
                Save Changes
              </Button>
            </ThemeProvider>
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
        <br></br>
        <br></br>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell> Position</StyledTableCell>
                <StyledTableCell> Player Name</StyledTableCell>
                <StyledTableCell> Team Name</StyledTableCell>
                <StyledTableCell> Points</StyledTableCell>
                <StyledTableCell> Prize </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.playerName}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.teamName}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    0
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    £0
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
