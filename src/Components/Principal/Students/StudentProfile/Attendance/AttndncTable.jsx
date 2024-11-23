import React from 'react';
import './Attendance.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(sno, academicyear, academicclass, date, status) {
    return {sno, academicyear, academicclass, date, status};
  }
  
  const rows = [
    createData('1','2020-21','5 A', '01-01-2021',"P" ),
    createData('2','2020-21','5 A', '01-01-2021',"P" ),
    createData('4','2020-21','5 A', '01-01-2021',"AB" ),
    createData('5','2020-21','5 A', '01-01-2021',"P" ),
    createData('6','2020-21','5 A', '01-01-2021',"P" ),
  ];

function AttndncTable() {
    return (
        <div>
            <div style={{overflowX:'hidden',overflowY:'auto',height:'450px'}}>
                <TableContainer component={Paper} >
                    <Table aria-label="simple table" >
                        <TableHead>
                            <TableRow style={{padding: '10px 14px',height:'70px', border:'2px solid #A4A4A4', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)'}}>
                                <TableCell align="left" style={{fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px',  color: '#545454', borderBottom: 'none',paddingTop:'10px',paddingBottom:'5px' }}>Academic Year</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px',  color: '#545454', borderBottom: 'none',paddingTop:'10px',paddingBottom:'5px' }}>Class</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px',  color: '#545454', borderBottom: 'none',paddingTop:'10px',paddingBottom:'5px' }}>Date</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px',  color: '#545454', borderBottom: 'none',paddingTop:'10px',paddingBottom:'5px' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{border:'1px solid #A5A5A5',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius:'5px',overflowY:'auto'}}>
                            {rows.map((row) => (
                                <TableRow
                                key={row.sno}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={{padding:'0px 14px'}}
                                >
                                <TableCell align="left" style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000'}}>{row.academicyear}</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000'}}>{row.academicclass}</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000'}}>{row.date}</TableCell>
                                <TableCell align="left" style={{display:'flex', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000'}}>
                                        <button className={row.status === "P" ? " attendancebtn1" : "attendancebtn"}>P</button>
                                        <button className={row.status === "AB" ? "attendancebtn2" : "attendancebtn"}>AB</button>
                                        <button className={row.status === "L" ? "" : "attendancebtn"}>L</button>
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default AttndncTable
