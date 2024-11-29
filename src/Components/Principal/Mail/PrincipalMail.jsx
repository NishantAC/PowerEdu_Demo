import React, { useEffect, useMemo, useState } from 'react';
// import './TeacherMail.css'
import io from 'socket.io-client';
import styles from '../../teacher/Mail/TeacherMail.module.css';
import ListIcon from '@mui/icons-material/List';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { fetchAllMails } from '../../../services/mail.service';
import { socketUrl } from '../../../common/socketLink';
import { toast } from 'react-toastify';
import './PrincipalMail.css'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InboxIcon from '@mui/icons-material/Inbox';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import StarIcon from '@mui/icons-material/Star';
import PrncplComposeMail from './ComposedMail/PrncplComposeMail';
import PrncplInboxMail from './InboxMail/PrncplInboxMail';
import PrncplSentMail from './SentMail/PrncplSentMail';
import PrncplDraftMail from './DraftMail/PrncplDraftMail';
import PrncplDeletedMail from './DeletedMail/PrncplDeletedMail';
import PrncplFavouriteMail from './FavouriteMail/PrncplFavouriteMail'
import { useSelector } from 'react-redux';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}



/**
 * url,doesnt not use http polling,doesnt reconnect automatically
*/
export const socket = io(socketUrl, {
  transports: ['websocket'],
  upgrade: false,
  retries: 3,
  reconnection: true,
  reconnectionAttempts: 15,
  reconnectionDelayMax: 30000,
  forceBase64: false,

});

function PrincipalMail() {


  const user = useSelector((state) => state.auth.user);

  const [AllMails, setAllMails] = useState([]);
  const [fltMails, setFltMails] = useState([]);
  const [value, setValue] = React.useState(0);
  const [newInboxEmail, setNewInboxEmail] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [toggleMenu, setToggleMenu] = React.useState(false);
  const toggleItem = () => {
    setToggleMenu(!toggleMenu);
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);



  useEffect(() => {

    socket.emit('connected', user.id);

    socket.on('disconnect', () => {
      console.log('WebSocket connection disconnected.');
    });

    // hadel new mail
    socket.on('sendmail', (emailData) => {
      setFltMails(prevData => [...prevData, emailData]);
      toast(`Received new ✉️ from ${emailData.name} `, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log('New email received:', emailData);
    });

    // Cleanup WebSocket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);


  useEffect(() => {
    const unread = fltMails.reduce((count, M) => {
      if (M.read === false && M.sender_id !== user.id && M.draft !== true) {
        count++;
      }
      return count;
    }, 0);
    console.warn(unread)
    setNewInboxEmail(unread);
  }, [fltMails])

  useEffect(() => {
    async function getinboxMail() {
      const data = await fetchAllMails(user.id)
      if (data.status === 200) {
        setAllMails(data.data);
        setFltMails(data.data);
        // updateallmailState(data.data);
      }
    }
    getinboxMail();
  }, [])

  return (
    <div className={styles.main}>
      <div className={styles.tchrmail}>

        <div className={styles.tchrmaild1}>
          {/*Head*/}
          <p
            className={styles.heading}>
            Home{" "}&gt;
            <b>
              {" "}
              <u>Mail</u>
            </b>
          </p>
          {/*tab icons*/}
          <Box className={styles.mailbox} >
            <button className={styles.sidebarbtn}>
              {toggleMenu ? <CloseRoundedIcon onClick={toggleItem} /> : <ListIcon onClick={toggleItem} />}
            </button>
            {(toggleMenu || screenWidth > 1300) && (
              <Tabs orientation="vertical" value={value} onClick={toggleItem} onChange={handleChange} aria-label="Vertical tabs example" className={styles.tabs}>
                <Tab icon={<EmailOutlinedIcon className={styles.TabIcon} />} iconPosition="start" label="Compose Mail" {...a11yProps(0)} className={styles.composeMail} />
                <Tab icon={<InboxIcon className={styles.TabIcon} />} iconPosition="start" label={<span>Inbox {newInboxEmail > 0 ? <span className={styles.inboxcount}>{newInboxEmail}</span> : <></>}</span>} {...a11yProps(1)} className={`${styles.inboxtab} ${value === 1 ? styles.activeTab : ''}`} />
                <Tab icon={<NearMeOutlinedIcon className={styles.TabIcon} />} iconPosition="start" label="Sent" {...a11yProps(2)} className={`${styles.mailtabs} ${value === 2 ? styles.activeTab : ''}`} />
                <Tab icon={<SaveAsOutlinedIcon className={styles.TabIcon} />} iconPosition="start" label="Drafts" {...a11yProps(3)} className={`${styles.mailtabs} ${value === 3 ? styles.activeTab : ''}`} />
                <Tab icon={<DeleteOutlinedIcon className={styles.TabIcon} />} iconPosition="start" label="Deleted" {...a11yProps(4)} className={`${styles.mailtabs} ${value === 4 ? styles.activeTab : ''}`} />
                <Tab icon={<StarIcon className={styles.TabIcon} />} iconPosition="start" label="Favourites" {...a11yProps(5)} className={`${styles.mailtabs} ${value === 5 ? styles.activeTab : ''}`} />
              </Tabs>
            )}
          </Box>
        </div>
        {/*tab component*/}
        <div className={styles.tchrmaild2}>
          <TabPanel value={value} index={0}><PrncplComposeMail fltMails={fltMails} setFltMails={setFltMails} /></TabPanel>
          <TabPanel value={value} index={1}><PrncplInboxMail fltMails={fltMails} setFltMails={setFltMails} /></TabPanel>
          <TabPanel value={value} index={2}><PrncplSentMail fltMails={fltMails} setFltMails={setFltMails} /></TabPanel>
          <TabPanel value={value} index={3}><PrncplDraftMail fltMails={fltMails} setFltMails={setFltMails} /></TabPanel>
          <TabPanel value={value} index={4}><PrncplDeletedMail fltMails={fltMails} setFltMails={setFltMails} /></TabPanel>
          <TabPanel value={value} index={5}><PrncplFavouriteMail fltMails={fltMails} setFltMails={setFltMails} /></TabPanel>
        </div>
      </div>
    </div>
  )
}

export default PrincipalMail

