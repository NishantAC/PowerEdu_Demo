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
  


  return (
<></>
  );
}
