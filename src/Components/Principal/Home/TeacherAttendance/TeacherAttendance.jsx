import React, { useEffect, useState } from 'react';
import MonthlyAttendanceTable from './MonthlyAttendanceTable';
import OverviewTable from './OverviewTable';
import './TeacherAttendance.css';
import TeacherAttendanceTable from './TeacherAttendanceTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTeachersBySchool } from '../../../../slices/subjectteacher';
import moment from 'moment';
import { fetchTeachersWithAttendance } from '../../../../slices/attendance';

function TeacherAttendance() {
  const [value, setValue] = useState(1);
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user);
  const { classes, subjects } = useSelector((state) => state.principal);
  const { subjectteachers } = useSelector((state) => state.subjectteacher);
  const { teachersWithAttendance } = useSelector(state => state.attendance)
  const [attendanceList, setAttendanceList] = useState(teachersWithAttendance);

  useEffect(() => {
    // dispatch(fetchTeachersProfile({schoolcode: user?.schoolcode}))
    dispatch(fetchTeachersWithAttendance({ school_code: user?.schoolcode, value }));
  }, [user, value]);

  useEffect(() => {
    setAttendanceList(teachersWithAttendance)
  }, [teachersWithAttendance])

  console.log(attendanceList)

  return (
    <div className="tchrattendance">
      <div style={{ backgroundColor: "#F9F9F9", height: "50px", alignItems: "center", width: "100%", position: "sticky", top: 0, zIndex: 1 }}>
        <div className="tchrattendanceheader">
          <span style={{ fontFamily: "sans-serif", fontStyle: "normal", fontWeight: "600", fontSize: "20px", marginRight: '5px' }}>Teacher Attendance</span>
          <div style={{ marginRight: '0px', marginLeft: 'auto', alignItems: "center", display: "inline-flex" }}>
            <button className={"tchrattendanceweekly" + ` ${value === 1 ? 'active' : ''}`} style={{ display: "inline-flex", alignItems: "center" }} onClick={e => { setValue(1) }}>Weekly</button>
            &nbsp;
            &nbsp;
            <button className={"tchrattendanceweekly" + ` ${value === 2 ? 'active' : ''}`} onClick={e => { setValue(2) }}>Monthly</button>
            &nbsp;
            &nbsp;
            <button className={"tchrattendanceweekly" + ` ${value === 3 ? 'active' : ''}`} onClick={e => { setValue(3) }}>Overview</button>
          </div>
        </div>
      </div>
      <div className="tchrattendance-body">
        <TeacherAttendanceTable attendanceList={attendanceList} />
      </div>
    </div>
  );
}

export default TeacherAttendance;
