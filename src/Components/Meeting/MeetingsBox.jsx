import React, { useEffect, useState , useRef} from "react";

import { useGoogleLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";
import { monthNames } from "@/common/Time";
import { getGoogleEvents } from "@/slices/calendar";
import { checkAuth , googleAuth } from "@/services/mail.service";
import CalendarModal from "./CalendarModal";
import GoogleImage from "../.../../../assets/images/Google.png";
import { CircularProgress } from '@mui/material';
import MeetingsTable from './MeetingsTable';
import { toast } from 'sonner';
import { IoMdAdd } from "react-icons/io";
import gsap from "gsap";
import './Meeting.css'


function MeetingsBox() {
  const [isCalenderOpen, setCalenderOpen] = useState(false);
  const [isMeetingsListOpen, setMeetingsListOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [loading, setLoading] = useState(true);
  const themeProperties = useSelector(selectThemeProperties);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);
  const textRef = useRef(null);  
  const { user: currentUser } = useSelector((state) => state.user);
  const { googleEvents } = useSelector((state) => state.calendarSlice);

  const dispatch = useDispatch();

  const checkUserAuthorization = async () => {
    const response = await checkAuth(currentUser.id);
    setIsAuthorised(response?.data?.isAuthorised);
  };
  
  const filterMeetings = () => {
  
    const filteredMeetings = googleEvents.filter((event) => {
      const eventDate = new Date(event.start.dateTime);
      return (
        eventDate.getDate() === selectedDate.getDate() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getFullYear() === selectedDate.getFullYear()
      );
    });
    setMeetings(filteredMeetings);
  };

  
  useEffect(() => {
    filterMeetings();
  }, [selectedDate, googleEvents]);

  useEffect(() => {
    checkUserAuthorization();
    dispatch(getGoogleEvents()).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    gsap.set(textRef.current, { opacity: 0, display: 'none' });

    buttonRef.current.addEventListener('mouseenter', () => {
      gsap.to(textRef.current, { opacity: 1, display: 'inline',
        duration: 0.5 });
    });

    

    buttonRef.current.addEventListener('mouseleave', () => {
      gsap.to(textRef.current, { opacity: 0, display: 'none', duration: 0.5 });
    });
  }, []);

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    scope:
      "https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar",
    include_granted_scopes: false,
    onSuccess: async (codeResponse) => {
      await googleAuth({ code: codeResponse.code, user_id: currentUser.id });
      setIsAuthorised(true);
      toast.success("Authentication successful", { autoClose: 500 });
    },
    onError: (errorResponse) => {
      toast.error("Authentication failed!", { autoClose: 500 });
    },
  });

  
  useEffect(() => {
    if (isMeetingsListOpen) {
      setCalenderOpen(false);
    }
  }, [isMeetingsListOpen]);

  useEffect(() => {
    if (isCalenderOpen) {
      setMeetingsListOpen(false);
    }
  }, [isCalenderOpen]);

  function formatDate(date) {
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    function getDaySuffix(day) {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    }
  
    return `${day}${getDaySuffix(day)} ${month} ${year}`;
  }


  return (
    <div
      className={`flex flex-col w-full h-full rounded-[15px] overflow-hidden relative transition-all duration-300 items-center border-2`}
      style={{
        borderColor: themeProperties.borderColor,
      }}
    >
      <div
        className={`w-full py-2 px-4 flex justify-between items-center`} 
        style={{
        background: themeProperties.boxBackgroundSolid,
      }}
      >
        <div
          className={` font-[10px] `}
          style={{ color: themeProperties.specialColor }}
        >
          Meetings
        </div>
        <div
          className={`font-light rounded-md text-[14px] border-none relative transition-all duration-300 flex items-center`}
          style={{ color: themeProperties.specialColor }}
        >
          {formatDate(selectedDate)}
        </div>
      </div>

      {/* bottom area */}
      <div
        className={` w-full h-full overflow-y-scroll transition-all duration-300 px-4 relative shadow-2xl`}

        style={{ background: themeProperties.boxBackgroundSolid }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full min-h-80 max-sm:min-h-[480px]">
            <CircularProgress />
          </div>
        ) : !isAuthorised ? (
          <div className="h-full min-h-80 flex justify-center items-center max-sm:min-h-[480px]">
          <div
            className=" p-[px] rounded-[10px] w-fit border-2"
            style={{
              background: themeProperties.boxBackgroundSolid,
              borderColor : themeProperties.specialColor,
            }}
          >
            <button
              onClick={googleLogin}
              className=" p-2 rounded-[10px] flex items-center "
            >
              <img src={GoogleImage} width={20} alt="Sign in with Google" />
              <span
                className="ml-2"
                style={{ color: themeProperties.specialColor }}
              >
                Sign in with Google
              </span>
            </button>
          </div>
          </div>
        ) : (
          <div className="p-2 min-h-80 max-sm:min-h-[480px]">
            <div className="GoogleCalendar">
              {meetings.length > 0 ? (
                <MeetingsTable meetings={meetings} themeProperties={themeProperties} />
              ) : (
                <div className="flex justify-center items-center h-full"
                  style={{ color: themeProperties.textColorLight }}>
                  No meetings scheduled today.
                </div>
              )}
            </div>
          </div>
        )}
<a
      href="https://calendar.google.com/calendar/u/0/r/eventedit?vcon=meet&dates=now&hl=en"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-4 right-4"
    >
      <button
        ref={buttonRef}
        className="scheduleMeetingButton"
        style={{
          background: themeProperties.buttonColor,
          color: themeProperties.textColorAlt,
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IoMdAdd size={25} />
        <span
          ref={textRef}
          className="scheduleMeetingText"
          style={{
            marginLeft: '10px',
            whiteSpace: 'nowrap',
          }}
        >
          Schedule a Meeting
        </span>
      </button>
    </a>
      </div>
      
      <CalendarModal
        open={isCalenderOpen}
        onClose={() => setCalenderOpen(false)}
        value={selectedDate}
        onChange={setSelectedDate}
        onSave={() => setCalenderOpen(false)}
      />
    </div>
  );
}

export default MeetingsBox;