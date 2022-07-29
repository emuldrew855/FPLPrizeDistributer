import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { ThemeProvider, styled } from "@mui/material/styles";
import { themeButton } from "../theme";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

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
  const { leagueId } = useParams();
  const [leagueData, setLeagueData] = useState([]);
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
    <div>
      <h1> League: {leagueData?.league?.name}</h1>
      <ThemeProvider theme={themeButton}>
        <Button color="primary" className="btn" variant="contained">
          Configure prize
        </Button>
      </ThemeProvider>
      <br></br>
      <br></br>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell> Player Name</StyledTableCell>
              <StyledTableCell> Team Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.playerName}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.teamName}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
