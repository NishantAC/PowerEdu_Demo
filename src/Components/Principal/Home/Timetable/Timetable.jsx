import React, { useEffect, useState } from "react";
import "./Timetable.css";
import "../../../Student/Home/Home.css";
import "../../../Teacher/Home/Calendar.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "../../../Teacher/Home/ToDoModal.module.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import CalendarModal from "../Calendar/CalendarModal";
import moment from "moment";
import { useGoogleLogin } from "@react-oauth/google";
import { checkAuth, googleAuth } from "../../../../services/mail.service";
import { useDispatch, useSelector } from "react-redux";
import { getGoogleEvents } from "../../../../slices/calendar";

export default function Timetable() {
  const [value, setValue] = useState(new Date());
  
  const [openClndr, setOpenclndr] = useState(false);
  const openclndr = () => setOpenclndr(true);
  const closeclndr = () => setOpenclndr(false);
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [meetings, setMeetings] = useState([]);
  

  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.user);
  const { googleEvents } = useSelector((state) => state.calendarSlice);

  useEffect(() => {
    checkUserAuthorization();
    dispatch(getGoogleEvents());
  }, []);

  useEffect(() => {
    filterMeetings();
  }, [value, googleEvents]);

  const checkUserAuthorization = async () => {
    const response = await checkAuth(currentUser.id);
    setIsAuthorised(response?.data?.isAuthorised);
  };

  const filterMeetings = () => {
    const filteredMeetings = googleEvents.filter((event) => {
      if (!event.hangoutLink) return false;
      const eventStartDate = new Date(event.start.dateTime).setHours(0, 0, 0, 0);
      const eventEndDate = new Date(event.end.dateTime).setHours(0, 0, 0, 0);
      const selectedDate = new Date(value).setHours(0, 0, 0, 0);
      return eventStartDate <= selectedDate && selectedDate <= eventEndDate;
    });
    setMeetings(filteredMeetings);
  };

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
      toast.success("Authentication failed!", { autoClose: 500 });
    },
  });

  const timeSlots = [
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  const convertTimeToHHMM = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="timetable">
      <div className="timetablediv1">
        <div className="flex justify-between items-center p-3 w-full">
          <h2 className="font-sans font-semibold text-lg">Meeting</h2>
          <button className="timetabledate" onClick={openclndr}>
            {moment(value).format("DD-MM-YYYY")}
          </button>
        </div>
      </div>
      {!isAuthorised ? (
        <div>
          <Box>
            <button onClick={googleLogin} className={styles.googlebtn}>
              Sign in with Google
            </button>
          </Box>
        </div>
      ) : (
        <div className="p-2">
          <table className="w-full">
            <tbody>
              {timeSlots.map((time, index) => {
                const meet = meetings.find(
                  (entry) => convertTimeToHHMM(entry.start.dateTime) === time
                );

                return (
                  <tr className="sublec" key={index}>
                    <td className="trt">
                      <span> {time} </span>
                    </td>
                    <td className="sub">
                      {meet && (
                        <div className="lec">
                          <a
                            href={meet.hangoutLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline text-black"
                          >
                            <span>{meet.summary}</span>
                          </a>
                          <div className="absolute bg-white p-2 shadow-lg rounded-md">
                            {meet.description}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <CalendarModal
        open={openClndr}
        onClose={closeclndr}
        value={value}
        onChange={setValue}
        onSave={closeclndr}
      />
    </div>
  );
}