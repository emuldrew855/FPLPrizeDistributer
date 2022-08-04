import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { ThemeProvider, styled } from "@mui/material/styles";
import { themeButton, style, ValidationTextField } from "../theme";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";

const host = "http://localhost:8080/";
let rows = [];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#49d09e",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function League() {
  const totalPrize = 100,
    firstPrize = 60,
    secondPrize = 20,
    thirdPrize = 20;
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const { leagueId } = useParams();
  const [leagueData, setLeagueData] = useState([]);
  function saveChanges() {
    console.log("Changes saved!");
  }
  useEffect(() => {
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
      .then(function (res) {
        setLeagueData(res.data);
        rows = leagueData.new_entries.results.map(
          ({ entry_name, player_first_name, player_last_name }) => {
            return {
              teamName: entry_name,
              playerName: `${player_first_name} ${player_last_name}`,
            };
          }
        );
      })
      .catch(function (error) {
        console.log(`Error: ${error}`);
      });
  });
  return (
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
            <ValidationTextField
              label="Required"
              required
              variant="standard"
              defaultValue="Success"
              id="validation-outlined-input"
              value={`${firstPrize}%`}
              sx={{
                input: { color: "white" },
              }}
              helperText="Provide 1st prize with a %"
            />
            £{totalPrize * (firstPrize / 100)}
            <br></br>
            <ValidationTextField
              label="Required"
              required
              variant="standard"
              defaultValue="Success"
              id="validation-outlined-input"
              value={`${secondPrize}%`}
              sx={{
                input: { color: "white" },
              }}
              helperText="Provide 2nd prize prize with a %"
            />
            £{totalPrize * (secondPrize / 100)}
            <br></br>
            <ValidationTextField
              label="Required"
              required
              variant="standard"
              defaultValue="Success"
              id="validation-outlined-input"
              value={`${thirdPrize}%`}
              sx={{
                input: { color: "white" },
              }}
              helperText="Provide 3rd prize prize with a %"
            />
            £{totalPrize * (thirdPrize / 100)}
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
