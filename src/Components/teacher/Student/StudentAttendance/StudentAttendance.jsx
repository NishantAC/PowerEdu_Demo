import React, { useEffect, useState } from 'react';
import './StudentAttendance.css'
import MarkAttendance from './table/MarkAttendance';
import StudentAttendanceTable from './table/StudentAttendanceTable';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useDispatch, useSelector } from "react-redux";
import { fetchAcademicYearFilter, fetchAllStudentsOfClass } from "../../../../slices/attendance";

function StudentAttendance() {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.user);
    const { filterAcademicYear } = useSelector((state) => state.attendance);
    const [markAttendanceTable, setMarkAttendanceTable] = useState(false);
    const [filterClass, setFilterClass] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const showTable = () => setMarkAttendanceTable(true);
    const hideTable = () => setMarkAttendanceTable(false);
    console.log(filterAcademicYear)
    const getAcademicYear = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        if (currentMonth > 6) return currentYear;
        else return currentYear - 1;
    };

    useEffect(() => {
        if (currentUser.classes.length > 0) {
            dispatch(fetchAcademicYearFilter({ user_id: currentUser.id, school_code: currentUser.schoolcode, class_code: currentUser.classes[0] }))
            dispatch(fetchAllStudentsOfClass({ school_code: currentUser.schoolcode, class_code: currentUser.classes[0], year: getAcademicYear() }))
        }
    }, [])

    const handleApplyFilters = () => {
        if (filterAcademicYear.length > 0 && currentUser.classes.length > 0) {
            const cls = filterClass.length < 1 ? currentUser.classes[0] : filterClass;
            const year = filterYear.length < 1 ? filterAcademicYear[0] : filterYear;
            dispatch(fetchAllStudentsOfClass({ school_code: currentUser.schoolcode, class_code: cls, year: year }))
        }
    }

    return (
        <div className="studentattendance">
            <div style={{ display: 'flex', marginTop: '28px' }}>
                <p style={{ fontFamily: "Roboto", fontStyle: "normal", fontWeight: "400", fontSize: "18px", lineHeight: "21px", color: "#4D4D4D", }}>
                    Home{" "}&gt;
                    <b>
                        {" "}
                        <u>Student Attendance</u>
                    </b>
                </p>
                {markAttendanceTable ? <p className="backbtn"><button onClick={hideTable}><b><KeyboardBackspaceIcon style={{ verticalAlign: 'middle', fontSize: '18px', marginRight: '5px' }} />Back</b></button></p> : ""}
            </div>
            <div >
                <h3 style={{ fontFamily: "Poppins", fontWeight: '600', marginTop: '30px', fontSize: '25px' }}>Student Attendance</h3>
            </div>
            <br />
            <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '8px', columnGap: '22px', marginTop: '10px' }}>
                <p style={{ fontFamily: "Rubik", fontStyle: "normal", fontWeight: "500", fontSize: "20px", color: "#000000", marginTop: 'auto', marginBottom: 'auto' }}>
                    Filters:-
                </p>
                <select
                    defaultValue={filterAcademicYear.length > 0 ? filterAcademicYear[0] : ''}
                    onChange={(e) => setFilterYear(e.target.value)}
                    style={{ borderRadius: '5px', fontSize: '17px', padding: '4px 10px', color: '#414141' }}>
                    {
                        filterAcademicYear.map((year, i) => (
                            <option key={i} value={year}>{`${year}-${year % 100 + 1}`}</option>
                        ))
                    }
                </select>
                <select
                    defaultValue={currentUser.length > 0 ? currentUser.classes[0] : ''}
                    onChange={(e) => setFilterClass(e.target.value)}
                    style={{ borderRadius: '5px', fontSize: '17px', padding: '4px 10px', color: '#414141' }}>
                    {
                        currentUser.classes.map((cls, i) => (
                            <option key={i} value={cls}>{cls}</option>
                        ))
                    }
                </select>
                <button className="stdntAttndnceApplyBtn" onClick={handleApplyFilters}>Apply</button>
                {!markAttendanceTable ? <button onClick={showTable} className="markattendancebtn">Mark Daily Attendance</button> : ""}
            </div>
            <div style={{ marginTop: '30px' }}>
                {markAttendanceTable ? <MarkAttendance hideTable={hideTable} /> : <StudentAttendanceTable />}
            </div>
        </div>
    )
}

export default StudentAttendance
