import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Mail from "./Inbox/MailInbox";
import ComposeMail from "./ComposeMail/ComposeMail";
import DraftMail from "./Draft/DraftMail";
import DeletedMail from "./Deleted/DeletedMail";
import FavouriteMail from "./Favourites/FavouriteMail";
import io from "socket.io-client";
import GoogleImage from "../../../assets/images/Google.png";
import {
  checkAuth,
  fetchAllMails,
  googleAuth,
  getInbox,
  logoutGoogle,
} from "../../../services/mail.service";
import { socketUrl } from "../../../common/socketLink";
import { useGoogleLogin } from "@react-oauth/google";
import MailPromotion from "./Promotion/MailPromotion";
import { selectThemeProperties } from "@/slices/theme";
import { useSelector, useDispatch } from "react-redux";
import { LinearProgress } from "@mui/material";
import debounce from "lodash.debounce";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { throttle } from "lodash";
import { getSentMails } from "../../../services/mail.service";

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
  const [newInboxEmail, setNewInboxEmail] = useState();
  const [isAuthorised, setIsAuthorised] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [googleLoading, setGoogleLoading] = useState(true);
  const dispatch = useDispatch();
  const [inboxMails, setInboxMails] = useState([]);
  const [promotionMails, setPromotionMails] = useState([]);
  const [sentMails, setSentMails] = useState([]);
  const {mode} = useParams();
  const [sentMailNextPageToken, setSentMailNextPageToken] = useState(null);
  

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    scope:
      "https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar",
    include_granted_scopes: false,
    onSuccess: async (codeResponse) => {
      try {
        await googleAuth({ code: codeResponse.code, userId: user?.id });
        setIsAuthorised(true);
        toast.success("Login successful!", { description: "Login successful!" });
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
  }, [user.id]);

  useEffect(() => {
    if (isAuthorised) {
      switch (mode) {
        case "inbox":
          fetchInbox();
          break;
        case "promotion":
          fetchPromotion();
          break;
        case "sent":
          fetchSentMail();
          break;
        default:
          console.log("Unknown mode:", mode);
      }
    } else {
      setGoogleLoading(false);
    }
  }, [mode, isAuthorised]);

  const fetchInbox = async () => {
    if (loading) return;
    if (mode != "inbox") return;
    setLoading(true);
    try {
      const inbox = await getInbox();
      const mailItems = inbox?.response?.data?.mails;
      const newNextPageToken = inbox?.response?.data?.nextPageToken;
      if (mailItems) {
        setInboxMails(mailItems);
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

  const fetchMoreMails = throttle(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const response = await getInbox({ pageToken: nextPageToken });
      const mailItems = response?.response?.data?.mails;
      const newNextPageToken = response?.response?.data?.nextPageToken;
      
      if (mailItems) {
        setInboxMails((prevMails) => {
          const uniqueMails = [...prevMails, ...mailItems].filter(
            (mail, index, self) => self.findIndex((m) => m.id === mail.id) === index
          );
          return uniqueMails;
        });
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
  }, 300); 

  const fetchSentMail = async () => {

    if (loading) return;
    if (mode != "sent") return;

    setLoading(true);
    const { response, error } = await getSentMails({
      pageToken: sentMailNextPageToken,
    });
    if (error) {
      toast.error("Failed to get sent mails",  { description: "Failed to get sent mails"});
    } else {
      setSentMails && setSentMails((prevMails) => [...prevMails, ...response?.data?.mails]);
      console.log(response?.data?.mails);
      console.log(response?.data?.nextPageToken);
      setSentMailNextPageToken(response?.data?.nextPageToken);
      
    }
    setLoading(false);
    setGoogleLoading(false);
  };

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
            className=" p-[2px] rounded-[10px] w-fit shadow-xl  border-2 "
            style={{
              color: themeProperties.textColorAlt,
              borderColor: themeProperties.googleMeetButton,
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
    < div className=" p-1 h-full rounded-[10px] "
      style={{ background: themeProperties?.borderColor }}

    >

      <div  className="h-full rounded-[9px] overflow-hidden "
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
                <Mail
                  mails={inboxMails}
                  fetchMoreMails={fetchMoreMails}
                  themeProperties={themeProperties}
                  loading={loading}
                  setLoading={setLoading}
                  fetchInbox={fetchInbox}
                  refreshMail={fetchInbox}
                />
              )}

              {mode === "promotion" && (
                <MailPromotion promotionMails={promotionMails} />
              )}
              {mode === "sent" && (
                
                <Mail
                mails={sentMails}
                fetchMoreMails={fetchSentMail}
                themeProperties={themeProperties}
                loading={loading}
                setLoading={setLoading}
                fetchInbox={fetchSentMail}
                refreshMail={fetchSentMail}
              />

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
