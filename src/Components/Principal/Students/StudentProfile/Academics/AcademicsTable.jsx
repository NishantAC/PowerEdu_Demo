import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

function AcademicsTable({ examdetails }) {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <TableContainer component={Paper} style={{ overflowX: 'hidden', overflowY: 'auto', height: '385px' }}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ paddingLeft: '10px', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', border: '2px solid #A4A4A4', boxSizing: 'border-box', borderRadius: '5px' }}>
                                <TableCell style={{ paddingTop: '18px', paddingBottom: '18px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '18px', color: '#545454', borderWidth: '2px 0 2px 2px', borderStyle: 'solid', borderColor: '#A4A4A4', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', textAlign: 'left' }}>S no.</TableCell>
                                <TableCell align="left" style={{ paddingTop: '18px', paddingBottom: '18px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '18px', color: '#545454', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', borderWidth: '2px 0', borderStyle: 'solid', borderColor: '#A4A4A4' }}>Academic Year</TableCell>
                                <TableCell align="left" style={{ paddingTop: '18px', paddingBottom: '18px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '18px', color: '#545454', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', borderWidth: '2px 0', borderStyle: 'solid', borderColor: '#A4A4A4' }}>Class</TableCell>
                                <TableCell align="left" style={{ paddingTop: '18px', paddingBottom: '18px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '18px', color: '#545454', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', borderWidth: '2px 0', borderStyle: 'solid', borderColor: '#A4A4A4' }}>Exam Type</TableCell>
                                <TableCell align="left" style={{ paddingTop: '18px', paddingBottom: '18px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '18px', color: '#545454', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', borderWidth: '2px 0', borderStyle: 'solid', borderColor: '#A4A4A4' }}>Subject</TableCell>
                                <TableCell align="left" style={{ paddingTop: '18px', paddingBottom: '18px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '18px', color: '#545454', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', borderWidth: '2px 2px 2px 0', borderStyle: 'solid', borderColor: '#A4A4A4' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ border: '1px solid #A5A5A5', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '5px', overflowY: 'auto' }}>
                            {examdetails.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    style={{ padding: '0px 14px' }}
                                >
                                    <TableCell style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000', textAlign: 'left', paddingTop: '22px' }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{row.academicyear}</TableCell>
                                    <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{row.classname}</TableCell>
                                    <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{row.examtype}</TableCell>
                                    <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{row.subject}</TableCell>
                                    <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', color: '#000000', paddingTop: '0px', paddingBottom: '0px' }}>
                                        <button onClick={() => navigate('/principal/student-marks', { state: { exam: row } })} style={{ backgroundColor: '#9F8FFF', color: 'white', border: 'none', padding: '8px 12px' }}>
                                            View Marks
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default AcademicsTable;
