import * as React from "react";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { Typography } from "@mui/material";

function ClassDropdown({
  classes,
  getAssignedSubjects,
  getClassIds,
  setClassDropdownValue,
}) {
  // Set dropdown values
  const [title, setTitle] = React.useState("");

  // Handle the dropdown change
  const handleChange = (event) => {
    setTitle(event.target.value);
    setClassDropdownValue(event.target.value);

    // Get class_code specific data
    getAssignedSubjects([event.target.value]);
  };

  return (
    <FormControl sx={{ my: 1, width: 100, height: 35 }} variant="standard">
      <Select
        value={title}
        onChange={handleChange}
        displayEmpty
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        input={<InputBase className="border border-gray-500 rounded-md text-gray-800 text-sm px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />}
      >
        <MenuItem value="">
          <Typography
            sx={{
              fontFamily: "Rubik",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: "21px",
            }}
          >
            Class
          </Typography>
        </MenuItem>
        {classes.map((c) => (
          <MenuItem key={c} value={c}>
            {" "}
            <Typography
              sx={{
                fontFamily: "Rubik",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "21px",
              }}
            >
              {c}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ClassDropdown;
