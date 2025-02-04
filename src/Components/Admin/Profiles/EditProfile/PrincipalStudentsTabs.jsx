import React, { useEffect } from 'react';
import { Avatar, Box, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import EditProfile1 from './EditProfile1';
import TabAttendance1 from './TabAttendance1';
import { fetchStudentDetails } from '../../../../slices/student';
import { getDropdownClasses } from '../../../../slices/principal';
import { KeyboardBackspaceOutlined } from '@mui/icons-material';
import './PrincipalStudentsTabs.css';
import TabAcademics1 from './TabAcademics1';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
        'aria-selected': index === 0 ? 'true' : 'false',
    };
}

function PrincipalStudentsTabs() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId, userType } = location.state || {};  // Use location.state to access passed params

    const student = useSelector((state) => state.student.student);
    const [tabValue, setTabValue] = React.useState(0);

    useEffect(() => {
        if (userId && userType === "students") {
            dispatch(fetchStudentDetails({ user_id: userId }));
            dispatch(getDropdownClasses({ school_id: userId }));
        }
    }, [dispatch, userId, userType]);

    const handleTabChange = (event, newValue) => setTabValue(newValue);

    return (
        <div className="student-profile">
            <div className="student-account">
                <div style={{ marginTop: '28px', marginRight: '25px', marginLeft: '25px' }}>
                    <p style={{ fontFamily: "Roboto", fontSize: "18px", color: "#4D4D4D" }}>
                        Home &gt;
                        <b><u>Student Profile</u></b>
                    </p>
                    <h2 style={{ textAlign: 'center', fontFamily: "Poppins", fontWeight: '600', marginTop: '40px', fontSize: '25px' }}>
                        Student Profile
                    </h2>
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <Avatar
                            className="student-avatar"
                            sx={{ width: 120, height: 120 }}
                            src={student?.profile_image || '/default-avatar.png'}
                            alt={`${student?.name || 'Student'}'s Profile`}
                        />
                        <button className="student-profile-btn">Delete Account</button>
                    </div>
                </div>
            </div>

            <Box sx={{ width: '100%' }} className="student-tab-box">
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="student profile tabs"
                    className="student-tabs-container"
                >
                    <Tab
                        label="Profile"
                        {...a11yProps(0)}
                        className={tabValue === 0 ? "student-tab-active" : "student-tab-default"}
                    />
                    <Tab
                        label="Attendance"
                        {...a11yProps(1)}
                        className={tabValue === 1 ? "student-tab-active" : "student-tab-default"}
                    />
                    <Tab
                        label="Academics"
                        {...a11yProps(2)}
                        className={tabValue === 2 ? "student-tab-active" : "student-tab-default"}
                    />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                    <EditProfile1 userId={userId} userType={userType} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <TabAttendance1 userId={userId} />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <TabAcademics1 userId={userId} />
                </TabPanel>
            </Box>

            <button
                className="profile-back-btn"
                onClick={() => navigate("/principal/home")}
            >
                <KeyboardBackspaceOutlined style={{ verticalAlign: 'middle', marginTop: '5px' }} />
                Back
            </button>
        </div>
    );
}

export default PrincipalStudentsTabs;
