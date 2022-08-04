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

export default function PrizeSelection(props) {
  const leagueId = props.leagueId;
  const [inputFields, setInputFields] = useState([{ id: uuidv4(), prize: "" }]);

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

  function submit() {
    console.log("Submitting league info");
    // Perform league id validation
    if (leagueId === "" || leagueId === undefined || isNaN(leagueId)) {
      window.alert("Invalid league id");
    } else {
      //  Create post request to database
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
      window.location = `http://localhost:3001/league/${leagueId}`;
    }
  }

  return (
    <>
      <h2>Add number of prizes</h2>
      {inputFields.map((inputField) => (
        <>
          <div key={inputField.id}>
            <ValidationTextField
              required
              name="prize"
              label="Required"
              variant="outlined"
              id="validation-outlined-input"
              style={{ marginRight: "3%" }}
              sx={{
                input: { color: "white" },
              }}
              value={inputField.firstName}
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
        <Button
          color="primary"
          className="btn"
          variant="contained"
          onClick={submit}
        >
          Submit
        </Button>
      </ThemeProvider>
    </>
  );
}
