import React, { useEffect } from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './ExamDropdownMenu.module.css';
import moment from 'moment';

function ExamDropdownMenu(props) {
  // Sort exams array by date in ascending order
  const sortedExams = [...props?.exams].sort(
    (a, b) => new Date(b.exam_date) - new Date(a.exam_date)
  );
  return (
    <div className={styles.main}>
      <TableContainer style={{ maxHeight: '297px', overflowY: 'auto' }}>
        <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={styles.cell}>S. No.</TableCell>
              <TableCell className={styles.cell} >Subject</TableCell>
              <TableCell className={styles.cell} align="left" >Syllabus</TableCell>
              <TableCell className={styles.cell} align="left" >Exam Date</TableCell>
              <TableCell className={styles.cell} align="left" >Total Marks</TableCell>
              <TableCell className={styles.cell} align="left" >Your Marks</TableCell>
              <TableCell className={styles.cell} align="left" >Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={styles.Tbody}>
            {sortedExams?.map((row, ind) => (
              <TableRow
                key={ind}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className={styles.row}
              >
                <TableCell className={styles.bcell} component="th" scope="row">
                  {ind + 1}
                </TableCell>
                <TableCell className={styles.bcell} component="th" scope="row">
                  {row?.subject_name}
                </TableCell>
                <TableCell className={styles.syll} align="left">
                  {
                    // `maths,science,social,telugu,hindi`.split(",").map(sy => {
                    row?.syllabus.map(sy => {
                      return (
                        <p className={styles.Slayout}>{sy}</p>
                      )
                    })
                  }
                </TableCell>
                <TableCell className={styles.bcell} align="left" >
                  {moment(new Date(row?.exam_date)).format('DD/MM/YYYY')}
                  {/* {row?.exam_date} */}
                  </TableCell>
                <TableCell className={styles.bcell} align="left" >{row?.total_marks}</TableCell>
                <TableCell className={styles.bcell} align="left">{(row?.obtained_marks) ? row.obtained_marks : "---"}</TableCell>
                <TableCell className={styles.bcell} align="left">{(row?.grade) ? row?.grade : "---"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ExamDropdownMenu
