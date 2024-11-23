import React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// function createData(sno, name,subject,tchrclass, status) {
//     return { sno, name,subject,tchrclass, status};
//   }
  
//   const rows = [
//     createData(1, 'Nikhil Kapoor', 'English','5A',88),
//     createData(2, 'Avni Gupta', 'Hindi','6B',70),
//     createData(3, 'Shailendra Sahani', 'Science','9D',69),
//     createData(4, 'Pragya Jaiswal', 'Mathematics','8C',59),
//     createData(5, 'Nikhil Kapoor', 'English','5A',32),
//     createData(6, 'Nikhil Kapoor', 'English','5A',25),
//     createData(7, 'Shailendra Sahani', 'Science','9D',69),
//     createData(8, 'Pragya Jaiswal', 'Mathematics','8C',59),
//     createData(9, 'Nikhil Kapoor', 'English','5A',32),
//   ];
  
function MonthlyAttendanceTable({rows, attendanceList}) {
  const attndcPercentage = (userId) => {
    const teacherAtt = attendanceList?.filter(att => userId === att.user_id)
    const present = teacherAtt?.filter(att => att.remark === 'p')
    let perc = 0
    if(present?.length > 0){
      perc = (present?.length/(teacherAtt?.length))*100
    }
    return Math.round(perc);
  }

    return (
        <div>
            <TableContainer style={{borderRadius:'10px',margin:'0',padding:'0 12px'}}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{fontWeight:'600',fontSize:'17px',paddingTop:'8px',paddingBottom:'8px'}}>Name</TableCell>
            <TableCell align="left" style={{fontWeight:'600',fontSize:'17px',paddingTop:'8px',paddingBottom:'8px'}}>Subject</TableCell>
            <TableCell align="left" style={{fontWeight:'600',fontSize:'17px',paddingTop:'8px',paddingBottom:'8px'}}>Class</TableCell>
            <TableCell align="left" style={{fontWeight:'600',fontSize:'17px',paddingTop:'8px',paddingBottom:'8px'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className="tbrow"
            >
              <TableCell  component="th" scope="row" style={{display:'flex',alignItems:'center',paddingTop:'9px',paddingBottom:'9px'}}>
              <Avatar style={{marginRight:'8px'}}/> {row.teachername}
              </TableCell>
              <TableCell align="left" style={{paddingTop:'6px',paddingBottom:'6px'}}>{row.subjectname}</TableCell>
              <TableCell align="left" style={{paddingTop:'6px',paddingBottom:'6px'}}>{row.classname}</TableCell>
              <TableCell align="left" style={{paddingTop:'6px',paddingBottom:'6px'}}><CircularProgressWithLabel variant="determinate" value={attndcPercentage(row.userid)} color={row.status >= 60 ? "success" : row.status < 60 && row.status > 33 ? "warning" : "error"}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}


function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex',height:'38px',width:'38px'}}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="black">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export function CircularStatic() {
  
  return <CircularProgressWithLabel/>;
}

export default MonthlyAttendanceTable
