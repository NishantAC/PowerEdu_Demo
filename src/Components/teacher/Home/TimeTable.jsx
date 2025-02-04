import React, { useEffect, useState } from "react";
import "./TimeTable.css";
import "../../Student/Home/Home.css";
import "./Calendar.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./ToDoModal.module.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import CalendarModal from "../../Principal/Home/Calendar/CalendarModal";
import moment from "moment";
import TimeTableService from "../../../services/timetable.service";
import { useSelector } from "react-redux";

export default function TimeTable() {
  const user_id = useSelector((state) => state.user.user.id);
  const school_code = useSelector((state) => state.user.user?.school_id);

  const [value, setValue] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [openClndr, setOpenclndr] = useState(false);
  const openclndr = () => setOpenclndr(true);
  const closeclndr = () => setOpenclndr(false);

  const getTeacherSchedule = () => {
    const dayOfWeek = value
      .toLocaleDateString("en-US", { weekday: "short" })
      .toLowerCase(); // Get the day of the week
    TimeTableService.getTeacherSchedule({
      user_id,
      school_code,
      dayOfWeek,
    }).then((res) => {
      setSchedules(res);
      closeclndr();
    });
  };

  useEffect(() => {
    getTeacherSchedule();
  }, []);

  const timeSlots = [
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  return (
    <div className="timetable">
      <div className="timetablediv1">
        <div style={{ padding: "12px", alignItems: "center", display: "flex" }}>
          <span
            style={{
              fontFamily: "sans-serif",
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: "20px",
            }}
          >
            Timetable
          </span>
          <button className="timetabledate" onClick={openclndr}>
            {moment(value).format("DD-MM-YYYY")}
          </button>
        </div>
      </div>
      <div style={{ padding: "5px 7px" }}>
        <table>
          <tbody>
            {timeSlots.map((time, index) => {
              const schedule = schedules.find(
                (entry) => entry.startTime === time
              );
              // Get current time
              const currentTime = new Date();
              const currentHours = currentTime.getHours();
              const currentMinutes = currentTime.getMinutes();
              const currentFormattedTime = `${currentHours}:${
                currentMinutes < 10 ? "0" + currentMinutes : currentMinutes
              }`;

              // Check if current time is within the schedule time
              const isCurrentTimeBetween =
                schedule &&
                currentFormattedTime >= schedule.startTime &&
                currentFormattedTime <= schedule.endTime;
              return (
                <tr className="sublec" key={index}>
                  <td className="trt">
                    <span> {time} </span>
                  </td>
                  <td className="sub">
                    {schedule && (
                      <div className="lec">
                        <span>{schedule.class_code}</span>
                        <span>{schedule.subject_name}</span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <CalendarModal
        open={openClndr}
        onClose={closeclndr}
        value={value}
        onChange={setValue}
        onSave={getTeacherSchedule}
      />
    </div>
  );
}
