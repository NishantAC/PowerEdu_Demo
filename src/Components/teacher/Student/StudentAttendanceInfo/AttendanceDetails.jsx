import React,{ useEffect, useState } from 'react';
import './AttendanceDetails.css'
import Dropdown from '../StudentAcademics/Dropdown';
import AcademicYearDropdown from '../StudentAcademics/AcademicYearDropdown';
import AttendanceTable from './AttendanceTable';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAttendance, fetchStudentsAcedemicYears } from "../../../../slices/attendance"

const getAcademicYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; 
  
    if(currentMonth > 6) return currentYear;
    else return currentYear -1;
};

function AttendanceDetails({userId}) {
    const dispatch = useDispatch();
    const { userAttendance, studentsAcademicYears } = useSelector((state) => state.attendance);
    const [ filterAcademicYear, setFilterAcademicYear ] = useState(getAcademicYear())
    const academicYears = Object.keys(studentsAcademicYears);
   
    useEffect(() => {
        dispatch(fetchUserAttendance({user_id: userId, year: parseInt(filterAcademicYear)}))
        dispatch(fetchStudentsAcedemicYears({user_id: userId}))
    },[userId])


    let presentCount = 0;
    let absentCount = 0;
    let leaveCount = 0;

    for (const key in userAttendance) {
        if (userAttendance.hasOwnProperty(key)) {
            switch (userAttendance[key]) {
                case 'p':
                    presentCount++;
                    break;
                case 'l':
                    leaveCount++;
                    break;
                case 'a':
                    absentCount++;
                    break;
                default:
                    break;
            }
        }
    }

    const attendanceTableData = Object.entries(userAttendance).map(([date, status]) => {
        const formattedDate = date.split('/').join('-');
        const newData = {
            academicyear: `${filterAcademicYear}`,
            date: formattedDate,
            class: studentsAcademicYears[parseInt(filterAcademicYear)],
            status,
        };
        return newData;
    });

    const handleApplyFilter = () => {
        dispatch(fetchUserAttendance({ user_id: userId, year: parseInt(filterAcademicYear) }))
    }

    return (
        <div>
            <div className="attendancefilters">
                <h4 style={{margin:'auto 10px'}}>Filters:-</h4>
                {/* <Dropdown data={{ name: 'Class', options: classes, value: filterClass, setValue: setFilterClass}} /> */}
                <AcademicYearDropdown data={{academicYears, filterAcademicYear, setFilterAcademicYear}} />
                <button onClick={handleApplyFilter} className="academicsbtn">Apply</button>
            </div>
            <div className="attendancediv2">
                <div style={{flex:'0.65'}}>
                    <AttendanceTable data={attendanceTableData} />
                </div>
                <div className="attendancerightdiv">
                    <div className="attendancedetails">
                        <p style={{borderBottom:'1px solid #E3E3E3',padding:'8px 10px'}}>Total No. Of Days</p>
                        <h4 style={{padding:'0px 10px',paddingBottom:'8px'}}>{Object.keys(userAttendance).length}</h4>
                    </div>
                    <div className="attendancedetails">
                        <p style={{borderBottom:'1px solid #E3E3E3',padding:'8px 10px'}}>Total No. Of Days Present</p>
                        <h4 style={{padding:'0px 10px',paddingBottom:'8px'}}>{presentCount}</h4>
                    </div>
                    <div className="attendancedetails">
                        <p style={{borderBottom:'1px solid #E3E3E3',padding:'8px 10px'}}>No. Of Days Absent</p>
                        <h4 style={{padding:'0px 10px',paddingBottom:'8px'}}>{absentCount}</h4>
                    </div>
                    <div className="attendancedetails">
                        <p style={{borderBottom:'1px solid #E3E3E3',padding:'8px 10px'}}>No. Of Days Leave</p>
                        <h4 style={{padding:'0px 10px',paddingBottom:'8px'}}>{leaveCount}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AttendanceDetails
