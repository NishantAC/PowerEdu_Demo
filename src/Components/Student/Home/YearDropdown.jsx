import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function YearSelect({calendarRef, setDate, date}) {

  const handleChange = (event) => {
    setDate(new Date(event.target.value, date.getMonth()));
  };
  
  React.useEffect(() => {
    calendarRef.current.getApi().gotoDate(date);
  }, [date])

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth variant="outlined" size="small">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={date.getFullYear()}
          onChange={handleChange}
          style={{height: '25px', display: "inline-flex", alignItems: "center", backgroundColor: "#E0DDDD", borderRadius: "5px", boxShadow: "0px 1px 5px rgba(33, 33, 33, 0.48)", padding: '5px' }}
        >
          <MenuItem value="2016">2016</MenuItem>
          <MenuItem value="2017">2017</MenuItem>
          <MenuItem value="2018">2018</MenuItem>
          <MenuItem value="2019">2019</MenuItem>
          <MenuItem value="2020">2020</MenuItem>
          <MenuItem value="2021">2021</MenuItem>
          <MenuItem value="2022">2022</MenuItem>
          <MenuItem value="2023">2023</MenuItem>
          <MenuItem value="2024">2024</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
}
