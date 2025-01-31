import React, { useEffect, useState } from 'react';
import TabAttendanceTable from './TabAttendanceTable';
import { fetchUserAttendance } from '../../../../../slices/attendance';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTeacherData } from '../../../../../slices/subjectteacher';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { selectThemeProperties } from '@/slices/theme';

function TabAttendance({ userId }) {
    const themeProperties = useSelector(selectThemeProperties);
    const [filterMonth, setFilterMonth] = React.useState('');
    const [filterYear, setFilterYear] = React.useState(parseInt(new Date().getFullYear()));
    const currentteacher = useSelector((state) => state.subjectteacher.currentteacher);

    const dispatch = useDispatch();
    const { userAttendance } = useSelector(state => state.attendance);

    useEffect(() => {
        dispatch(getCurrentTeacherData({ userId }));
    }, []);

    useEffect(() => {
        dispatch(fetchUserAttendance({ user_id: userId, year: filterYear, month: filterMonth, isTeacher: true }));
    }, [currentteacher]);

    const handleMonthChange = (value) => {
        setFilterMonth(value);
    };

    const handleYearChange = (value) => {
        const selectedYear = parseInt(value); // Convert selected value to a number
        setFilterYear(selectedYear);
    };

    const handleApplyFilter = () => {
        dispatch(fetchUserAttendance({ user_id: userId, year: filterYear, month: filterMonth, isTeacher: true }));
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

    const attendanceTableData = Object.entries(userAttendance).map(([date, status]) => {
        const formattedDate = date.split('/').join('-');
        const newData = {
            date: formattedDate,
            status,
        };
        return newData;
    });

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
        const initialYear = new Date(currentteacher?.doj || "").getFullYear();
        const years = [];
        for (let year = initialYear; year <= currentDate; year++) {
            years.push({ value: parseInt(year), label: year.toString() });
        }
        return years;
    };

    const yearOptions = getYearsArray();

    return (
        <div>
            <div className="prncpltchrattendancefilters">
                <h4 style={{ margin: 'auto 10px auto 0px' }}>Filters:-</h4>
                <Select onValueChange={handleMonthChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Months</SelectLabel>
                            {monthOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select onValueChange={handleYearChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Years</SelectLabel>
                            {yearOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <button className="academicsapplybtn" type='button' onClick={handleApplyFilter}>Apply</button>
            </div>
            <div className="prncpltchrattendancediv2">
                <div className="prncpltchrattendanceleftdiv">
                    <TabAttendanceTable attendanceTableData={attendanceTableData} />
                </div>
                <div className="prncpltchrattendancerightdiv">
                    <div className="prncpltchrattendancedetails">
                        <p style={{ borderBottom: '1px solid #E3E3E3', padding: '8px 10px' }}>Total No. Of Days</p>
                        <h4 style={{ padding: '0px 10px', paddingBottom: '8px' }}>{Object.keys(userAttendance).length}</h4>
                    </div>
                    <div className="prncpltchrattendancedetails">
                        <p style={{ borderBottom: '1px solid #E3E3E3', padding: '8px 10px' }}>Total No. Of Days Present</p>
                        <h4 style={{ padding: '0px 10px', paddingBottom: '8px' }}>{presentCount}</h4>
                    </div>
                    <div className="prncpltchrattendancedetails">
                        <p style={{ borderBottom: '1px solid #E3E3E3', padding: '8px 10px' }}>No. Of Days Absent</p>
                        <h4 style={{ padding: '0px 10px', paddingBottom: '8px' }}>{absentCount}</h4>
                    </div>
                    <div className="prncpltchrattendancedetails">
                        <p style={{ borderBottom: '1px solid #E3E3E3', padding: '8px 10px' }}>No. Of Days Leave</p>
                        <h4 style={{ padding: '0px 10px', paddingBottom: '8px' }}>{leaveCount}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabAttendance;
