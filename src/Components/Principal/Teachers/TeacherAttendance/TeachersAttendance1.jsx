import React,{useState} from 'react';
import './TeachersAttendance.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import styles from './TeachersAttendance.module.css'
import { Button } from '@mui/material';

function createData( sno, academicyear, studentclass,admissionNo, rollno, name) {
    return {  sno, academicyear,studentclass,admissionNo, rollno, name};
  }
  
  const rows = [
    createData('1.', '2020-21', '5 A','51178','01','Anvi Saxena'),
    createData('2.', '2020-21', '5 A','51178','02','Anvi Saxena'),
    createData('3.', '2020-21', '5 A','51178','03','Anvi Saxena'),
    createData('4.', '2020-21', '5 A','51178','04','Anvi Saxena'),
    createData('5.', '2020-21', '5 A','51178','05','Anvi Saxena'),
    createData('6.', '2020-21', '5 A','51178','06','Anvi Saxena'),
    createData('7.', '2020-21', '5 A','51178','07','Anvi Saxena'),
    createData('8.', '2020-21', '5 A','51178','08','Anvi Saxena'),
  ];


function TeachersAttendance() {
    const [markAttendance, setMarkAttendance] = useState(false);
    const showMarkAttendance = () => setMarkAttendance(true);
    const hideMarkAttendance= () => setMarkAttendance(false);
    return (
        <div>
            <div className="prncplstdnt">
            <div style={{display:'flex'}}>
            <p style={{ fontfamily: "Roboto",fontStyle: "normal",fontWeight: "normal",fontSize: "14px",lineHeight: "21px",color: "#4D4D4D",}}>
                Home{" "}&gt;
                <b>
                {" "}
                <u>Teacher Attendance</u>
                </b>
            </p>
            {/* {markAttendance? <button onClick={hideMarkAttendance} className="tchrattendancebackbtn"><KeyboardBackspaceIcon style={{verticalAlign:'middle'}}/>Back</button> : ""} */}
            {markAttendance && <Button className="prncplprofilebackbtn" color='inherit' onClick={hideOverall} style={{marginTop:'20px', marginRight: '10px'}} ><KeyboardBackspaceIcon style={{verticalAlign:'middle', marginRight: '2px'}}/>Back</Button> }
            </div>
            <h3 style={{marginTop:'40px'}}>Teacher Attendance</h3>
            <br/>
            <div style={{display:'flex'}}>
            <p style={{fontFamily: "Rubik",fontStyle: "normal",fontWeight: "600",fontSize: "20px",color: "#000000",marginTop:'auto',marginBottom:'auto'}}>
                Filters:-
            </p>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <select style={{borderRadius:'5px', fontSize:'17px',padding:'6px 10px',color:'#414141'}}>
                <option value="" hidden>Class</option>
                <option>5A</option>
                <option>6A</option>
                <option>7A</option>
                <option>8A</option>
            </select>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <select style={{borderRadius:'5px', fontSize:'17px',padding:'6px 10px',color:'#414141'}}>
                <option value="" hidden>Subject</option>
                <option>Science</option>
                <option>Mathematics</option>
            </select>
            <button className="applybtnprncpl">Apply</button>
            {!markAttendance ? <button className="markattendancetchr" onClick={showMarkAttendance}>Mark Daily Attendance</button> : ""}
            </div>
            <div style={{marginTop:'30px'}}>
            {!markAttendance ? 
            <>
            <TableContainer component={Paper} style={{ maxHeight: '370px', overflowY: 'auto' }}>
              <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table" >
                    <TableHead>
                    <TableRow className={styles.row}>
                        <TableCell className={styles.tabCell}>S no.</TableCell>
                        <TableCell align="left" className={styles.tabCell}>Academic Year</TableCell>
                        <TableCell align="left" className={styles.tabCell}>Class</TableCell>
                        <TableCell align="left" className={styles.tabCell}>Admission No.</TableCell>
                        <TableCell align="left" className={styles.tabCell}>Roll No.</TableCell>
                        <TableCell align="left" className={styles.tabCell}>Student Name</TableCell>
                        <TableCell align="left" className={styles.tabCell}>Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody className={styles.tbody}>
                    {rows.map((row) => (
                        <TableRow
                        key={row.sno}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        style={{paddingLeft:'10px'}}
                        >
                        <TableCell className={styles.tabCell}>
                            {row.sno}
                        </TableCell>
                        <TableCell align="left" className={styles.tabCell}>{row.academicyear}</TableCell>
                        <TableCell align="left" className={styles.tabCell}>{row.studentclass}</TableCell>
                        <TableCell align="left" className={styles.tabCell}>{row.admissionNo}</TableCell>
                        <TableCell align="left" className={styles.tabCell}>{row.rollno}</TableCell>
                        <TableCell align="left" className={styles.tabCell}>{row.name}</TableCell>
                        <TableCell align="left" style={{paddingTop:'15px',paddingBottom:'15px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000',margin:'auto'}}>
                            <button type="submit" className="tchrviewoverallbtn">View Overall</button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </> : 
            <>
            <TableContainer component={Paper} style={{ maxHeight: '370px', overflowY: 'auto' }}>
              <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table" >
                        <TableHead>
                        <TableRow style={{paddingLeft:'10px',background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)',border: '2px solid #A4A4A4',boxSizing: 'border-box',borderRadius: '5px'}}>
                            <TableCell style={{paddingTop:'18px',paddingBottom:'18px',fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '18px', color: '#545454', borderBottom: 'none', textAlign:'left'}}>S no.</TableCell>
                            <TableCell align="left" className={styles.tabCell}>Academic Year</TableCell>
                            <TableCell align="left" className={styles.tabCell}>Class</TableCell>
                            <TableCell align="left" className={styles.tabCell}>Admission No.</TableCell>
                            <TableCell align="left" className={styles.tabCell}>Roll No.</TableCell>
                            <TableCell align="left" className={styles.tabCell}>Student Name</TableCell>
                            <TableCell align="left" className={styles.tabCell}>Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody sx={{height:200}} style={{border:'1px solid #A5A5A5',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius:'5px',overflowY:'auto'}}>
                            {rows.map((row) => (
                                <TableRow
                                key={row.rollno}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={{padding:'0px 14px'}}
                                >
                               <TableCell className={styles.tabCell}>
                                    {row.sno}
                                </TableCell>
                                <TableCell align="left" className={styles.tabCell}>{row.academicyear}</TableCell>
                                <TableCell align="left" className={styles.tabCell}>{row.studentclass}</TableCell>
                                <TableCell align="left" className={styles.tabCell}>{row.admissionNo}</TableCell>
                                <TableCell align="left" className={styles.tabCell}>{row.rollno}</TableCell>
                                <TableCell align="left" className={styles.tabCell}>{row.name}</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000'}}>                        
                                    <fieldset id={row.rollno} style={{paddingTop:'5px',paddingBottom:'5px',border:'none',padding:'0',display:'flex'}}>
                                        <input type="radio" name={row.rollno} className="input1"/>
                                        <input type="radio" name={row.rollno} className="input2"/>
                                        <input type="radio" name={row.rollno} className="input3"/>
                                    </fieldset>
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
            }
            </div>
        </div>
            
        </div>
    )
}

export default TeachersAttendance
