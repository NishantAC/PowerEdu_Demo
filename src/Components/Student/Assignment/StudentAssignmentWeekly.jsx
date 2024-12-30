import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { stdFilteredAssignments } from '../../../slices/assignment';
import download from 'downloadjs';
import styles from './StudentAssignment.module.css';
import CommonService from '../../../services/common.service';
import { resetAssFilter } from '../../../slices/assigndropdown.slice';

export default function WeeklyTable() {
  let weektablestyle1 = {
    background: '#C2FFB8',
    borderRadius: '3px',
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '11px',
    lineHeight: '17px',
    color: '#000000',
    padding: '5px 10px'
  }
  let weektablestyle2 = {
    background: '#CAD5FF',
    borderRadius: '3px',
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '11px',
    lineHeight: '17px',
    color: '#000000',
    padding: '5px 10px'
  }
  let weektablestyle3 = {
    background: '#FFBBBE',
    borderRadius: '3px',
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '11px',
    lineHeight: '17px',
    color: '#000000',
    padding: '5px 10px'
  }

  //holds filters
  const dropDown = useSelector((state) => state.assignDropDown);
  //holds data
  const { classAssignment: assignments, filterAssignment: filteredAss } = useSelector((state) => state.assignment);
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      let stdAssignment = [...assignments];
      if (dropDown?.subject !== "") {
        stdAssignment = stdAssignment.filter(st => String(st.subjectname) === String(dropDown.subject));
      }
      if (dropDown?.assdate !== "") {
        stdAssignment = stdAssignment.filter(st => String(st.assigndate) === String(dropDown.assdate));
      }
      if (dropDown?.duedate !== "") {
        stdAssignment = stdAssignment.filter(st => String(st.duedate) === String(dropDown.duedate));
      }
      if (dropDown?.weekly === true) {
        let now = new Date();
        let beforeWeek = new Date(now.getTime());
        beforeWeek.setDate(now.getDate() + 7);
        stdAssignment = stdAssignment.filter(ass => {
          let dueDate = new Date(String(ass.duedate));
          if (dueDate >= now && dueDate <= beforeWeek) {
            return ass;
          }
        })
      }
      if (dropDown?.monthly === true) {
        let now = new Date();
        let beforeMonth = new Date(now.getTime());
        beforeMonth.setDate(now.getDate() + 30);
        let beforeWeek = new Date(now.getTime());
        beforeWeek.setDate(now.getDate() + 7);
        
        stdAssignment = stdAssignment.filter(ass => {
          let dueDate = new Date(String(ass.duedate));
          if (dueDate >= beforeWeek && dueDate <= beforeMonth) {
            return ass;
          }
        })
      }
      dispatch(stdFilteredAssignments(stdAssignment));
    } else {
      firstRender.current = false;
    }
  }, [dropDown]);


  //download the assignment using file path
  const downloadAssignment = async (filePath) => {
    try {
      // 
      //chaned filepath to key
      const file = await CommonService.downloadFileByPath({ "key": filePath });
      CommonService.downloadFileByBytes(file, filePath);
    } catch (err) {
      console.error("Problem in StudentAssignmentWeekly.js :: downloadAssignment() => ", err);
    }
  }
  { 

  return (

    <TableContainer style={{ maxHeight: '297px', overflowY: 'auto' }}>
      <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table" >
        <TableHead>
          <TableRow className={styles.row}>
            <TableCell className={styles.tabCell}>S no.</TableCell>
            <TableCell className={styles.tabCell}>Subject</TableCell>
            <TableCell className={styles.tabCell}>Assigned Date</TableCell>
            <TableCell className={styles.tabCell}>Due Date</TableCell>
            <TableCell className={styles.tabCell}>Assignment Info</TableCell>
            <TableCell className={styles.tabCell}>Action</TableCell>
            <TableCell className={styles.tabCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={styles.tbody}>
          {filteredAss?.map((row, index) => (
            <TableRow className={styles.row}
              key={index + 1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell className={styles.cell2} style={{ flex: '0.05' }}>
                {index + 1}.
              </TableCell>
              <TableCell className={styles.cell2}>{row.subjectname}</TableCell>
              <TableCell className={styles.cell2}>{row.assigndate}</TableCell>
              <TableCell className={styles.cell2}>{row.duedate}</TableCell>
              <TableCell className={styles.cell2} style={{ fontSize: '14px', maxWidth: '25%', wordWrap: 'word-break' }}>{row.title}</TableCell>
              <TableCell className={styles.cell2}>
                <button onClick={() => downloadAssignment(row.action)}>Download</button>
              </TableCell>
              <TableCell className={styles.cell3}>
                <span style={row.status === "Submitted" ? weektablestyle1 : row.status === "Not Submitted" ? weektablestyle2 : weektablestyle3}>{(row?.status) ? row?.status : "To be submitted"}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
}

