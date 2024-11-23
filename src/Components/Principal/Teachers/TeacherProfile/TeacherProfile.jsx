import React,{useEffect, useState} from 'react';
import './TeacherProfile.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import TabProfile from './TabProfile';
import TabAttendance from './Attendance/TabAttendance';
import TabFeedback from './Feedback/TabFeedback';
import { Button } from '@mui/material';
import moment from 'moment';
import SubjectTeacherService from "../../../../services/subjectteacher.service"
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachersProfile, setProfile } from '../../../../slices/principal';
import TeacherClasses from './TeacherClasses';
import authService from '../../../../services/auth.service';

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
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
function TeacherProfile() {
    const [Overall, setOverall] = useState(false);
    const showOverall = () => setOverall(true);
    const hideOverall= () => setOverall(false);

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {setValue(newValue);};
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const {teachers, profile, classes, subjects} = useSelector(state => state.principal)

    useEffect(() => {
      dispatch(fetchTeachersProfile({schoolcode: user?.schoolcode}))
    }, [user])
  
    return (
        <>
            {!Overall ? 
            <>
                <div className="prncplstdnt">
            <div>
            <p style={{ fontfamily: "Roboto",fontStyle: "normal",fontWeight: "normal",fontSize: "14px",lineHeight: "21px",color: "#4D4D4D",}}>
                Home{" "}&gt;
                <b>
                {" "}
                <u>Teacher Profile</u>
                </b>
            </p>
            </div>
            <h3 style={{marginTop:'40px'}}>Teacher Profile</h3>
            <br/>
            <div style={{display:'flex'}}>
            <p style={{fontFamily: "Rubik",fontStyle: "normal",fontWeight: "600",fontSize: "20px",color: "#000000",marginTop:'auto',marginBottom:'auto'}}>
                Filters:-
            </p>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <select style={{borderRadius:'5px', fontSize:'17px',padding:'6px 10px',color:'#414141'}}>
                <option value="" hidden>Class</option>
                {classes?.map(c => <option key={c.id} value={c.classname}>{c.classname}</option>)}
            </select>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <select style={{borderRadius:'5px', fontSize:'17px',padding:'6px 10px',color:'#414141'}}>
                <option value="" hidden>Subject</option>
                {subjects?.map(s => <option key={s.id} value={s.subjectname}>{s.subjectname}</option>)}
            </select>
            <button className="applybtnprncpl">Apply</button>
            </div>
            <div style={{marginTop:'30px'}}>
            <TableContainer component={Paper} style={{boxSizing: 'border-box',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '5px', maxHeight: '370px', overflowY: 'auto' }}>
              <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table" >
                    <TableHead>
                    <TableRow style={{paddingLeft:'10px',background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)',border: '2px solid #A4A4A4',boxSizing: 'border-box',borderRadius: '5px'}}>
                        <TableCell style={{paddingTop:'18px',paddingBottom:'18px',fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '16px', color: '#545454', borderWidth: '2px 0 2px 2px', borderStyle: 'solid', borderColor: '#A4A4A4', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', textAlign:'left',}}>S no.</TableCell>
                        <TableCell align="left" style={{paddingTop:'18px',paddingBottom:'18px',fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '16px',  color: '#545454',  background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', borderWidth: '2px 0', borderStyle: 'solid', borderColor: '#A4A4A4', }}>Date Of Joining</TableCell>
                        <TableCell align="left" style={{paddingTop:'18px',paddingBottom:'18px',fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '16px',  color: '#545454', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', borderWidth: '2px 0', borderStyle: 'solid', borderColor: '#A4A4A4', }}>Teacher ID</TableCell>
                        <TableCell align="left" style={{paddingTop:'18px',paddingBottom:'18px',fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '16px',  color: '#545454', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', borderWidth: '2px 0', borderStyle: 'solid', borderColor: '#A4A4A4', }}>Classes Assigned</TableCell>
                        <TableCell align="left" style={{paddingTop:'18px',paddingBottom:'18px',fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '16px',  color: '#545454', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', borderWidth: '2px 0', borderStyle: 'solid', borderColor: '#A4A4A4', }}>Teacher Name</TableCell>
                        <TableCell align="left" style={{paddingTop:'18px',paddingBottom:'18px',fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '16px',  color: '#545454', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', borderWidth: '2px 2px 2px 0', borderStyle: 'solid', borderColor: '#A4A4A4', }}>Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody style={{background: '#FFFFFF',border: '1px solid #A5A5A5 !important',boxSizing: 'border-box',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius: '5px'}}>
                    {teachers.map((row, index) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        style={{paddingLeft:'10px'}}
                        >
                        <TableCell style={{paddingTop:'15px',paddingBottom:'15px',flex:'0.05', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000', textAlign:'left' }}>
                            {index+1}
                        </TableCell>
                        <TableCell align="left" style={{paddingTop:'15px',paddingBottom:'15px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000'}}>{moment(row.admissiondate).format('DD-MM-YYYY')}</TableCell>
                        <TableCell align="left" style={{paddingTop:'15px',paddingBottom:'15px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000'}}>{row.userid}</TableCell>
                        <TableCell align="left" style={{paddingTop:'15px',paddingBottom:'15px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000'}}><TeacherClasses userId={row.userid}/></TableCell>
                        <TableCell align="left" style={{paddingTop:'15px',paddingBottom:'15px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000'}}>{row.firstname + ' ' + row.lastname}</TableCell>
                        <TableCell align="left" style={{paddingTop:'15px',paddingBottom:'15px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000',margin:'auto'}}>
                            <button type="submit" className="tchrviewoverallbtn" onClick={() => showOverall() & dispatch(setProfile(row))}>View Overall</button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        </div>
            </>
            
            : 
        <>
            <div className="profileoverview">
            <div className='profileicon'>
                <div style={{marginRight:'25px',marginLeft:'25px'}}>
                <p style={{ fontfamily: "Roboto",fontStyle: "normal",fontWeight: "normal",fontSize: "14px",lineHeight: "21px",color: "#4D4D4D",}}>
                    Home{" "}&gt;
                    <b>
                    {" "}
                    <u>Teacher Profile</u>
                    </b>
                </p>
                <div>
                <h3 className='profile-heading'>Teacher Profile</h3>
                </div>
                <br/>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center'}}>
                    <Avatar className="stdntavtr" sx={{width:150, height:150}}><span>{profile?.firstname[0]?.toUpperCase()}</span></Avatar>
                    <button className="stdntprofilebtn">Delete Account</button>
                </div>
                </div>
            </div>
            <div style={{display:'flex',width:'100%',padding:'0 0px'}}>
            <Box className="stdnttabbox">
            <Box className="stdnttabs">
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ margin: 'auto' }}>
                    <Tab label="Profile" {...a11yProps(0)} className={value === 0 ? "stdnttab2" : "stdnttab1"} />
                    <Tab label="Attendance" {...a11yProps(1)} className={value === 1 ? "stdnttab2" : "stdnttab1"} />
                    <Tab label="Feedback" {...a11yProps(2)} className={value === 2 ? "stdnttab2" : "stdnttab1"} />
                  </Tabs>
                {/* <button className='prncplprofilebackbtn' onClick={hideOverall}><KeyboardBackspaceOutlinedIcon style={{verticalAlign:'middle'}}/>Back</button> */}
                <Button className="prncplprofilebackbtn" color='inherit' onClick={hideOverall}  ><KeyboardBackspaceOutlinedIcon style={{verticalAlign:'middle', marginRight: '2px'}}/>Back</Button>
            </Box>
            <TabPanel value={value} index={0}>
                <TabProfile/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TabAttendance/>
            </TabPanel>
            <TabPanel value={value} index={2} >
                <TabFeedback/>
            </TabPanel>
            </Box>
            </div>
        </div>
        </>    
        }
        </>
    )
}

export default TeacherProfile
