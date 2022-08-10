import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from "@mui/material";
import { themeButton, ValidationTextField } from "../Common/theme";
import { host } from "../Common/util";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export function PrizeSelection(props) {
  const leagueId = props.leagueId;
  const [inputFields, setInputFields] = useState(
    props.prizes.map((prize) => {
      return { id: uuidv4(), prize: prize.prize };
    })
  );

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), prize: 0 }]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  function setUpLeague() {
    const data = JSON.stringify({ leagueId, prizes: inputFields });
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
        console.log(`Response success: ${res}`);
      })
      .catch(function (error) {
        console.log(`Error: ${error}`);
      });
  }

  function submit() {
    console.log("Submitting league info");
    // Perform league id validation
    if (leagueId === "" || leagueId === undefined || isNaN(leagueId)) {
      window.alert("Invalid league id");
    } else {
      //  Create post request to database
      setUpLeague();
      window.location = `http://localhost:3001/league/${leagueId}`;
    }
  }

  function modifyPrize() {
    console.log("Modify prize");
    setUpLeague();
    window.location = `http://localhost:3001/league/${leagueId}`;
  }

  return (
    <>
      {inputFields.map((inputField) => (
        <>
          <div key={inputField.id}>
            <ValidationTextField
              required
              name="prize"
              variant="outlined"
              id="validation-outlined-input"
              style={{ marginRight: "3%" }}
              sx={{
                input: { color: "white" },
              }}
              value={inputField.prize}
              onChange={(event) => handleChangeInput(inputField.id, event)}
              helperText="Please input your first prize"
            />
            <IconButton
              disabled={inputFields.length === 1}
              onClick={() => handleRemoveFields(inputField.id)}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={handleAddFields}>
              <AddIcon />
            </IconButton>
          </div>
        </>
      ))}
      <ThemeProvider theme={themeButton}>
        {props.modify ? (
          <Button
            color="primary"
            className="btn"
            variant="contained"
            onClick={modifyPrize}
          >
            Save Changes
          </Button>
        ) : (
          <Button
            color="primary"
            className="btn"
            variant="contained"
            onClick={submit}
          >
            Submit
          </Button>
        )}
      </ThemeProvider>
    </>
  );
}
