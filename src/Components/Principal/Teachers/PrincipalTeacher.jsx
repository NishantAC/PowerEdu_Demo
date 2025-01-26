import React, { useEffect } from 'react';
import './PrincipalTeacher.css';
import { Avatar, Box, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import TabProfile from './TeacherProfile/TabProfile';
import TabFeedback from './TeacherProfile/Feedback/TabFeedback';
import TabAttendance from './TeacherProfile/Attendance/TabAttendance';
import PropTypes from 'prop-types';
import { getCurrentTeacherData } from '../../../slices/subjectteacher';
import { KeyboardBackspaceOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

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
                    {children}
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

function PrincipalTeacher(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.user);
    const currentteacher = useSelector((state) => state.subjectteacher.currentteacher);
    const tabValue = localStorage.getItem('tab') ? parseInt(localStorage.getItem('tab')) : 0;
    const userId = localStorage.getItem('teacher') ? JSON.parse(localStorage.getItem('teacher')).user_id : currentUser.id;
    const [value, setValue] = React.useState(tabValue ? tabValue : 0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    useEffect(() => {
        dispatch(getCurrentTeacherData({ userId }));
    }, [dispatch, userId]);

    return (
        <div className="studentprofile">
            <div className='studentaccount'>
            </div>
            <div style={{ width: '100%', padding: '0 0px' }}>
                <Box sx={{ width: '100%' }} className="stdnttabbox">
                    <Box className="stdnttabs">
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ margin: 'auto' }}>
                            <Tab label="Profile" {...a11yProps(0)} className={value === 0 ? "stdnttab2" : "stdnttab1"} />
                            <Tab label="Attendance" {...a11yProps(1)} className={value === 1 ? "stdnttab2" : "stdnttab1"} />
                            <Tab label="Feedback" {...a11yProps(2)} className={value === 2 ? "stdnttab2" : "stdnttab1"} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <TabProfile currentteacher={currentteacher} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TabAttendance userId={userId} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TabFeedback userId={userId} />
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
}

export default PrincipalTeacher;
