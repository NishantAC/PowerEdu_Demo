import React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './ExamDropdownMenu.module.css'

function createData(subject, syllabus, examdate, totalmarks, yourmarks, grade) {
  return { subject, syllabus, examdate, totalmarks, yourmarks, grade };
}

const rows = [
  createData('Mathematics', 'Chapter 1', '20/8/2020', 100, 75, 'A'),
  createData('Science', 'Chapter 1', '20/8/2020', 100, 65, 'B'),
];
function ExamDDMYearly() {
  return (
    <div className={styles.main}>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={styles.cell}>Subject</TableCell>
              <TableCell align="left" className={styles.cell}>Syllabus</TableCell>
              <TableCell align="left" className={styles.cell}>Exam Date</TableCell>
              <TableCell align="left" className={styles.cell}>Total Marks</TableCell>
              <TableCell align="left" className={styles.cell}>Your Marks</TableCell>
              <TableCell align="left" className={styles.cell}>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.sno}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="tbrow"
              >
                <TableCell component="th" scope="row">
                  {row.subject}
                </TableCell>
                <TableCell className={styles.syll} align="left">
                  {
                    row?.syllabus.split(",").map(sy => {
                      return (
                        <p className={styles.Slayout}>{sy}</p>
                      )
                    })
                  }
                </TableCell>                <TableCell align="left">{row.examdate}</TableCell>
                <TableCell align="left">{row.totalmarks}</TableCell>
                <TableCell align="left">{row.yourmarks}</TableCell>
                <TableCell align="left">{row.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ExamDDMYearly
