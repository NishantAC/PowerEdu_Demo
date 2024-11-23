import React, { useEffect } from 'react';
import './TabAttendance.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAttendance } from '../../../../../slices/attendance';


function TabAttendanceTable({ attendanceTableData }) {
  // const dispatch = useDispatch()
  const { profile } = useSelector(state => state.principal)
  // const {userAttendance} = useSelector(state => state.attendance)
  // useEffect(() => {
  //   dispatch(fetchUserAttendance({userId: profile.id}))
  // }, [profile])
  return (
    <div>
      <TableContainer component={Paper} style={{ boxSizing: 'border-box', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '5px', maxHeight: '450px', overflowY: 'auto' }}>
        <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table" >
          <TableHead
            sx={{
              padding: '10px 14px',
              height: '70px',
              background:
                'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)',
              border: '2px solid #A4A4A4',
              boxSizing: 'border-box',
              borderRadius: '5px',
              '& th': {
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '20px',
                color: '#545454',
                borderLeft: 'none',
                borderRight: 'none',
                paddingTop: '10px',
                paddingBottom: '5px',
              },
            }}
          >
            <TableRow>

              <TableCell sx={{ background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', border: '2px solid #A4A4A4', }} align="left">Date</TableCell>
              <TableCell sx={{ background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', border: '2px solid #A4A4A4', borderRight: '2px solid #A4A4A4 !important' }} align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={Paper} sx={{ border: '1px solid #A5A5A5 !important', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '5px', overflowY: 'auto' }}>
            {attendanceTableData?.map((row, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                style={{ padding: '0px 14px' }}
              >
                <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{`${row.date}`}</TableCell>
                <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>
                  <button className={row.status === "p" ? " attendancebtn1" : "attendancebtn"}>P</button>
                  <button className={row.status === "a" ? "attendancebtn2" : "attendancebtn"}>AB</button>
                  <button className={row.status === "l" ? "attendancebtn3" : "attendancebtn"}>L</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TabAttendanceTable
