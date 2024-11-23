import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MenuContext } from "../../../context/Menu/MenuContext";
import Timetable from "./Timetable/Timetable";
import Totalinfo from "./Totalinfo/Totalinfo";
import TeacherAttendance from "./TeacherAttendance/TeacherAttendance";
import Circulars from "./Circulars/Circulars";
import TopStudents from "./TopStudents/TopStudents";
import TodoList from "./TodoList/TodoList";
import "./PrincipalHome.css";
import ToDo from "../../teacher/Home/ToDo";

function PrincipalHome() {
  const mycontext = useContext(MenuContext);
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  const handleUploadNotice = () => {
    navigate("/principal/notice");
  };

  const handleCreateExam = () => {
    navigate("/principal/exam");
  };

  return (
    <div
      onClick={mycontext.offMenu}
      onScroll={mycontext.offMenu}
      className="main__container"
    >
      <div className="left__container">
        <br />
        <span
          style={{
            fontFamily: "sans-serif",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "25px",
          }}
        >
          Hello,{" "}
          <span
            style={{
              fontFamily: "sans-serif",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "25px",
            }}
          >
            {currentUser.firstname}
          </span>
          &nbsp;<span className="wave">👋</span>
        </span>
        <br />
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={handleUploadNotice} className="prncplbtn">
            Upload Notice/Event
          </button>
          <a
            href="https://calendar.google.com/calendar/u/0/r/eventedit?vcon=meet&dates=now&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="prncplbtn">Schedule Meeting</button>
          </a>
          <button onClick={handleCreateExam} className="prncplbtn">
            Create Exam Schedule
          </button>
        </div>
        <Timetable />
      </div>
      <div className="right__container">
        <div>
          <div className="prncplhomediv1">
            <Totalinfo />
          </div>
          <div className="prncplhomediv2">
            <TeacherAttendance />
            <Circulars />
          </div>
          <div className="prncplhomediv3">
            <TopStudents />
            <ToDo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrincipalHome;