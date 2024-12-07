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
import {
  checkAuth,
  fetchAllMails,
  googleAuth,
  getInbox,
  logoutGoogle,
} from "../../../services/mail.service";
import { socketUrl } from "../../../common/socketLink";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import MailPromotion from "./Promotion/MailPromotion";
import TeacherMailTabs from "./TeacherMailTabs";
import { selectThemeProperties } from "@/slices/theme";
import { useSelector, useDispatch } from "react-redux";
import { LinearProgress } from "@mui/material";
import debounce from "lodash.debounce";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

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
  const [isAuthorised, setIsAuthorised] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(true);
  const dispatch = useDispatch();
  const inboxMails = mails;
  const {mode} = useParams();
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

  const promotionMails = useMemo(
    () => mails.filter((mail) => mail?.body?.trim().startsWith("<!DOCTYPE")),
    [mails]
  );



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
    if (isAuthorised) {
      setGoogleLoading(true);
      fetchInbox();
    } else {
      setGoogleLoading(false);
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
        setGoogleLoading(false);
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

  const fetchMoreMails = debounce(async () => {
    if (!hasMore || loading) return;
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
  }, 300); // Adjust the debounce delay as needed

  useEffect(() => {
    const checkUserAuthorization = async () => {
      try {
        const response = await checkAuth();
        setIsAuthorised(response?.data?.isAuthorised);
      } catch (error) {
        setIsAuthorised(false);
      }
    };
    checkUserAuthorization();
  }, []);

  const logout = async () => {
    const response = await logoutGoogle();
    toast.success(response?.data.message, {
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

  useEffect(() => {
    socket.on("sendmail", (emailData) => {
      dispatch(addMail(emailData));
      toast(`Received new ✉️ from ${emailData.name}`, { autoClose: 1000 });
    });

    return () => socket.disconnect();
  }, [dispatch]);

  if (!isAuthorised) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <div
            className=" p-[2px] rounded-[10px] w-fit"
            style={{
              color: themeProperties.textColorAlt,
              background:
                "linear-gradient(to right, #4285F4, #34A853, #FBBC05, #EA4335)",
            }}
          >
            <button
              onClick={googleLogin}
              className=" p-2 flex rounded-[10px] bg-white hover:bg-white  "
            >
              <img src={GoogleImage} width={20} alt="Sign in with Google" />
              <span
                className="ml-2"
                style={{ color: themeProperties.textColorAlt }}
              >
                Sign in with Google
              </span>
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    < div className=" p-2 h-full rounded-[27px] "
      style={{ background: themeProperties?.borderColor }}

    >

      <div  className="h-full rounded-[20px] overflow-hidden "
        style={{ background: themeProperties?.background }}
      
      >
      {googleLoading ? (
        <div
          className={`flex justify-center items-center h-full ${
            !isAuthorised && "hidden"
          }`
        }
        >
          <div
            className="text-center text-sm mt-2"
            style={{ color: themeProperties.primaryColor }}
          >
            <LinearProgress color="inherit"/>   
            <p
            style={{ color: themeProperties.textColorAlt   }}
            >
            Starting your Google Space
            </p>      
          </div>
        </div>
      ) : (
        <div className={` ${!isAuthorised && "hidden"} overflow-hidden `}>
          
              {/* <ComposeMail fltMails={fltMails} setFltMails={setFltMails} /> */}
              {mode === "inbox" && (
                <MailInbox
                  inboxMails={inboxMails}
                  fetchMoreMails={fetchMoreMails}
                  themeProperties={themeProperties}
                  loading={loading}
                  setLoading={setLoading}
                />
              )}

              {mode === "promotion" && (
                <MailPromotion promotionMails={promotionMails} />
              )}
              {mode === "sent" && (
                <SentMail fltMails={fltMails} setFltMails={setFltMails} />
              )}

              {mode === "draft" && (
                <DraftMail fltMails={fltMails} setFltMails={setFltMails} />
              )}

              {mode === "deleted" && (
                <DeletedMail fltMails={fltMails} setFltMails={setFltMails} />
              )}
              {mode === "favourite" && (
                <FavouriteMail fltMails={fltMails} setFltMails={setFltMails} />
              )}
        </div>
      )}
      </div>
    </div>
  );
}

export default TeacherMail;
