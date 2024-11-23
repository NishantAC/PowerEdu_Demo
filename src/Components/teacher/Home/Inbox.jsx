import React from 'react';
import './Inbox.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(sno, from, subject, date, action) {
  return { sno, from, subject, date, action };
}

const rows = [
  createData('1', 'Ashutosh Gutpa', 'Updated Reports', '13-8-2021', 'Read'),
  createData('2', 'Rashika Bedi', 'Updated Reports', '13-8-2021', 'Un-read'),
  createData('3', 'Taman Mehra', 'Updated Reports', '13-8-2021', 'Read'),
  createData('4', 'Yuduf Nasir', 'Updated Reports', '13-8-2021', 'Reply'),
  createData('5', 'Yuduf Nasir', 'Updated Reports', '13-8-2021', 'Reply'),
  createData('6', 'Yuduf Nasir', 'Updated Reports', '13-8-2021', 'Reply'),
];

function Inbox() {
  let btnstyle = {
    width: '80px',
    border: 'none',
    borderRadius: '28px',
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    color: '#FFFFFF',
    padding: '8px 10px'
  }
  let btnstyle1 = {
    ...btnstyle,
    backgroundColor: '#849DFF',
  }
  let btnstyle2 = {
    ...btnstyle,
    backgroundColor: '#FF8F95',
  }
  let btnstyle3 = {
    ...btnstyle,
    backgroundColor: '#66ED51',
  }

  return (
    <div className="inbox">
      <div style={{ backgroundColor: "#F9F9F9", height: "50px", alignItems: "center", width: "100%", position: "sticky", top: 0, zIndex: 1 }}>
        <div className="inboxheader" >
          <span style={{ fontFamily: "sans-serif", fontStyle: "normal", fontWeight: "600", fontSize: "20px" }}>Inbox</span>
          <button>+</button>
        </div>
      </div>
      <div className="inbox-body" style={{ overflowY: 'auto', overflowX: 'hidden', padding: '0px 10px' }}>
        <TableContainer >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow style={{ padding: '0px 14px' }}>
                <TableCell style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', textAlign: 'left', paddingTop: '10px', paddingBottom: '5px' }}>From</TableCell>
                <TableCell align="left" style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', paddingTop: '10px', paddingBottom: '5px' }}>Subject</TableCell>
                <TableCell align="left" style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', paddingTop: '10px', paddingBottom: '5px' }}>Date</TableCell>
                <TableCell align="left" style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', paddingTop: '10px', paddingBottom: '5px' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.sno}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  style={{ padding: '0px 14px' }}
                >
                  <TableCell style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000', textAlign: 'left' }}>
                    {row.from}
                  </TableCell>
                  <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{row.subject}</TableCell>
                  <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{row.date}</TableCell>
                  <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', color: '#000000', paddingTop: '0px', paddingBottom: '0px' }}>
                    <button style={row.action === 'Read' ? btnstyle1 : row.action === "Un-read" ? btnstyle2 : btnstyle3}>{row.action}</button>
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

export default Inbox;
