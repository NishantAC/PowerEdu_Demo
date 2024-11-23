import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

function StudentAttendanceTable() {
    const { allStudentsOfClass: students } = useSelector(state => state.attendance);
    const [Overall, setOverall] = useState(false);
    const showOverall = () => setOverall(true);
    const hideOverall = () => setOverall(false);

    return (
        <div>
            <TableContainer component={Paper} style={{ height: '370px' }}>
                <Table aria-label="simple table" >
                    <TableHead>
                        <TableRow style={{ position: 'sticky', top: '0', paddingLeft: '10px', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', border: '2px solid #A4A4A4', boxSizing: 'border-box', borderRadius: '5px' }}>
                            <TableCell style={{ paddingTop: '18px', paddingBottom: '18px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', textAlign: 'left' }}>S no.</TableCell>
                            <TableCell align="left" style={{ paddingTop: '18px', paddingBottom: '18px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none' }}>Academic Year</TableCell>
                            <TableCell align="left" style={{ paddingTop: '18px', paddingBottom: '18px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none' }}>Class</TableCell>
                            <TableCell align="left" style={{ paddingTop: '18px', paddingBottom: '18px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none' }}>Admission No.</TableCell>
                            <TableCell align="left" style={{ paddingTop: '18px', paddingBottom: '18px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none' }}>Roll No.</TableCell>
                            <TableCell align="left" style={{ paddingTop: '18px', paddingBottom: '18px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none' }}>Student Name</TableCell>
                            <TableCell align="left" style={{ paddingTop: '18px', paddingBottom: '18px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ background: '#FFFFFF', border: '1px solid #A5A5A5', boxSizing: 'border-box', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '5px' }}>
                        {students.map((student, index) => (
                            <TableRow
                                key={student.user_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={{ paddingLeft: '10px' }}
                            >
                                <TableCell style={{ paddingTop: '15px', paddingBottom: '15px', flex: '0.05', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '18px', color: '#000000', textAlign: 'left' }}>
                                    {++index}
                                </TableCell>
                                <TableCell align="left" style={{ paddingTop: '15px', paddingBottom: '15px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '18px', color: '#000000' }}>{`${student.year}-${(parseInt(student.year) % 100) + 1}`}</TableCell>
                                <TableCell align="left" style={{ paddingTop: '15px', paddingBottom: '15px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '18px', color: '#000000' }}>{student.classname}</TableCell>
                                <TableCell align="left" style={{ paddingTop: '15px', paddingBottom: '15px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '18px', color: '#000000' }}>{student.admissionno}</TableCell>
                                <TableCell align="left" style={{ paddingTop: '15px', paddingBottom: '15px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '18px', color: '#000000' }}>{student.rollno}</TableCell>
                                <TableCell align="left" style={{ paddingTop: '15px', paddingBottom: '15px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '18px', color: '#000000' }}>{`${student.firstname} ${student.lastname}`}</TableCell>
                                <TableCell align="left" style={{ paddingTop: '15px', paddingBottom: '15px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '18px', color: '#000000', margin: 'auto' }}>
                                    <Link
                                        to={{
                                            pathname: '/teacher/student-profile',
                                            overall: true,
                                            tab: 2,
                                            userId: student.user_id
                                        }}
                                        defaultValue={2}
                                    >
                                        <button type="submit" className="entermarksbtn" onClick={showOverall}>View Overall</button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default StudentAttendanceTable
