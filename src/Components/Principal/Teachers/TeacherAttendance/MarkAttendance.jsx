import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { markUserAttendance } from "../../../../slices/attendance"


function MarkAttendance({ hideTable }) {
  const dispatch = useDispatch();
  const { subjectteachers } = useSelector((state) => state.subjectteacher);
  
  const [teachers, setTeachers] = useState([])
  const date = moment().format('DD-MM-YYYY')

  useEffect(() => {
    setTeachers(subjectteachers)
  }, [subjectteachers]);

  const handleAttendanceMarked = (id, remark) => {
    setTeachers((prev) => prev.map((teacher) => teacher.user_id === id ? { ...teacher, remark } : teacher))
  }

  const handleSubmit = () => {
    const attendanceList = teachers.map((teacher) => (
      {
        user_id: teacher.user_id,
        remark: teacher.remark === 'unmarked' ? 'p' : teacher.remark,
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
              <TableCell align="left" style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', paddingTop: '10px', paddingBottom: '5px' }}>S No.</TableCell>

              <TableCell align="left" style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', paddingTop: '10px', paddingBottom: '5px' }}>Teacher Name</TableCell>
              <TableCell align="left" style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', paddingTop: '10px', paddingBottom: '5px' }}>Date</TableCell>
              <TableCell align="left" style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', paddingTop: '10px', paddingBottom: '5px' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ height: 200 }} style={{ border: '1px solid #A5A5A5', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '5px', overflowY: 'auto' }}>
            {teachers.map((teacher, index) => (
              <TableRow
                key={teacher.user_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                style={{ padding: '0px 14px' }}
              >
                <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{index + 1}</TableCell>
                <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{`${teacher.details.firstname} ${teacher.details.lastname}`}</TableCell>
                <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{date}</TableCell>
                <TableCell align="left" style={{ fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>
                  <fieldset id={teacher.user_id} style={{ display: 'flex', justifyContent: 'space-evenly', border: 'none', padding: '0' }}>
                    <input type="radio" name={teacher.user_id} className="input1" onClick={() => handleAttendanceMarked(teacher.user_id, 'p')} defaultChecked={(teacher.remark === 'unmarked' ? true : false) || (teacher.remark === 'p' ? true : false)} />
                    <input type="radio" name={teacher.user_id} className="input2" onClick={() => handleAttendanceMarked(teacher.user_id, 'a')} defaultChecked={(teacher.remark === 'a' ? true : false)} />
                    <input type="radio" name={teacher.user_id} className="input3" onClick={() => handleAttendanceMarked(teacher.user_id, 'l')} defaultChecked={(teacher.remark === 'l' ? true : false)} />
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