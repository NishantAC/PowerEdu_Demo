import React, { useEffect, useState } from 'react';
import './Attendance.css'
import ClassDropdown from '../Academics/ClassDropdown';
import ExamTypeDropdown from '../Academics/ExamTypeDropdown';
import SubjectDropdown from '../Academics/SubjectDropdown';
import AttndncTable from './AttndncTable';
import { fetchStudentsAcedemicYears, fetchUserAttendance } from '../../../../../slices/attendance';
import { useDispatch, useSelector } from 'react-redux';
import AcademicYearDropdown from '../../../../Teacher/Student/StudentAcademics/AcademicYearDropdown';
import AttendanceTable from '../../../../Teacher/Student/StudentAttendanceInfo/AttendanceTable';


const getAcademicYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (currentMonth > 6) return currentYear;
    else return currentYear - 1;
};

function Attendance({ UserId }) {

    const dispatch = useDispatch();
    const { userAttendance, studentsAcademicYears } = useSelector((state) => state.attendance);
    const [filterAcademicYear, setFilterAcademicYear] = useState(getAcademicYear())
    const academicYears = Object.keys(studentsAcademicYears);

    useEffect(() => {
        dispatch(fetchUserAttendance({ user_id: UserId, year: parseInt(filterAcademicYear) }))
        dispatch(fetchStudentsAcedemicYears({ user_id: UserId }))
    }, [UserId])


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
        dispatch(fetchUserAttendance({ user_id: UserId, year: parseInt(filterAcademicYear) }))
    }

    return (
        <div>
            <div className="prncplattendancefilters">
                <h4 style={{ margin: 'auto 10px' }}>Filters:-</h4>
                <AcademicYearDropdown data={{ academicYears, filterAcademicYear, setFilterAcademicYear }} />

                <button onClick={handleApplyFilter} className="academicsapplybtn">Apply</button>
            </div>
            <div className="prncplattendancediv2">
                <div className="prncplattendanceleftdiv">
                    <AttendanceTable data={attendanceTableData} />
                </div>
                <div className="prncplattendancerightdiv">
                    <div className="prncplattendancedetails">
                        <p style={{ borderBottom: '1px solid #E3E3E3', padding: '8px 10px' }}>Total No. Of Days</p>
                        <h4 style={{ padding: '0px 10px', paddingBottom: '8px' }}>{Object.keys(userAttendance).length}</h4>
                    </div>
                    <div className="prncplattendancedetails">
                        <p style={{ borderBottom: '1px solid #E3E3E3', padding: '8px 10px' }}>Total No. Of Days Present</p>
                        <h4 style={{ padding: '0px 10px', paddingBottom: '8px' }}>{presentCount}</h4>
                    </div>
                    <div className="prncplattendancedetails">
                        <p style={{ borderBottom: '1px solid #E3E3E3', padding: '8px 10px' }}>No. Of Days Absent</p>
                        <h4 style={{ padding: '0px 10px', paddingBottom: '8px' }}>{absentCount}</h4>
                    </div>
                    <div className="prncplattendancedetails">
                        <p style={{ borderBottom: '1px solid #E3E3E3', padding: '8px 10px' }}>No. Of Days Leave</p>
                        <h4 style={{ padding: '0px 10px', paddingBottom: '8px' }}>{leaveCount}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Attendance
