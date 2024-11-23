import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ChapterDescription from './ChapterDescription';
// import styles from '../StudentSubject.module.css';
import styles from '../TeacherSubject.module.css';
import { Typography } from '@mui/material';
import Status from './status';

const BasicTable = ({ chapters, classDropdownValue, getAssignedSubjects }) => {
  const [selected, setSelected] = useState('');
  const [chapterDesc, setChapterDesc] = useState({});

  //after click send detail to right side div
  const showChapterDesc = (chapter) => {
    if (selected === chapter.chapter_number) {
      setSelected('');
    } else {
      setSelected(chapter.chapter_number);
      setChapterDesc({
        chapter_id: chapter.chapter_id,
        chapter_number: chapter.chapter_number,
        notes: chapter.chapter_notes,
        links: chapter.chapter_links
      });
    }
  };

  //set color according to status
  const getStatusStyle = (status) => {
    if (status === 'Ongoing') {
      return { background: '#CAD5FF' };
    } else if (status === 'Completed') {
      return { background: '#C2FFB8' };
    } else {
      return { background: '#FFBBBE' };
    }
  };

  return (
    <div className={styles.basictable}>

      <div className={styles.div1}>
        <TableContainer component={Paper} className={styles.tablecon}>
          <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead className={styles.stickyheader}>
              <TableRow>
                <TableCell className={styles.cell}>S.No.</TableCell>
                <TableCell className={styles.cell}>Chapter name</TableCell>
                <TableCell className={styles.cell}>Status</TableCell>
                <TableCell className={styles.cell}>Extras</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chapters.map((row, index) => (
                <TableRow
                  key={index + 1}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className={styles.tbrow}
                >
                  <TableCell className={styles.cell2} component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell className={styles.cell2}>
                    <Typography className={styles.typography}>{`Chapter ${row.chapter_number}`}</Typography>
                  </TableCell>
                  {/* {console.table(chapters)} */}
                  <TableCell align="center" className={styles.DTcell3} >
                    <Status classDropdownValue={classDropdownValue} chapter={row} getAssignedSubjects={getAssignedSubjects} />
                    <p
                      className={styles.tbstatus}
                      style={getStatusStyle(row.status)}
                    >
                      {row.status === "nill" ? "To Be Started" : row.status}
                    </p>
                  </TableCell>
                  <TableCell>
                    <button className={
                      selected && selected === row.chapter_number ? styles.tbbtnclicked :
                        styles.tbbtn}
                      // style={{backgroundColor: selected ? '#6755D9' : '#ECECEC'}} 
                      onClick={() => showChapterDesc(row)}>
                      <VisibilityOutlinedIcon className={styles.visib} />
                      {/* { selected ? 'show' : 'hide'} */} View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className={selected ? styles.div2 : styles.div2else}>
        {selected ? (
          <ChapterDescription classDropdownValue={classDropdownValue} chapterDesc={chapterDesc} selected={selected} getAssignedSubjects={getAssignedSubjects}/>
        ) : (
          <h5 className={styles.div2h2}>Select a chapter to view additional resources</h5>
        )}
      </div>
    </div>
  );
};

export default BasicTable;
