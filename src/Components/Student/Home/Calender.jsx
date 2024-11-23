import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function NativePickers() {
    const today = new Date()
    const [startDate, setDate] = React.useState(new Date)
    const selectDateHandler = (d) => {
        setDate(d)
      }
    return (
        <DatePicker
        className='date'
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={selectDateHandler}
        />
    );
}
