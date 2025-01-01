import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Mail from "./Mails/MailInbox";
// import ComposeMail from "./ComposeMail/ComposeMail";
import io from "socket.io-client";
import GoogleImage from "../../assets/images/Google.png";
import {
  checkAuth,
  fetchAllMails,
  googleAuth,
  getInbox,
  logoutGoogle,
  getDraftMails,
  getTrashMails,
  getStarred,
  getSentMails
} from "../../services/mail.service";
import { socketUrl } from "../../common/socketLink";
import { useGoogleLogin } from "@react-oauth/google";
import { selectThemeProperties } from "@/slices/theme";
import { useSelector, useDispatch } from "react-redux";
import { LinearProgress } from "@mui/material";
import debounce from "lodash.debounce";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { throttle } from "lodash";

export const socket = io(socketUrl, {
  transports: ["websocket"],
  upgrade: false,
  retries: 3,
  reconnection: true,
  reconnectionAttempts: 15,
  reconnectionDelayMax: 30000,
  forceBase64: false,
});

function MailComponent() {
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
  const [draftMails, setDraftMails] = useState([]);
  const [deletedMails, setDeletedMails] = useState([]);
  const [starredMails, setStarredMails] = useState([]);
  const {mode} = useParams();
  const [sentMailNextPageToken, setSentMailNextPageToken] = useState(null);
  const [hasMoreSent, setHasMoreSent] = useState(true);
  const [draftMailNextPageToken, setDraftMailNextPageToken] = useState(null);
  const [hasMoreDraft, setHasMoreDraft] = useState(true);
  const [deletedMailNextPageToken, setDeletedMailNextPageToken] = useState(null);
  const [hasMoreDeleted, setHasMoreDeleted] = useState(true);
  const [starredMailNextPageToken, setStarredMailNextPageToken] = useState(null);
  const [hasMoreStarred, setHasMoreStarred] = useState(true);
  

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
        case "draft":
          fetchDraftMail();
          break;
        case "trash":
          fetchDeletedMail();
          break;
        case "starred":
          fetchStarred();
          break;
        
        default:
          
      }
    } else {
      setGoogleLoading(false);3
    }
  }, [mode, isAuthorised]);


  const fetchInbox = async (refresh) => {
    if (!hasMore || loading) return;
    if (mode != "inbox") return;
    setLoading(true);
    try {
      const response = await getInbox({ pageToken: refresh ? null : nextPageToken });
      const mailItems = response?.response?.data?.mails;
      const newNextPageToken = response?.response?.data?.nextPageToken;

      if (response?.response?.status === 200) {
        if (refresh ){
          setInboxMails(mailItems); 
        }
        else {3
        setInboxMails && setInboxMails((prevMails) => [...prevMails, ...mailItems]);
        }
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
      setGoogleLoading(false);
    }
  }

  const fetchSentMail = async (refresh) => {
    if (loading) return;
    if (mode != "sent") return;
    if (!hasMoreSent ) return;
    setLoading(true);
    const { response, error } = await getSentMails({
      pageToken: refresh ? null : sentMailNextPageToken,
    });
    if (error) {
      toast.error("Failed to get sent mails",  { description: "Failed to get sent mails"});
    } else {
      if ( response.message == "No messages in sent"){
        toast.info("No messages in sent",  { description: "You have not sended any messages yet"});
        setLoading(false);
        setGoogleLoading(false);
        setSentMails([]);
        return;
      }
      if ( refresh ){
        setSentMails(response?.data?.mails);
      }
      else {
      setSentMails && setSentMails((prevMails) => [...prevMails, ...response?.data?.mails]);
      }
      setSentMailNextPageToken(response?.data?.nextPageToken);
      setHasMoreSent(!!response?.data?.nextPageToken);
      
    }
    setLoading(false);
    setGoogleLoading(false);
  };

  const fetchDraftMail = async (refresh) => {
    if (loading) return;
    if (mode != "draft") return;
    if (!hasMoreDraft) return;
    setLoading(true);
    const { response, error } = await getDraftMails({ pageToken: refresh ? null : draftMailNextPageToken });
    if (error) {
      toast.error("Failed to get draft mails",  { description: "Failed to get draft mails"});
    }
    if ( response.message == "No messages in draft"){
      toast.info("No messages in draft",  { description: "You have no messages in your draft"});
      setLoading(false);
      setGoogleLoading(false);
      setDeletedMails([]);
      return;
    }
    if( refresh ){
      setDraftMails(response?.data?.mails);
    }else{
    setDraftMails && setDraftMails((prevMails) => [...prevMails, ...response?.data?.mails]);
    }
    setDraftMailNextPageToken(response?.data?.nextPageToken);
    setHasMoreDraft(!!response?.data?.nextPageToken);
    setLoading(false);
    setGoogleLoading(false);
  };

  const fetchStarred = async (refresh) => {
    if (loading) return;
    if (mode != "starred") return;
    if (!hasMoreStarred) return;
    setLoading(true);
    const { response, error } = await getStarred ({ pageToken: refresh ? null : starredMailNextPageToken });
    if (error) {
      toast.error("Failed to get starred mails",  { description: "Failed to get starred mails"});
    }
    if ( response.message == "No messages in starred"){
      toast.info("No messages in starred",  { description: "You have no starred messages"});
      setLoading(false);
      setGoogleLoading(false);
      setDeletedMails([]);
      return;
    }
    if (refresh){
      setStarredMails(response?.data?.mails);
    }else{
    setStarredMails && setStarredMails((prevMails) => [...prevMails, ...response?.data?.mails]);
    } 
    setStarredMailNextPageToken(response?.data?.nextPageToken);
    setHasMoreStarred(!!response?.data?.nextPageToken);
    setLoading(false);
    setGoogleLoading(false);
  };
const fetchDeletedMail = async (refresh) => {

  if (loading) return;
  if (mode != "trash") return;
  if (!hasMoreDeleted) return;
  setLoading(true);
  const { response, error } = await getTrashMails({ pageToken: refresh ? null : deletedMailNextPageToken });
  if (error) {
    toast.error("Failed to get deleted mails",  { description: "Failed to get deleted mails"});
  }
  if ( response.message == "No messages in trash"){
    toast.info("No messages in trash",  { description: "You have no messages in your trash"});
    setLoading(false);
    setGoogleLoading(false);
    setDeletedMails([]);
    return;
  }
  if (refresh){
    setDeletedMails(response?.data?.mails);
  }else{
  setDeletedMails && setDeletedMails((prevMails) => [...prevMails, ...response?.data?.mails]);
  }
  setDeletedMailNextPageToken(response?.data?.nextPageToken);
  setHasMoreDeleted(!!response?.data?.nextPageToken);
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
            className=" p-[4px] rounded-[10px] w-fit shadow-xl"
            style={{
              background: themeProperties.boxBackgroundSolid
            }}
          >
            <button
              onClick={googleLogin}
              className=" p-2 rounded-[10px] flex items-center "
              style={{
                background: themeProperties.buttonColor,
                color: themeProperties.textColor,
              }}
              
            >
              <img src={GoogleImage} width={20} alt="Sign in with Google" />
              <span
                className="ml-2"
                style={{ color: themeProperties.textColorAlt , 

                }}
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
    >

      <div  className="h-full rounded-[9px] overflow-hidden "
        style={{ background: themeProperties?.boxBackgroundSolid }}
      
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
            style={{ color: themeProperties.specialColor }}
          >
            <LinearProgress color="inherit"/>   
            <p
            style={{ color: themeProperties.textColor   }}
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
                  fetchMails={fetchInbox}
                  themeProperties={themeProperties}
                  loading={loading}
                  setLoading={setLoading}
                  type = "Inbox"

                />
              )}

              {mode === "promotion" && (
                <></>
              )}
              {mode === "sent" && (
                
                <Mail
                mails={sentMails}
                fetchMails={fetchSentMail}
                themeProperties={themeProperties}
                loading={loading}
                setLoading={setLoading}
                type = "Sent"
              />

              )}

              {mode === "draft" && (
                <Mail 
                mails={draftMails}
                fetchMails={fetchDraftMail}
                themeProperties={themeProperties}
                loading={loading}
                setLoading={setLoading}
                type = "Draft"
                />
              )}

              {  mode === "trash" &&  (
                <>
                <Mail 
                mails={deletedMails}
                fetchMails={fetchDeletedMail}
                themeProperties={themeProperties}
                loading={loading}
                setLoading={setLoading}
                type = "Deleted"
                />
                </>
              )}
              {mode === "starred" && (
                <Mail 
                mails={starredMails}
                fetchMails={fetchStarred}
                themeProperties={themeProperties}
                loading={loading}
                setLoading={setLoading}
                type = "Starred"
                />
              )}
        </div>
      )}
      </div>
    </div>
  );
}

export default MailComponent;
