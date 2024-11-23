import React, { useEffect, useMemo, useState } from "react";
// import './TeacherMail.css'
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InboxIcon from "@mui/icons-material/Inbox";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarIcon from "@mui/icons-material/Star";
import MailInbox from "./Inbox/MailInbox";
import ComposeMail from "./ComposeMail/ComposeMail";
import SentMail from "./Sent/SentMail";
import DraftMail from "./Draft/DraftMail";
import DeletedMail from "./Deleted/DeletedMail";
import FavouriteMail from "./Favourites/FavouriteMail";
import io from "socket.io-client";
import styles from "./TeacherMail.module.css";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "../../../icons/LogoutIcon";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import axios from "axios";
import {
  checkAuth,
  fetchAllMails,
  googleAuth,
  getInbox,
  logoutGoogle,
} from "../../../services/mail.service";
import { socketUrl } from "../../../common/socketLink";
import { toast } from "react-toastify";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import MailPromotion from "./Promotion/MailPromotion";

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
        <Box>
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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

/**
 * url,doesnt not use http polling,doesnt reconnect automatically
 */
export const socket = io(socketUrl, {
  transports: ["websocket"],
  upgrade: false,
  retries: 3,
  reconnection: true,
  reconnectionAttempts: 15,
  reconnectionDelayMax: 30000,
  forceBase64: false,
});

const popupStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  height: 130,
  display: "flex",
  alignItems: "center",
};

function TeacherMail() {
  const user = useMemo(
    () => JSON.parse(localStorage.getItem("user")),
    [localStorage.getItem("user")]
  );
  const [AllMails, setAllMails] = useState([]);
  const [fltMails, setFltMails] = useState([]);
  const [mails, setMails] = useState([]);
  console.log(mails,"mailinbox")
  const [sentMails, setSentMails] = useState([]);
  const [draftMails, setDraftMails] = useState([]);
  const [favMails, setFavMails] = useState([]);
  const [deletedMails, setDeletedMails] = useState([]);
  const [recentContact, setRecentContact] = useState([]);
  const [value, setValue] = useState(0);
  const [newInboxEmail, setNewInboxEmail] = useState();
  const [isAuthorised, setIsAuthorised] = useState(false);

  // Separate inbox and promotion mails based on the content of the body
  const inboxMails = useMemo(
    () =>
      mails.filter(
        (mail) => mail?.body && !mail.body.trim().startsWith("<!DOCTYPE")
      ),
    [mails]
  );
  
  const promotionMails = useMemo(
    () =>
      mails.filter((mail) =>
        mail?.body?.trim().startsWith("<!DOCTYPE")
      ),
    [mails]
  );
  
  console.log("fltMails: ", fltMails);
  console.log("AllMails: ", AllMails);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1 && isAuthorised) { // Check if 'Inbox' tab is clicked
      fetchInbox(); // Fetch inbox emails when the tab is clicked
    }
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

  /**
   * Socket
   */

  useEffect(() => {
    // WebSocket event listeners
    // socket.on('connect', () => {
    //     console.log('WebSocket connection re-established.');
    //     reconnectAttempts = 0;
    // });

    socket.emit("connected", user.id);

    socket.on("disconnect", () => {
      // tryReconnect()
      console.log("WebSocket connection disconnected.");
    });

    // hadel new mail
    socket.on("sendmail", (emailData) => {
      setFltMails((prevData) => [...prevData, emailData]);
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
      console.log("New email received:", emailData);
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
    console.warn(unread);
    setNewInboxEmail(unread);
  }, [fltMails]);

  useEffect(() => {
    async function getinboxMail() {
      const data = await fetchAllMails(user.id);
      if (data.status === 200) {
        setAllMails(data.data);
        setFltMails(data.data);
        // updateallmailState(data.data);
      }
    }
    getinboxMail();
  }, []);
  // //----------------------------- new implementation ---------------------------------

  useEffect(() => {
    checkUserAuthorization();
  }, []);

  useEffect(() => {
    if (isAuthorised) {
      fetchInbox();
    }
  }, [isAuthorised]);

  // const fetchInbox = async () => {
  //   console.log("Calling getInbox API");
  //   const inbox = await getInbox({ pageToken: mails?.nextPageToken });
  //   console.log("Complete API response:", inbox);
  
  //   // Access the emails array
  //   const mailItems = inbox?.response?.data?.mails;
  
  //   if (mailItems) {
  //     console.log("Fetched mail items:", mailItems);
  //     setMails((prevMails) => {
  //       const updatedMails = [...(prevMails || []), ...mailItems];
  //       console.log("Updated mails state:", updatedMails);
  //       return updatedMails;
  //     });
  //   } else {
  //     console.error("No emails found in the response");
  //   }
  // };

  const fetchInbox = async () => {
    console.log("Calling getInbox API");
    const inbox = await getInbox({ pageToken: mails?.nextPageToken });
    console.log("Complete API response:", inbox);
  
    // Extract emails array from the response
    const mailItems = inbox?.response?.data?.mails;
  
    if (mailItems) {
      console.log("Fetched mail items:", mailItems);
      setMails((prevMails) => [...(prevMails || []), ...mailItems]); // Append new mails to the existing state
    } else {
      console.error("No emails found in the response");
    }
  };
  
  
  
  

  const checkUserAuthorization = async () => {
    const response = await checkAuth();
    console.log("isAuthorised:", isAuthorised);

    setIsAuthorised(response?.data?.isAuthorised);
  };

  const logout = async () => {
    const response = await logoutGoogle();
    toast.success(response.data.message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setIsAuthorised(false);
  };


  const googleLogin = useGoogleLogin({
    flow: "auth-code",
       scope:
      "https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar",
    include_granted_scopes: false,
    onSuccess: async (codeResponse) => {
      console.log(codeResponse,"codereponse")

      try {
        console.log(user.id,"userdetailstorage")

        await googleAuth({ code: codeResponse.code ,userId:user.id});
        setIsAuthorised(true);
      } catch (error) {
        console.error("Authentication error:", error);
        toast.error("Authentication failed!", { autoClose: 500 });
      }
    },
    onError: (errorResponse) => {
      console.error("Authentication error:", errorResponse);
      toast.error("Authentication failed!", { autoClose: 500 });
    },
  });

  return (
    <div className={styles.main}>
      <div className={styles.tchrmail}>
        <div className={styles.tchrmaild1}>
          {/*Head*/}
          <p className={styles.heading}>
            Home &gt;
            <b>
              {" "}
              <u>Mail</u>
            </b>
          </p>
          {/*tab icons*/}
          <Box className={styles.mailbox}>
            <button className={styles.sidebarbtn}>
              {toggleMenu ? (
                <CloseRoundedIcon onClick={toggleItem} />
              ) : (
                <ListIcon onClick={toggleItem} />
              )}
            </button>
            {(toggleMenu || screenWidth > 1300) && (
              <Tabs
                orientation="vertical"
                value={value}
                onClick={toggleItem}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={styles.tabs}
              >
                <Tab
                  icon={<EmailOutlinedIcon className={styles.TabIcon} />}
                  iconPosition="start"
                  label="Compose Mail"
                  {...a11yProps(0)}
                  className={styles.composeMail}
                />
                <Tab
                  icon={<InboxIcon className={styles.TabIcon} />}
                  iconPosition="start"
                  label={
                    <span>
                      Inbox{" "}
                      {newInboxEmail > 0 ? (
                        <span className={styles.inboxcount}>
                          {newInboxEmail}
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  }
                  {...a11yProps(1)}
                  className={`${styles.inboxtab} ${
                    value === 1 ? styles.activeTab : ""
                  }`}
                />
                <Tab
                  icon={<InboxIcon className={styles.TabIcon} />}
                  iconPosition="start"
                  label={
                    <span>
                      Promotion{" "}
                      {newInboxEmail > 0 ? (
                        <span className={styles.inboxcount}>
                          {newInboxEmail}
                        </span>
                      ) : (
                        <></>
                      )}
                    </span>
                  }
                  {...a11yProps(2)}
                  className={`${styles.inboxtab} ${
                    value === 2 ? styles.activeTab : ""
                  }`}
                />

                <Tab
                  icon={<NearMeOutlinedIcon className={styles.TabIcon} />}
                  iconPosition="start"
                  label="Sent"
                  {...a11yProps(3)}
                  className={`${styles.mailtabs} ${
                    value === 3 ? styles.activeTab : ""
                  }`}
                />
                <Tab
                  icon={<SaveAsOutlinedIcon className={styles.TabIcon} />}
                  iconPosition="start"
                  label="Drafts"
                  {...a11yProps(4)}
                  className={`${styles.mailtabs} ${
                    value === 4 ? styles.activeTab : ""
                  }`}
                />
                <Tab
                  icon={<DeleteOutlinedIcon className={styles.TabIcon} />}
                  iconPosition="start"
                  label="Deleted"
                  {...a11yProps(5)}
                  className={`${styles.mailtabs} ${
                    value === 5 ? styles.activeTab : ""
                  }`}
                />
                <Tab
                  icon={<StarIcon className={styles.TabIcon} />}
                  iconPosition="start"
                  label="Favourites"
                  {...a11yProps(6)}
                  className={`${styles.mailtabs} ${
                    value === 6 ? styles.activeTab : ""
                  }`}
                />
              </Tabs>
            )}
            {isAuthorised && (
              <button
                className="logoutbtn"
                style={{
                  backgroundColor: "#FF2934",
                  height: "50px",
                  width: "140px",
                  display: "flex",
                  alignItems: "center",
                  bottom: 0,
                }}
                onClick={logout}
              >
                <p style={{ color: "white", margin: "auto" }}>
                  <LogoutIcon />
                </p>
                <span
                  style={{
                    color: "white",
                    fontFamily: "Rubik",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "14px",
                    marginRight: "32px",
                  }}
                >
                  Logout Google
                </span>
              </button>
            )}
          </Box>
        </div>
        {/*tab component*/}
        <div className={styles.tchrmaild2}>
          <TabPanel value={value} index={0}>
            <ComposeMail fltMails={fltMails} setFltMails={setFltMails} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MailInbox inboxMails={inboxMails} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MailPromotion promotionMails={promotionMails} />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <SentMail fltMails={fltMails} setFltMails={setFltMails} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <DraftMail fltMails={fltMails} setFltMails={setFltMails} />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <DeletedMail fltMails={fltMails} setFltMails={setFltMails} />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <FavouriteMail fltMails={fltMails} setFltMails={setFltMails} />
          </TabPanel>
        </div>
        {!isAuthorised && (
          <div>
            <Box sx={popupStyle}>
              <button onClick={googleLogin} className={styles.googlebtn}>
                Sign in with Google
              </button>
            </Box>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherMail;
