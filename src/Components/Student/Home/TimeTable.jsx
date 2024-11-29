import React, { useEffect, useState } from "react";
import "./TimeTable.css";
import styles from "./Calendar.module.css";
import "./Home.css";
import "../../teacher/Home/Calendar.css";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Calendar from "./Calender";
//new
import { useDispatch, useSelector } from "react-redux";
import { getDayWiseSubject } from "../../../slices/daywisetimetable";
import DatePicker from "react-datepicker";
import ShowTimeTableSubjects from "./ShowTimeTableSubjects";

export default function TimeTable() {

    //destructing data from localStorage
    const user = useSelector((state) => state.auth.user);
    const [startDate, setDate] = useState(new Date());

    const dispatch = useDispatch();

    //get data from redux state
    const { subject } = useSelector((state) => state.timetable);

    //on page load getting data
    useEffect(() => {
        dispatch(
            getDayWiseSubject({
                class_id: classid,
                schoolcode,
                day: startDate.getDay(),
            })
        );
    }, [startDate]);

    return (
        <div className="time-table">
            <div className="timetablediv-1">
                <div className="ttd1d1">
                    <span className="ttd1d1span">Timetable</span>
                    <div className="ttd1d2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <ChooseDate startDate={startDate} setDate={setDate} />
                        </LocalizationProvider>
                    </div>
                </div>
            </div>

            <div className="timetablediv2">
                {/*display all subjects*/}
                {subject?.map((sub) => {
                    return (<ShowTimeTableSubjects sub={sub} startDate={startDate} />)
                })
                }
            </div>
        </div>
    );
}

function ChooseDate({ startDate, setDate }) {
    const selectDateHandler = (d) => {
        setDate(d);
    };
    return (
        <DatePicker
            className="date"
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={selectDateHandler}
        />
    );
}
