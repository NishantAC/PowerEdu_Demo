import React, { useEffect } from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClassTestMarkService from '../../../../services/classtestmark.service';
import { useSelector } from 'react-redux';

import styles from '../ExamDropdown/ExamDropdownMenu.module.css';

function ClassTestDDMenu({classtestmark}) {
  // const [testMarks, setTestMarks] = useState([]);
  // const { user } = useSelector((state) => state.user);
  
  const sortedClassTests = [...classtestmark].sort(
    (a, b) => new Date(b.exam_date) - new Date(a.exam_date)
  );

  return (
    <div className={styles.main}>
      <TableContainer style={{ maxHeight: '297px', overflowY: 'auto' }}>
        <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={styles.cell}>S. No.</TableCell>
              <TableCell align="left" className={styles.cell}>Subject</TableCell>
              <TableCell align="left" className={styles.cell}>Syllabus</TableCell>
              <TableCell align="left" className={styles.cell}>Exam Date</TableCell>
              <TableCell align="left" className={styles.cell}>Total Marks</TableCell>
              <TableCell align="left" className={styles.cell}>Your Marks</TableCell>
              <TableCell align="left" className={styles.cell}>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedClassTests?.map((row, index) => (
              <TableRow
                key={index + 1}
                sx={{ '&:last-child td, &:last-child th': { border: 0} }}
                className={styles.row}
              >
                <TableCell className={styles.bcell} component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell className={styles.bcell} align="left" >{row?.subject_name}</TableCell>
                <TableCell className={styles.syll} align="left">
                  {
                    row?.syllabus.split(",").map(sy => {
                      return (
                        <p className={styles.Slayout}>{sy}</p>
                      )
                    })
                  }
                </TableCell>
                <TableCell className={styles.bcell} align="left" >{row?.exam_date}</TableCell>
                <TableCell className={styles.bcell} align="left" >{row?.total_marks}</TableCell>
                <TableCell className={styles.bcell} align="left">{(row?.obtained_marks) ? row?.obtained_marks : '---'}</TableCell>
                <TableCell className={styles.bcell} align="left">{(row?.grade) ? row?.grade : '---'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ClassTestDDMenu
