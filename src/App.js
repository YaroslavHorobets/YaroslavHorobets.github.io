import React, { useEffect } from "react";
import { useState } from "react";
import {
  Autocomplete,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import Square from "./components/Square";
import ApiService from "./utils/apiUtil";

import "./App.css";

const api = new ApiService("https://60816d9073292b0017cdd833.mockapi.io/modes");

function App() {
  const [modes, setModes] = useState([]);
  const [choosedMode, setChoosedMode] = useState({});
  const [selectedMode, setSelectedMode] = useState({});
  const [hovers, setHovers] = useState([]);
  const [height, setHeigth] = useState("unset");

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      api
        .getAll()
        .then((res) => setModes(res))
        .catch((error) => console.error(error));
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setHeigth(document.getElementById("appField").clientHeight);
  }, [choosedMode]);

  const createPositions = (size) => {
    const newArray = [...Array(size * size).keys()].map((el, index) => ({
      id: index + 1,
      position: `row ${index < size ? 1 : Math.floor(el / size) + 1} col ${
        (index % size) + 1
      }`,
    }));
    return newArray;
  };
  const startReset = () => {
    if (Object.keys(choosedMode).length === 0) {
      setChoosedMode({ ...selectedMode });
      setHovers([]);
    } else {
      setHovers([]);
      setChoosedMode({});
    }
  };

  return (
    <div className="App">
      <div className="App-wrapper">
        <Paper elevation={10} sx={{ p: 4, display: "flex" }}>
          <div
            id="appField"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              marginRight: "40px",
              height: "fit-content",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                marginBottom: "20px",
                alignItems: "center",
                p:'0px 5px'
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={modes}
                freeSolo
                onChange={(event, value) => {
                  if (value) {
                    setSelectedMode(value);
                  } else {
                    setSelectedMode({});
                  }
                }}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Pick mode" />
                )}
                getOptionLabel={(option) => option.name}
              />
              <Button
                color={
                  Object.keys(choosedMode).length === 0 ? "success" : "error"
                }
                disabled={Object.keys(selectedMode).length === 0}
                style={{ minWidth: "65px", height: "56px" }}
                onClick={startReset}
                variant="contained"
                sx={{ minHeight: "52px", ml: 2 }}
              >
                {Object.keys(choosedMode).length === 0 ? "Start" : "Reset"}
              </Button>
            </Stack>
            <div
              style={{
                display: "grid",
                width: "max-content",
                minWidth: "229px",
                minHeight: "229px",
                margin: "0px 5px 0px",
                background:
                  Object.keys(choosedMode).length !== 0 ? "black" : "white",
                border: "1px solid black",
                gridGap: "1px",
                gridTemplateColumns: `repeat(${choosedMode.field}, ${
                  55 - choosedMode.field * 2
                }px)`,
                gridTemplateRows: `repeat(${choosedMode.field}, ${
                  55 - choosedMode.field * 2
                }px)`,
              }}
            >
              {Object.keys(choosedMode).length !== 0 &&
                createPositions(choosedMode.field).map((el, index) => (
                  <React.Fragment key={`square-wrap-${index}`}>
                    <Square
                      index={index}
                      size={choosedMode.field}
                      square={el}
                      hoverSetter={setHovers}
                      hovers={hovers}
                    />
                  </React.Fragment>
                ))}
            </div>
          </div>
          <div style={{ width: "300px", height, overflow: "scroll" }}>
            <Typography variant="h6" fontSize={22}>
              Hover squares
            </Typography>
            {hovers.map((hover, index) => (
              <Typography
                key={`hover-${index}`}
                variant="body2"
                fontSize={16}
                sx={{
                  background: "#FBF8E3",
                  color: "#A28C60",
                  border: "1px solid #A28a50",
                  borderRadius: "4px",
                  maxWidth: "95%",
                  m: "5px auto",
                }}
              >
                {hover.position}
              </Typography>
            ))}
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default App;
