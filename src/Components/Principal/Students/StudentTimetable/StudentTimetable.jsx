import React, { useEffect, useState } from "react";
import "./StudentTimetable.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import styles from "../../../Teacher/Home/ToDoModal.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  getDropdownClasses,
  getDropdownTeachers,
} from "../../../../slices/principal";
import { getDropdownSubjectsByClass } from "../../../../slices/subject";
import { getTimetableByClass } from "../../../../slices/daywisetimetable";
import TimeTableService from "../../../../services/timetable.service";
import { toast } from "sonner";
import { Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import moment from "moment";

function StudentTimetable() {
  const [timetableData, setTimetableData] = useState({
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    // Add more days as needed
  });
  const [customStartTime, setCustomStartTime] = useState("");
  const [slots, setSlots] = useState("");
  const [classid, setClassid] = useState("");
  const [slotDuration, setSlotDuration] = useState("");
  const [time, setTime] = useState(false);
  const openTime = () => setTime(true);
  const closeTime = () => setTime(false);

  const [edit, setEdit] = useState(false);
  const [timetableExists, setTimetableExists] = useState(false); // State to track if a timetable exists

  const { user } = useSelector((state) => state.user);
  const { classes } = useSelector((state) => state.principal);
  const { dropdownTeachers } = useSelector((state) => state.principal);
  const { dropdownClassSubjects } = useSelector((state) => state.subject);
  const { Timetable } = useSelector((state) => state.timetable);

  const dispatch = useDispatch();

  const reorderTimetable = (timetableData) => {
    // Define the desired order of days
    const desiredOrder = ["mon", "tue", "wed", "thu", "fri", "sat"];

    const reorderedTimetable = {};

    // Loop through the desired order and copy timetable data to the reordered object
    desiredOrder.forEach((day) => {
      if (timetableData.hasOwnProperty(day)) {
        reorderedTimetable[day] = timetableData[day];
      }
    });

    return reorderedTimetable;
  };

  function parseTimeStringToDefaultFormat(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  }
  const calculateTimeDifference = (startTime, endTime) => {
    // Split the time strings into hours and minutes
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    // Convert hours and minutes to total minutes
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    // Calculate the difference in minutes
    const differenceInMinutes = endTotalMinutes - startTotalMinutes;

    return differenceInMinutes;
  };

  useEffect(() => {
    dispatch(getDropdownClasses({ school_id: user?.school_id }));
    dispatch(getDropdownTeachers({ school_code: user?.school_id }));
  }, []);

  useEffect(() => {
    if (classid) {
      dispatch(
        getDropdownSubjectsByClass({
          school_id: user?.school_id,
          class_code: classid,
          timetable: true,
        })
      ).then((result) => {
        dispatch(
          getTimetableByClass({
            class_code: classid,
            school_code: user?.school_id,
          })
        ).then((result) => {
          if (result.payload && result.payload.timetable) {
            
            setTimetableData(reorderTimetable(result.payload.timetable));
            setCustomStartTime(
              parseTimeStringToDefaultFormat(
                result.payload.timetable.mon[0].startTime
              )
            );
            setSlots(result.payload.timetable.mon.length);
            setSlotDuration(
              calculateTimeDifference(
                result.payload.timetable.mon[0].startTime,
                result.payload.timetable.mon[0].endTime
              )
            );
            setTimetableExists(true); // Timetable exists
          } else {
            setTimetableData({
              mon: [],
              tue: [],
              wed: [],
              thu: [],
              fri: [],
              sat: [],
            });
            setCustomStartTime("");
            setSlots("");
            setSlotDuration("");
            setTimetableExists(false); // No timetable exists
          }
        });
      });
    }
  }, [classid]);

  const handleSaveFilters = () => {
    if (customStartTime && slotDuration && slots) {
      // Update start time and end time in the timetable data
      const updatedTimetableData = {};
      Object.keys(timetableData).forEach((day) => {
        const updatedDaySlots = timetableData[day].map(
          (slotData, slotIndex) => {
            const startTime = calculateStartTime(slotIndex);
            const endTime = calculateEndTime(startTime);
            return { ...slotData, startTime, endTime };
          }
        );
        updatedTimetableData[day] = updatedDaySlots;
      });
      setTimetableData(updatedTimetableData);

      // Remove excess slots
      const updatedTimetableDataWithReducedSlots = {};
      Object.keys(updatedTimetableData).forEach((day) => {
        const updatedDaySlots = updatedTimetableData[day].slice(0, slots);
        updatedTimetableDataWithReducedSlots[day] = updatedDaySlots;
      });
      setTimetableData(updatedTimetableDataWithReducedSlots);

      setEdit(!edit);
    }
  };

  const handleAddOrUpdateSlot = (day, slotIndex, slotData) => {
    setTimetableData((prevTimetableData) => {
      const updatedDaySlots = [...prevTimetableData[day]]; // Make a copy of the array
      updatedDaySlots[slotIndex] = slotData; // Update the slot data at the specified index
      return { ...prevTimetableData, [day]: updatedDaySlots }; // Update the day's slots in the timetable data
    });
  };

  const calculateStartTime = (slotIndex) => {
    if (!customStartTime) return ""; // Return empty string if customStartTime is null
    const startTime = moment(customStartTime).add(
      slotIndex * slotDuration,
      "minutes"
    ); // Calculate start time based on slot index and duration
    return startTime.format("HH:mm"); // Format the time as HH:mm
  };

  const calculateEndTime = (startTime) => {
    const startHour = parseInt(startTime.split(":")[0], 10);
    const startMinute = parseInt(startTime.split(":")[1], 10);
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = startTimeInMinutes + parseInt(slotDuration, 10);
    const hour = Math.floor(endTimeInMinutes / 60);
    const minute = endTimeInMinutes % 60;
    return `${hour < 10 ? "0" + hour : hour}:${
      minute < 10 ? "0" + minute : minute
    }`;
  };

  const saveTimetable = () => {
    // Send timetableData to backend
    
    TimeTableService.createTimetable({
      school_code: user?.school_id,
      class_code: classid,
      timetable: timetableData,
    }).then((res) => {
      dispatch(
        getTimetableByClass({
          class_code: classid,
          school_code: user?.school_id,
        })
      ).then((result) => {
        if (result.payload) {
          setTimetableData(reorderTimetable(result.payload.timetable));
          setCustomStartTime(
            parseTimeStringToDefaultFormat(
              result.payload.timetable.mon[0].startTime
            )
          );
          setSlots(result.payload.timetable.mon.length);
          setSlotDuration(
            calculateTimeDifference(
              result.payload.timetable.mon[0].startTime,
              result.payload.timetable.mon[0].endTime
            )
          );
          setEdit(!edit);
          setTimetableExists(true); // Timetable exists
        }
      });
      toast.success("Timetable Created Successfully");
    });
  };

  const resetTimeTable = () => {
    dispatch(
      getTimetableByClass({
        class_code: classid,
        school_code: user?.school_id,
      })
    ).then((result) => {
      if (result.payload) {
        setTimetableData(reorderTimetable(result.payload.timetable));
        setCustomStartTime(
          parseTimeStringToDefaultFormat(
            result.payload.timetable.mon[0].startTime
          )
        );
        setSlots(result.payload.timetable.mon.length);
        setSlotDuration(
          calculateTimeDifference(
            result.payload.timetable.mon[0].startTime,
            result.payload.timetable.mon[0].endTime
          )
        );
      }
    });
    setEdit(false);
  };

  const weekdays = [
    "S No.",
    "Time",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="studenttimetable">
      <div>
        <p
          style={{
            fontfamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "18px",
            lineHeight: "21px",
            color: "#4D4D4D",
          }}
        >
          Home &gt;
          <b>
            {" "}
            <u>Timetable</u>
          </b>
        </p>
      </div>
      <h2 style={{ marginTop: "20px" }}>Timetable</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <p
          style={{
            fontFamily: "Rubik",
            fontWeight: "600",
            fontSize: "20px",
            color: "#000000",
            marginRight: "20px",
          }}
        >
          Filters:-
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "20px",
          }}
        >
          <label
            htmlFor="classFilter"
            style={{
              fontFamily: "Rubik",
              fontWeight: "400",
              fontSize: "17px",
              color: "#000000",
              marginBottom: "5px",
            }}
          >
            Class:
          </label>
          <select
            id="classFilter"
            style={{
              borderRadius: "5px",
              fontSize: "17px",
              padding: "8px 10px",
              color: "#414141",
            }}
            value={classid}
            onChange={(e) => setClassid(e.target.value)}
          >
            <option value="">Select Class</option>
            {classes?.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "20px",
          }}
        >
          <label
            htmlFor="startTimeFilter"
            style={{
              fontFamily: "Rubik",
              fontWeight: "400",
              fontSize: "17px",
              color: "#000000",
              marginBottom: "5px",
            }}
          >
            Start Time:
          </label>
          <span
            id="startTimeFilter"
            onClick={() => {
              if (!timetableExists || edit) {
                openTime();
              }
            }}
            style={{
              cursor: !timetableExists || edit ? "pointer" : "not-allowed",
              backgroundColor: "#ECECEC",
              padding: "8px 12px",
              borderRadius: "3px",
              display: "inline-block",
            }}
          >
            {`${
              !customStartTime
                ? "Select Start Time"
                : moment(customStartTime).format("HH:mm")
            }`}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "20px",
          }}
        >
          <label
            htmlFor="noOfLecturesFilter"
            style={{
              fontFamily: "Rubik",
              fontWeight: "400",
              fontSize: "17px",
              color: "#000000",
              marginBottom: "5px",
            }}
          >
            No. of Lectures:
          </label>
          <input
            id="noOfLecturesFilter"
            disabled={timetableExists && !edit}
            type="number"
            placeholder="No. of Lectures"
            value={slots}
            onChange={(e) => setSlots(e.target.value)}
            style={{
              borderRadius: "5px",
              fontSize: "17px",
              padding: "8px 10px",
              color: "#414141",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "20px",
          }}
        >
          <label
            htmlFor="lectureDurationFilter"
            style={{
              fontFamily: "Rubik",
              fontWeight: "400",
              fontSize: "17px",
              color: "#000000",
              marginBottom: "5px",
            }}
          >
            Lecture Duration (in minutes):
          </label>
          <input
            id="lectureDurationFilter"
            disabled={timetableExists && !edit}
            type="number"
            placeholder="Lecture Duration (in minutes)"
            value={slotDuration}
            onChange={(e) => setSlotDuration(e.target.value)}
            style={{
              borderRadius: "5px",
              fontSize: "17px",
              padding: "8px 10px",
              color: "#414141",
            }}
          />
        </div>
        {customStartTime && (
          <button
            className="applybtnprncpl"
            onClick={handleSaveFilters}
            style={{
              fontSize: "16px",
              padding: "8px 20px",
              borderRadius: "5px",
              border: "none",
              color: "white",
              backgroundColor: "#214DF9",
            }}
          >
            {!edit ? "Edit" : "Save"}
          </button>
        )}
      </div>

      <div style={{ maxWidth: "90vw" }}>
        <TableContainer
          component={Paper}
          style={{ height: "500px", overflowX: "auto", marginBottom: "10px" }}
        >
          <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow
                style={{
                  paddingLeft: "10px",
                  background: "#3D628E",
                  boxSizing: "border-box",
                  borderRadius: "5px",
                }}
              >
                {weekdays.map((day, index) => (
                  <TableCell
                    key={index}
                    align="start"
                    style={{
                      border: "1px solid #CECECE",
                      paddingTop: "18px",
                      paddingBottom: "18px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontSize: "15px",
                      color: "white",
                      backgroundColor: "#3D628E",
                    }}
                  >
                    <div style={{ width: "40px" }}>{day}</div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[...Array(parseInt(10, slots)).keys()].map((slotIndex) => (
                <TableRow key={slotIndex}>
                  <TableCell
                    align="center"
                    style={{
                      border: "1px solid #CECECE",
                      paddingTop: "18px",
                      paddingBottom: "18px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontSize: "15px",
                      color: "#545454",
                      borderBottom: "none",
                    }}
                  >
                    {slotIndex + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      border: "1px solid #CECECE",
                      paddingTop: "18px",
                      paddingBottom: "18px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontSize: "15px",
                      color: "#545454",
                      borderBottom: "none",
                    }}
                  >
                    {calculateStartTime(slotIndex) || "Select Time"}
                  </TableCell>
                  {timetableData &&
                    Object.keys(timetableData).map((day) => (
                      <TableCell
                        align="center"
                        style={{
                          border: "1px solid #CECECE",
                          paddingTop: "18px",
                          paddingBottom: "18px",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontSize: "15px",
                          color: "#545454",
                          borderBottom: "none",
                        }}
                        key={`${day}-${slotIndex}`}
                      >
                        <select
                          style={{ margin: 2 }}
                          value={
                            (timetableData[day][slotIndex] &&
                              timetableData[day][slotIndex].subject_code) ||
                            ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            handleAddOrUpdateSlot(day, slotIndex, {
                              ...timetableData[day][slotIndex],
                              subject_code: value,
                              startTime: calculateStartTime(slotIndex),
                              endTime: calculateEndTime(
                                calculateStartTime(slotIndex)
                              ),
                            });
                          }}
                        >
                          <option value="">Select Subject</option>
                          {dropdownClassSubjects.map((subject) => (
                            <option
                              key={subject.subject_code}
                              value={subject.subject_code}
                            >
                              {subject.subject_name}
                            </option>
                          ))}
                        </select>
                        <select
                          style={{ margin: 2 }}
                          value={
                            (timetableData[day][slotIndex] &&
                              timetableData[day][slotIndex].teacher_id) ||
                            ""
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            handleAddOrUpdateSlot(day, slotIndex, {
                              ...timetableData[day][slotIndex],
                              teacher_id: value,
                            });
                          }}
                        >
                          <option value="">Select Teacher</option>
                          {dropdownTeachers.map((teacher) => (
                            <option
                              key={teacher.user_id}
                              value={teacher.user_id}
                            >
                              {`${teacher.details.firstname} ${teacher.details.lastname}`}
                            </option>
                          ))}
                        </select>
                      </TableCell>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{ gap: "1rem", display: "flex", justifyContent: "flex-end" }}
        >
          <button
            type="button"
            style={{
              fontSize: "16px",
              padding: "10px 30px",
              borderRadius: "5px",
              border: "none",
              color: "white",
              backgroundColor: "green",
            }}
            onClick={() => resetTimeTable()}
          >
            Reset Timetable
          </button>

          <button
            style={{
              fontSize: "16px",
              padding: "10px 30px",
              borderRadius: "5px",
              border: "none",
              color: "white",
              backgroundColor: "#214DF9",
            }}
            onClick={saveTimetable}
          >
            Save Timetable
          </button>
        </div>
      </div>
      {/* start time modal */}
      <Modal
        open={time}
        onClose={closeTime}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="timeboxstyle">
          <div style={{ display: "flex", padding: "0" }}>
            <h4
              style={{
                color: "rgba(0, 0, 0, 0.55)",
                margin: "auto",
                width: "100%",
                textAlign: "center",
              }}
            >
              Clock
            </h4>
            <button className={styles.modalbutton} onClick={closeTime}>
              X
            </button>
          </div>
          <div>
            {/* <Calendar onChange={onChange} value={value} /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticTimePicker
                ampm
                orientation="landscape"
                openTo="hours"
                value={customStartTime || new Date()}
                onChange={(newValue) => {
                  setCustomStartTime(newValue);
                }}
                toolbarTitle="Start Time"
                renderInput={(params) => (
                  <TextField {...params} className={styles.textField} />
                )}
              />
            </LocalizationProvider>
          </div>
          <div style={{ width: "70%", marginTop: "30px" }}>
            <button type="submit" className="timesavebtn" onClick={closeTime}>
              Save
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default StudentTimetable;
