import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './MonthDropdown.module.css';
export default function MonthSelect({ calendarRef, setDate, date }) {

  const monthIndices = {
    'January': 0,
    'February': 1,
    'March': 2,
    'April': 3,
    'May': 4,
    'June': 5,
    'July': 6,
    'August': 7,
    'September': 8,
    'October': 9,
    'November': 10,
    'December': 11,
  };

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];



  const handleChange = (event) => {
    setDate(new Date(date.getFullYear(), monthIndices[event.target.value]));
    calendarRef.current.getApi().gotoDate(date);

  };

  React.useEffect(() => {
    calendarRef.current.getApi().gotoDate(date);
  },[date])

  return (
    <Box sx={{ minWidth: 90 }} >
      <FormControl fullWidth size="small" >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={months[date.getMonth()]}
          onChange={handleChange}
          style={{ height: '25px', display: "inline-flex", alignItems: "center", backgroundColor: "#E0DDDD", borderRadius: "5px", boxShadow: "0px 1px 5px rgba(33, 33, 33, 0.48)", padding: '5px' }}
        >
          <MenuItem value="January">January</MenuItem>
          <MenuItem value="February">February</MenuItem>
          <MenuItem value="March">March</MenuItem>
          <MenuItem value="April">April</MenuItem>
          <MenuItem value="May">May</MenuItem>
          <MenuItem value="June">June</MenuItem>
          <MenuItem value="July">July</MenuItem>
          <MenuItem value="August">August</MenuItem>
          <MenuItem value="September">September</MenuItem>
          <MenuItem value="October">October</MenuItem>
          <MenuItem value="November">November</MenuItem>
          <MenuItem value="December">December</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
