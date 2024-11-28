import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MailInbox from "./Inbox/MailInbox";
import ComposeMail from "./ComposeMail/ComposeMail";
import SentMail from "./Sent/SentMail";
import DraftMail from "./Draft/DraftMail";
import DeletedMail from "./Deleted/DeletedMail";
import FavouriteMail from "./Favourites/FavouriteMail";
import io from "socket.io-client";
import axios from "axios";
import GoogleImage from "../../../assets/images/Google.png";
import {checkAuth, fetchAllMails, googleAuth, getInbox, logoutGoogle,} from "../../../services/mail.service";
import { socketUrl } from "../../../common/socketLink";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import MailPromotion from "./Promotion/MailPromotion";
import InfiniteScroll from "react-infinite-scroll-component";
import TeacherMailTabs from "./TeacherMailTabs";
import { selectThemeProperties } from "@/slices/theme";
import { useSelector } from "react-redux";



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


function TeacherMail() {
  const { user } = useSelector((state) => state.user);
  const themeProperties = useSelector(selectThemeProperties); 
  const [AllMails, setAllMails] = useState([]);
  const [fltMails, setFltMails] = useState([]);
  const [mails, setMails] = useState([]);
  const [value, setValue] = useState(0);
  const [newInboxEmail, setNewInboxEmail] = useState();
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);


  const inboxMails = useMemo(
    () =>
      mails.filter(
        (mail) => mail?.body && !mail.body.trim().startsWith("<!DOCTYPE")
      ),
    [mails]
  );

  const promotionMails = useMemo(
    () => mails.filter((mail) => mail?.body?.trim().startsWith("<!DOCTYPE")),
    [mails]
  );

  
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1 && isAuthorised) {
      fetchInbox(); // Fetch new emails
    }
  };
  
  



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
    socket.emit("connected", user.id);

    socket.on("disconnect", () => {
      console.log("WebSocket connection disconnected.");
    });

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
      
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const unread = fltMails.reduce((count, M) => {
      if (M.read === false && M.sender_id !== user?.id && M.draft !== true) {
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
      }
    }
    getinboxMail();
  }, []);

  useEffect(() => {
    checkUserAuthorization();
  }, []);

  useEffect(() => {
    if (isAuthorised) {
      fetchInbox();
    }
  }, [isAuthorised]);

  const fetchInbox = async () => {
    if (loading) return; 
    setLoading(true);

    try {
      
      const inbox = await getInbox({ pageToken: nextPageToken });
      const mailItems = inbox?.response?.data?.mails;
      const newNextPageToken = inbox?.response?.data?.nextPageToken;

      if (mailItems) {
        setMails((prevMails) => [...prevMails, ...mailItems]);
        setNextPageToken(newNextPageToken || null);
        setHasMore(!!newNextPageToken); 
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast.error("Failed to fetch emails. Please try again.", {
        autoClose: 500,
      });
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreMails = async () => {
    if (!hasMore || loading) return; // Prevent multiple fetches if already loading or no more mails
    setLoading(true);
    try {
      const response = await getInbox({ pageToken: nextPageToken });
      const mailItems = response?.response?.data?.mails;
      const newNextPageToken = response?.response?.data?.nextPageToken;
  
      if (mailItems) {
        setMails((prevMails) => [...prevMails, ...mailItems]);
        setNextPageToken(newNextPageToken || null);
        setHasMore(!!newNextPageToken);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch more emails:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };
  


  const checkUserAuthorization = async () => {
    const response = await checkAuth();
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
      

      try {
        await googleAuth({ code: codeResponse.code, userId: user?.id });
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
    <div className="ml-12">
      <div className="flex flex-col lg:flex-row">
        <TeacherMailTabs
          value={value}
          handleChange={handleChange}
          toggleMenu={toggleMenu}
          toggleItem={toggleItem}
          screenWidth={screenWidth}
          newInboxEmail={newInboxEmail}
          isAuthorised={isAuthorised}
          logout={logout}
        />
        {/*tab component*/}
        <div className="w-full lg:w-4/5">
          <TabPanel value={value} index={0}>
            <ComposeMail fltMails={fltMails} setFltMails={setFltMails} />
          </TabPanel>
          <TabPanel value={value} index={1}>
          <InfiniteScroll
            dataLength={mails.length}
            next={fetchMoreMails}
            hasMore={hasMore}
            loader={<h4 className="text-center">Loading more emails...</h4>}
            endMessage={
              <p style={{ textAlign: 'center', marginTop: '20px' }}>
                <b>No more emails</b>
              </p>
            }
          >
            <MailInbox inboxMails={inboxMails} />
          </InfiniteScroll>
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
            <button onClick={googleLogin} className=" flex p-2 rounded-[10px] bg-white hover:bg-white "            
            > 
              <img src={GoogleImage} width={20} alt="Sign in with Google" />
              <span className="ml-2"
              style={{ color: themeProperties.textColorAlt }}
              >Sign in with Google</span>
              </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherMail;
