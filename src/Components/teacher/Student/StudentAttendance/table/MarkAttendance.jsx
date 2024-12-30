import React, { useEffect, useState } from 'react';
import '../../StudentAttendanceInfo/AttendanceDetails.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { markUserAttendance } from "../../../../../slices/attendance"

function MarkAttendance({ hideTable }) {
    const dispatch = useDispatch();
    const { allStudentsOfClass } = useSelector(state => state.attendance);
    
    const [students, setStudents] = useState([])
    const date = moment().format('DD-MM-YYYY')

    useEffect(() => {
        setStudents(allStudentsOfClass)
    }, [allStudentsOfClass]);


    const handleAttendanceMarked = (id, remark) => {
        setStudents((prev) => prev.map((student) => student.user_id === id ? { ...student, remark } : student))
    }

    const handleSubmit = () => {
        const attendanceList = students.map((student) => (
            {
                user_id: student.user_id,
                remark: student.remark === 'unmarked' ? 'p' : student.remark,
            }
        ));
        dispatch(markUserAttendance(attendanceList))
        hideTable()
    }

    return (
        <div>
            <TableContainer component={Paper} style={{ height: '370px' }}>
                <Table aria-label="simple table" >
                    <TableHead>
                        <TableRow style={{ position: 'sticky', top: '0', padding: '10px 14px', height: '70px', border: '2px solid #A4A4A4', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)' }}>
                            <TableCell align="left" style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', paddingTop: '10px', paddingBottom: '5px' }}>Roll No.</TableCell>
                            <TableCell align="left" style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', paddingTop: '10px', paddingBottom: '5px' }}>Academic Year</TableCell>
                            <TableCell align="left" style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', paddingTop: '10px', paddingBottom: '5px' }}>Class</TableCell>
                            <TableCell align="left" style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', paddingTop: '10px', paddingBottom: '5px' }}>Student Name</TableCell>
                            <TableCell align="left" style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', paddingTop: '10px', paddingBottom: '5px' }}>Date</TableCell>
                            <TableCell align="left" style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', paddingTop: '10px', paddingBottom: '5px' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ height: 200 }} style={{ border: '1px solid #A5A5A5', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '5px', overflowY: 'auto' }}>
                        {students.map((student) => (
                            <TableRow
                                key={student.user_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={{ padding: '0px 14px' }}
                            >
                                <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{student.rollno}</TableCell>
                                <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{`${student.year}-${(parseInt(student.year) % 100) + 1}`}</TableCell>
                                <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{student.classname}</TableCell>
                                <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{`${student.firstname} ${student.lastname}`}</TableCell>
                                <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{date}</TableCell>
                                <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>
                                    <fieldset id={student.user_id} style={{ display: 'flex', justifyContent: 'space-evenly', border: 'none', padding: '0' }}>
                                        <input type="radio" name={student.user_id} className="input1" onClick={() => handleAttendanceMarked(student.user_id, 'p')} defaultChecked={(student.remark === 'unmarked' ? true : false) || (student.remark === 'p' ? true : false)} />
                                        <input type="radio" name={student.user_id} className="input2" onClick={() => handleAttendanceMarked(student.user_id, 'a')} defaultChecked={(student.remark === 'a' ? true : false)} />
                                        <input type="radio" name={student.user_id} className="input3" onClick={() => handleAttendanceMarked(student.user_id, 'l')} defaultChecked={(student.remark === 'l' ? true : false)} />
                                    </fieldset>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ textAlign: 'right', margin: '30px 0px', width: '100%' }}>
                <button onClick={handleSubmit} style={{ fontSize: '16px', padding: '10px 30px', borderRadius: '5px', border: 'none', color: 'white', backgroundColor: '#214DF9' }}>Save & Close</button>
            </div>
        </div >
    )
}

export default MarkAttendance