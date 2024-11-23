import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // import useNavigate from react-router-dom
import { MenuContext } from '../../../context/Menu/MenuContext';
import TimeTable from './TimeTable';
import Circulars from './Circulars';
import Inbox from './Inbox';
import HomeworkAssign from './HomeworkAssign';
import ToDo from './ToDo';
import './TeacherHome.css';

function TeacherHome() {
  const mycontext = useContext(MenuContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate(); // initialize useNavigate

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
            fontFamily: 'sans-serif',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '25px',
          }}
        >
          Hello,{' '}
          {user.firstname ? (
            <span
              style={{
                fontFamily: 'sans-serif',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '25px',
              }}
            >
              {user.firstname}
            </span>
          ) : (
            <span
              style={{
                fontFamily: 'sans-serif',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '25px',
              }}
            >
              First Name
            </span>
          )}
          &nbsp;<span className="wave">👋</span>
        </span>
        <br />
        <br />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => navigate("student-attendance")} className="tchrbtn">
            Mark Attendance
          </button>
          <button onClick={() => navigate("add-assignment")} className="tchrbtn">
            Upload Assignments
          </button>
          <button onClick={() => navigate("exam-marks")} className="tchrbtn">
            Upload Marks
          </button>
        </div>
        <TimeTable />
      </div>
      <div className="right__container">
        <div>
          <div className="div1">
            <Circulars />
            <Inbox />
          </div>
          <div className="div2">
            <HomeworkAssign />
            <ToDo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherHome;
