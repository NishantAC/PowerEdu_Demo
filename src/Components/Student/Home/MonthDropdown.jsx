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

  // React.useEffect(() => {
  //   calendarRef.current.getApi().gotoDate(date);
  // },[date])

  return (
    <></>
  );
}
