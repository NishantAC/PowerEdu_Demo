import React, { useEffect, useState } from 'react';
import './Circulars.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import moment from 'moment';
import CircularModal from '../../Principal/Home/Circulars/CircularModal';
import CircularService from '../../../services/circular.service';

// function createData(sno, subject, date) {
//   return { sno, subject, date };
// }

// const rows = [
//   createData('1', 'Sports Day Celebration', '13-8-2021'),
//   createData('2', 'Sports Day Celebration', '13-8-2021'),
//   createData('3', 'Sports Day Celebration', '13-8-2021'),
//   createData('4', 'Sports Day Celebration', '13-8-2021'),
//   createData('5', 'Sports Day Celebration', '13-8-2021'),
//   createData('6', 'Sports Day Celebration', '13-8-2021'),
//   createData('7', 'Sports Day Celebration', '13-8-2021'),
//   createData('8', 'Sports Day Celebration', '13-8-2021'),
//   createData('9', 'Sports Day Celebration', '13-8-2021'),
// ];

function Circulars() {
  const {user} = useSelector(state => state.user)
  const [rows, setRows] = useState([])
  const [selectedRow, setselectedRow] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = (row) => {
    setOpen(true);
    setselectedRow(row)
    
}
  const handleClose = () => setOpen(false);

    useEffect(() => {
      CircularService.getCirculars(user?.school_id).then(res => {
        setRows(res)
        
      })
      
    }, [user])

    // const sortedRows = [...rows].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <div className="prncplcircular">
      <div style={{ backgroundColor: "#F9F9F9", height: "50px", alignItems: "center", width: "100%", position: "sticky", top: 0, zIndex: 1 }}>
        <div className="prncplcircularheader">
          <span style={{ fontFamily: "sans-serif", fontStyle: "normal", fontWeight: "600", fontSize: "20px" }}>Circulars</span>
          {/* <button><AddCircularModal setRows={setRows}/></button> */}
        </div>
      </div>
      <div className="prncplcircular-body">
        <TableContainer style={{ borderRadius: '10px', margin: '0', padding: '10px 12px' }}>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: '600', fontSize: '17px', paddingTop: '0px', paddingBottom: '7px' }}>Subject</TableCell>
                <TableCell align="left" style={{ fontWeight: '600', fontSize: '17px', paddingTop: '0px', paddingBottom: '7px' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.sort((a, b) => new Date(b.date) - new Date(a.date))?.map((row, index) => (
                <TableRow onClick={()=>handleOpen(row)}
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className="tbrow"
                  style={{cursor:"pointer"}}
                >
                  <TableCell component="th" scope="row" style={{ display: 'flex', alignItems: 'center', paddingTop: '25px', paddingBottom: '25px' }}>
                    {row.title}
                  </TableCell>
                  <TableCell align="left" style={{ paddingTop: '14px', paddingBottom: '14px' }}>{moment(row.date).format('DD-MM-YYYY')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
{ selectedRow && <CircularModal row={selectedRow} open={open} handleClose={handleClose} />
}    </div>
  )
}

export default Circulars;
