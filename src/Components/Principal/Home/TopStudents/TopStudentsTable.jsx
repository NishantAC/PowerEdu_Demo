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
import { Link } from 'react-router-dom';
import { lineHeight } from '@mui/system';



function TopstudentsTable({ students, schoolClass }) {

  return (
    <div>
      <TableContainer style={{ borderRadius: '10px', margin: '0', padding: '0 12px' }}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ fontWeight: '600', fontSize: '17px', paddingTop: '8px', paddingBottom: '8px' }}>Name</TableCell>
              <TableCell align="left" style={{ fontWeight: '600', fontSize: '17px', paddingTop: '8px', paddingBottom: '8px' }}>Class</TableCell>
              <TableCell align="left" style={{ fontWeight: '600', fontSize: '17px', paddingTop: '8px', paddingBottom: '8px' }}>Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row) => (
              <TableRow
                key={row.user_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="tbrow"
              >

                <TableCell component="th" scope="row" style={{ display: 'flex', alignItems: 'center', paddingTop: '48px', paddingBottom: '35px' }}>
                  <Avatar style={{ marginRight: '8px' }} />
                  <Link
                    to={{
                      pathname: '/principal/student-profile',
                      overall: true,
                      fromhome: true,
                      tab: 1,
                      userId: row.user_id
                    }}
                    style={{ textDecoration: 'none', color: 'inherit',lineHeight:"0",marginTop:"12px" }}
                    defaultValue={2}
                  ><p>{row.name}</p></Link>

                </TableCell>
                <TableCell align="left" style={{ paddingTop: '6px', paddingBottom: '6px' }}>{schoolClass}</TableCell>
                <TableCell align="left" style={{ paddingTop: '6px', paddingBottom: '6px' }}><CircularProgressWithLabel variant="determinate" value={row.percentage} color={row.percentage >= 60 ? "success" : row.percentage < 60 && row.percentage > 33 ? "warning" : "error"} /></TableCell>
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
    <Box sx={{ position: 'relative', display: 'inline-flex', height: '38px', width: '38px' }}>
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

  return <CircularProgressWithLabel />;
}

export default TopstudentsTable
