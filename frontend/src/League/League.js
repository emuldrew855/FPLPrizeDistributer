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
  StyledTableCell,
  StyledTableRow,
} from "../Common/theme";
import axios from "axios";
import { host } from "../Common/util";
import { PrizeSelection } from "../Main/PrizeSelection";

let rows,
  prizes = [];

export default function League() {
  const totalPrize = 100;
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const str = window.location.href;
  const leagueId = str.substring(str.lastIndexOf("/") + 1, str.length);
  const leagueLink = `https://fantasy.premierleague.com/leagues/${leagueId}/standings/c`;
  const [leagueData, getLeagueData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        prizes = res.data?.prizes;
        rows = res.data.standings.results.map(
          ({ entry_name, player_name, event_total, entry }, i) => {
            return {
              teamName: entry_name,
              playerName: player_name,
              points: event_total,
              prize: prizes[i] === undefined ? 0 : prizes[i].prize,
              entry: `https://fantasy.premierleague.com/entry/${entry}/event/1`,
            };
          }
        );
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
        <h1>
          {" "}
          League:{" "}
          <a href={leagueLink} target="_blank">
            {leagueData?.league?.name}{" "}
          </a>
        </h1>
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
            <br></br>
            <h3>Modify number of prizes</h3>
            <PrizeSelection
              leagueId={leagueId}
              prizes={prizes}
              modify={true}
            ></PrizeSelection>
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
                    <a href={row.entry} target="_blank">
                      {row.teamName}
                    </a>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.points}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    £{totalPrize * (row.prize / 100)}
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
