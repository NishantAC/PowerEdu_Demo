import React from "react";
import "./Attendance.css";

import { Chart, PieSeries } from "@devexpress/dx-react-chart-material-ui";
import { useEffect } from "react";
import AttendanceService from "../../../services/attendance.service";
import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "@mui/material";
import AttendanceModel from "./AttendanceModel";
import { display, textAlign } from "@mui/system";
import { CenturyView } from "react-calendar";

const styles = {
  root: {
    fontFamily: "consolas, sans-serif",
    textAlign: "center",
    position: "relative",
    verticalAlign: "center",
  },
  overlay: {
    position: "relative",
    top: -170,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 45,
    color: "#4F4F4F",
    textAlign: "center",
    // This is important to preserve the chart interactivity
    pointerEvents: "none",
  },
};

export default function Attendance() {
  const { user } = useSelector((state) => state.user);

  const [openAttendence, setOpenAttendence] = React.useState(false);

  const handleOpen = () => setOpenAttendence(true);
  const handleClose = () => setOpenAttendence(false);

  const [pieRatio, setPieRatio] = useState([
    { argument: "Present", value: 8 },
    { argument: "Absent", value: 5 },
  ]);
  const allAttendance = useRef([]);
  const [filterAtt, setFilterAtt] = useState({
    present: 0,
    absent: 0,
    total: 0,
    overall: [],
  });

  useEffect(() => {
    AttendanceService.getUserAttendance({ user_id: user.id })
      .then((res) => {
        allAttendance.current = res;
        console.log(res);
        filterAttendance(res, "weekly");
      })
      .catch((err) => console.error(err));
  }, []);

  const filterAttendance = (data, type) => {
    const body = { present: 0, absent: 0, total: 0, overall: [] };
    let startDate, endDate;
    const currentDate = new Date();

    if (type === "weekly") {
      // Current week
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(currentDate);
      endOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));

      startDate = startOfWeek;
      endDate = endOfWeek;
    } else if (type === "monthly") {
      // Current month
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
    } else {
      // Academic year
      if (currentDate.getMonth() < 6) {
        startDate = new Date(currentDate.getFullYear() - 1, 6, 1);
        endDate = new Date(currentDate.getFullYear(), 5, 30);
      } else {
        startDate = new Date(currentDate.getFullYear(), 6, 1);
        endDate = new Date(currentDate.getFullYear() + 1, 5, 30);
      }
    }

    for (const dateStr in data) {
      const date = new Date(
        dateStr.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")
      );
      if (date >= startDate && date <= endDate) {
        body.total++;
        if (data[dateStr] === "p") {
          body.present++;
        } else if (data[dateStr] === "a") {
          body.absent++;
        }
        body.overall.push({ date: dateStr, remark: data[dateStr] });
      }
    }

    setFilterAtt(body);
    setPieRatio([
      { argument: "Present", value: body.present },
      { argument: "Total", value: body.total },
    ]);
  };

  // console.log(allAttendance)

  return (
    <div className="attendance">
      <div className="atdiv1">
        <div className="attendanceheader">
          <span>Attendance</span>
          <div className="attendancebtns">
            <button
              autoFocus
              className="weekly"
              onClick={() => {
                filterAttendance(allAttendance.current, "weekly");
              }}
            >
              Weekly
            </button>
            &nbsp; &nbsp;
            <button
              className="weekly"
              onClick={() => {
                filterAttendance(allAttendance.current, "monthly");
              }}
            >
              Monthly
            </button>
            &nbsp; &nbsp;
            <button
              className="weekly"
              onClick={() => {
                filterAttendance(allAttendance.current, "");
              }}
            >
              Overview
            </button>
          </div>
        </div>
      </div>
      <div style={{ justifyContent: "center", verticalAlign: "center" }} onClick={handleOpen}>
        <Chart
          data={pieRatio}
          height={210}
          style={{ marginBottom: "20px", marginTop: "15px" }}
        >
          <svg style={{ display: "none" }}>
            <defs>
              <filter id="inset-shadow">
                <feComponentTransfer in="SourceAlpha">
                  <feFuncA type="table" tableValues="1 0" />
                </feComponentTransfer>
                <feGaussianBlur stdDeviation="5" />
                <feOffset dx="5" dy="5" result="offsetblur" />
                <feFlood floodColor="rgba(0,0,0,0.5)" />
                <feComposite in2="offsetblur" operator="in" />
                <feComposite in2="SourceAlpha" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
          <PieSeries
            valueField="value"
            argumentField="argument"
            innerRadius={0.6}
            className="custom-pie-series"
          />
        </Chart>
        <div style={styles.overlay}>
          <span>{filterAtt.present + "/" + filterAtt.total}</span>
          {/* <span>{filterAtt.absent + "/" + filterAtt.present}</span> */}
        </div>
      </div>
      {filterAtt.overall.length < 30 && (
        <AttendanceModel
          handleClose={handleClose}
          openAttendence={openAttendence}
          data={filterAtt.overall}
        />
      )}
    </div>
  );
}
