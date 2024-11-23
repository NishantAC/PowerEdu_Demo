import * as React from 'react';
import './Profile.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProfileDetails from './ProfileDetails';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import Academics from './Academics/Academics';
import Attendance from './Attendance/Attendance';
import { MenuContext } from '../../../../context/Menu/MenuContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamDetailsByClass } from '../../../../slices/hyexam';
import { Button } from '@mui/material';
import { fetchAllExamDetails } from '../../../../slices/exam';
import AcademicsDetails from '../../../teacher/Student/StudentAcademics/AcademicsDetails';
import { useNavigate } from 'react-router-dom';

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

export default function Profile({ UserId, tab, fromhome, setOverallValue }) {
  const [value, setValue] = React.useState(tab || 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const mycontext = React.useContext(MenuContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { examdetails } = useSelector(state => state.exam);
  const { user } = useSelector(state => state.user);

  return (
    <Box className="stdnttabbox">
      <Box className="stdnttabs">
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ margin: 'auto' }}>
          <Tab label="Profile" {...a11yProps(0)} className={value === 0 ? "stdnttab2" : "stdnttab1"} />
          <Tab label="Academics" {...a11yProps(1)} className={value === 1 ? "stdnttab2" : "stdnttab1"} />
          <Tab label="Attendance" {...a11yProps(2)} className={value === 2 ? "stdnttab2" : "stdnttab1"} />
        </Tabs>
        <Button className="prncplprofilebackbtn" color='inherit' onClick={() => fromhome ? navigate("/principal/home") : setOverallValue(false)} style={{ marginTop: '20px', marginRight: '10px' }} >
          <KeyboardBackspaceOutlinedIcon style={{ verticalAlign: 'middle', marginRight: '2px' }} />Back
        </Button>
      </Box>
      <TabPanel value={value} index={0}>
        <ProfileDetails UserId={UserId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AcademicsDetails userId={UserId} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Attendance UserId={UserId} />
      </TabPanel>
    </Box>
  );
}