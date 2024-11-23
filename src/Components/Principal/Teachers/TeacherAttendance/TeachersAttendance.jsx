import React, { useEffect, useState } from "react";
import "./TeachersAttendance.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { borderRadius } from "@mui/system";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachersProfile } from "../../../../slices/principal";
import {
  fetchAllTeachersBySchool,
  getSubjectTeacherData,
} from "../../../../slices/subjectteacher";
import MarkAttendance from "./MarkAttendance";
import { toast } from 'react-toastify'
import { markUserAttendance } from "../../../../slices/attendance";
import TeacherProfileCard from "./TeacherProfileCard";

function TeachersAttendance() {
  const [markAttendance, setMarkAttendance] = useState(false);
  const showMarkAttendance = () => setMarkAttendance(true);
  const hideMarkAttendance = () => setMarkAttendance(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { classes, subjects } = useSelector((state) => state.principal);
  const { subjectteachers } = useSelector((state) => state.subjectteacher);
  const [teachers, setTeachers] = useState(subjectteachers);
  const [attendanceList, setAttendanceList] = useState([]);

  console.log(attendanceList)
  useEffect(() => {
    // dispatch(fetchTeachersProfile({schoolcode: user?.schoolcode}))
    dispatch(fetchAllTeachersBySchool({ schoolcode: user?.schoolcode }));
  }, [user]);

  useEffect(() => {
    setTeachers(subjectteachers);
  }, [subjectteachers]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };
  // console.log(selectedClass)
  const applyFilters = () => {
    let filteredTeachers = teachers;
    filteredTeachers = teachers.filter(
      (teach) =>
        (selectedClass === '' || teach?.classname === selectedClass) &&
        (selectedSubject === '' || teach?.subjectname === selectedSubject)
    );
    setTeachers(filteredTeachers);
  };

  const handleSave = () => {
    if (attendanceList?.length > 0) {
      dispatch(markUserAttendance({ attendanceList })).then(result => {
        if (result && result.payload) {
          toast(result?.payload?.message)
        }
        setAttendanceList([])
        hideMarkAttendance()
      }).catch(err => toast(err))
    }
  }

  return (
    <div>
      <div className="prncplstdnt">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}
        >
          <p
            style={{
              fontfamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "14px",
              lineHeight: "21px",
              color: "#4D4D4D",
            }}
          >
            Home &gt;
            <b>
              {" "}
              <u>Teacher Attendance</u>
            </b>
          </p>

          {/* {markAttendance? <button onClick={hideMarkAttendance} className="tchrattendancebackbtn"><KeyboardBackspaceIcon style={{verticalAlign:'middle'}}/>Back</button> : ""} */}
          {markAttendance && (
            <Button
              //   className="tchrattendancebackbtn"
              color="inherit"
              onClick={hideMarkAttendance}
            >
              <KeyboardBackspaceIcon
                style={{ verticalAlign: "middle", marginRight: "2px" }}
              />
              Back
            </Button>
          )}
        </div>
        <h3 style={{ marginTop: "30px" }}>Teacher Attendance</h3>
        <br />
        <div className="filters">
          {/* <div style={{display: "inline-flex"}}>
          <div style={{ display: "inline-flex", gap: "10px" }}>
            <p
              style={{
                fontFamily: "Rubik",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "20px",
                color: "#000000",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              Filters:-
            </p>
          
            <select
              style={{
                borderRadius: "5px",
                fontSize: "17px",
                padding: "6px 10px",
                color: "#414141",
              }}
              value={selectedClass}
              onChange={handleClassChange}
            >
              <option value="" hidden>
                Class
              </option>
              {classes?.map((c) => (
                <option key={c.id} value={c.classname}>
                  {c.classname}
                </option>
              ))}
            </select>
        
            <select
              style={{
                borderRadius: "5px",
                fontSize: "17px",
                padding: "6px 10px",
                color: "#414141",
              }}
              value={selectedSubject}
              onChange={handleSubjectChange}
            >
              <option value="" hidden>
                Subject
              </option>
              {subjects?.map((s) => (
                <option key={s.id} value={s.subjectname}>
                  {s.subjectname}
                </option>
              ))}
            </select>
            </div>
            <div style={{ display: "inline-flex", gap: "10px" }}>
              <button
                type="button"
                onClick={applyFilters}
                className="applybtnprncpl"
              >
                Apply
              </button>
              <Button
                onClick={() =>
                  setTeachers(subjectteachers) &
                  setSelectedClass("") &
                  setSelectedSubject("")
                }
              >
                Clear all
              </Button>
            </div>
            </div> */}

          {!markAttendance ? (
            <button className="markattendancetchr" onClick={showMarkAttendance}>
              Mark Daily Attendance
            </button>
          ) : (
            ""
          )}
          <div style={{ marginTop: '30px' }}>
            {markAttendance ? <MarkAttendance hideTable={hideMarkAttendance} /> : <TeacherProfileCard />}
          </div>

        </div>
      </div>
    </div>
  );
}

export default TeachersAttendance;
