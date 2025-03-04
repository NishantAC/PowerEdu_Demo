import React, { useEffect } from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './StudentMarksTable.module.css';
import moment from 'moment';
import { Button, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DownloadSheet from '../../../../Teacher/Exam/ClassTestMarks/table/DownloadSheet';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamMarks } from '../../../../../slices/exam';

function StudentMarksTable() {
  // Sort exams array by date in ascending order
  const navigate = useNavigate();
  const location = useLocation();
  const { exam } = location.state;
  const { studentmarks, studentProfile } = useSelector(state => state.exam);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchExamMarks({ examid: exam?.examid }));
  }, [exam]);

  return (
    <div className={styles.prncplstdnt}>
      <div>
        <p style={{ fontfamily: "Roboto", fontStyle: "normal", fontWeight: "normal", fontSize: "18px", lineHeight: "21px", color: "#4D4D4D", }}>
          Home{" "}&gt;
          <b>
            {" "}
            <u>Student Profile</u>
          </b>
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ marginTop: '40px' }}>Student's Marks</h3>
        <Button color='inherit' onClick={() => navigate('/principal/student-profile')} style={{ marginTop: '30px' }} ><KeyboardBackspaceOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '2px' }} />Back</Button>
      </div>
      <br />
      <div className={styles.main}>
        <TableContainer component={Paper} style={{ maxHeight: '397px', overflowY: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={styles.cell}>S. No.</TableCell>
                <TableCell className={styles.cell} >Subject</TableCell>
                <TableCell className={styles.cell} align="center" >Syllabus</TableCell>
                <TableCell className={styles.cell} align="center" >Exam Date</TableCell>
                <TableCell className={styles.cell} align="center" >Total Marks</TableCell>
                <TableCell className={styles.cell} align="center" >Student's Marks</TableCell>
                <TableCell className={styles.cell} align="center" >Student's Grade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={styles.Tbody}>
              {studentmarks?.filter(row => row.studentid === studentProfile?.userid).map((row, ind) => (
                <TableRow
                  key={ind}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className={styles.row}
                >
                  <TableCell className={styles.bcell} component="th" scope="row">
                    {ind + 1}
                  </TableCell>
                  <TableCell className={styles.bcell} component="th" scope="row">
                    {row?.subject}
                  </TableCell>
                  <TableCell className={styles.syll} align="left">
                    {
                      // `maths,science,social,telugu,hindi`.split(",").map(sy => {
                      row?.syllabus?.map(sy => {
                        return (
                          <p className={styles.Slayout}>{sy}</p>
                        )
                      })
                    }
                  </TableCell>
                  <TableCell className={styles.bcell} align="center" >
                    {moment(new Date(row?.examdate)).format('DD/MM/YYYY')}
                    {/* {row?.exam_date} */}
                  </TableCell>
                  <TableCell className={styles.bcell} align="center" >{row?.maxmarks}</TableCell>
                  <TableCell className={styles.bcell} align="center">{(row?.obtainedmarks) ? row.obtainedmarks : "---"}</TableCell>
                  <TableCell className={styles.bcell} align="center">{(row?.grade) ? row?.grade : "---"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={styles.footerbtn}>
        <Button variant='outlined' color='secondary' onClick={handleOpen}>
          <FileDownloadOutlinedIcon
            style={{ verticalAlign: "middle", marginRight: "5px" }}
          />
          Download
        </Button>
      </div>

      <DownloadSheet
        open={open}
        handleClose={handleClose}
        tableData={studentmarks}
      />
    </div>

  );
}

export default StudentMarksTable;
