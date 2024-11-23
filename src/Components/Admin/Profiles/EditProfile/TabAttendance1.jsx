import React, { useEffect, useState } from 'react';
import './TabAttendance1.css'; // New CSS file for styling TabAttendance1
// import TabAttendanceTable from './TabAttendanceTable';
// import { fetchUserAttendance } from '../../../../../slices/attendance';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentStudentData } from '../../../../slices/student'; // Assuming it's for students
import { fetchUserAttendance } from '../../../../slices/attendance';
import TabAttendanceTable from '../../../Principal/Teachers/TeacherProfile/Attendance/TabAttendanceTable';

function TabAttendance1({ userId }) {
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState(new Date().getFullYear());
    const currentStudent = useSelector((state) => state.student.currentStudent); // Example state for student

    const dispatch = useDispatch();
    const { userAttendance } = useSelector(state => state.attendance);

    useEffect(() => {
        dispatch(getCurrentStudentData({ userId }));
    }, [dispatch, userId]);

    useEffect(() => {
        dispatch(fetchUserAttendance({ user_id: userId, year: filterYear, month: filterMonth, isTeacher: false }));
    }, [dispatch, userId, filterYear, filterMonth, currentStudent]);

    const handleMonthChange = (event) => {
        setFilterMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setFilterYear(parseInt(event.target.value));
    };

    const handleApplyFilter = () => {
        dispatch(fetchUserAttendance({ user_id: userId, year: filterYear, month: filterMonth, isTeacher: false }));
    };

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

    const attendanceTableData = Object.entries(userAttendance).map(([date, status]) => ({
        date: date.split('/').join('-'),
        status,
    }));

    const monthOptions = [
        { value: '', label: 'All Months' },
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    const getYearsArray = () => {
        const currentDate = new Date().getFullYear();
        const initialYear = new Date(currentStudent?.doj || "").getFullYear();
        const years = [];
        for (let year = initialYear; year <= currentDate; year++) {
            years.push({ value: year, label: year.toString() });
        }
        return years;
    };

    const yearOptions = getYearsArray();

    return (
        <div>
            <div className="attendance-filters">
                <h4>Filters:</h4>
                <select value={filterMonth} onChange={handleMonthChange} className="month-select">
                    {monthOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <select style={{width:"100px"}} value={filterYear} onChange={handleYearChange} className="year-select">
                    {yearOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <button className="apply-filter-button" onClick={handleApplyFilter}>Apply</button>
            </div>
            <div className="attendance-summary">
                <div className="attendance-table">
                    <TabAttendanceTable attendanceTableData={attendanceTableData} />
                </div>
                <div className="attendance-stats">
                    <div className="attendance-box">
                        <p>Total No. Of Days</p>
                        <h4>{Object.keys(userAttendance).length}</h4>
                    </div>
                    <div className="attendance-box">
                        <p>Total No. Of Days Present</p>
                        <h4>{presentCount}</h4>
                    </div>
                    <div  className="attendance-box">
                        <p>No. Of Days Absent</p>
                        <h4>{absentCount}</h4>
                    </div>
                    <div className="attendance-box">
                        <p>No. Of Days Leave</p>
                        <h4>{leaveCount}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TabAttendance1;
