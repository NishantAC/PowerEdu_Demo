import React, { useEffect, useRef, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import FullCalendar from "@fullcalendar/react";
import MonthSelect from "../../Student/Home/MonthDropdown";
import YearSelect from "../../Student/Home/YearDropdown";
import { useDispatch, useSelector } from "react-redux";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarServices from "../../../services/calendar.service";
import { getGoogleEvents } from "../../../slices/calendar";
import HolidayEvents from "./HolidayEvents";
import AddEventModal from "./AddEventModal";
import SchoolEvents from "./SchoolEvents";

function AdminCalendar() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState();
  const [holidayEvents, setHolidayEvents] = useState([]);
  const [schoolEvents, setSchoolEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [holiday, setHoliday] = useState(null);
  const [editData, setEditData] = useState(null);

  const dispatch = useDispatch();

  const { googleEvents } = useSelector((state) => state.calendarSlice);

  const { user: currentUser } =
    useSelector((state) => state.user) ;

  const separateEvents = (events) => {
    const holidayEventsArray = [];
    const schoolEventsArray = [];

    events.forEach((event) => {
      if (event.event_type !== "normal" && event.isHoliday === true) {
        holidayEventsArray.push(event);
      } else if (event.event_type !== "normal" && event.isHoliday === false) {
        schoolEventsArray.push(event);
      }
    });

    setHolidayEvents(holidayEventsArray);
    setSchoolEvents(schoolEventsArray);
  };

  const getEvents = () => {
    const dbEventsPromise = CalendarServices.getEventsForManagement(currentUser.schoolcode);
    const googleEventsPromise = dispatch(getGoogleEvents());

    Promise.all([dbEventsPromise, googleEventsPromise])
      .then(([dbEventsRes, googleEventsRes]) => {
        const dbEvents = dbEventsRes.data.map(transformEventFromDB);
        const googleEvents = googleEventsRes.payload.map(transformEventFromGoogle);
        const mergedEvents = [...dbEvents, ...googleEvents];
        setEvents(mergedEvents);
        separateEvents(mergedEvents);
      })
      .catch((err) => console.error("error is ", err));
  };

  const transformEventFromDB = (event) => {
    return {
      id: event.id,
      school_code: event.school_code,
      class_code: event.class_code,
      title: event.event_name,
      event_type: event.event_type,
      start: event.start_date,
      end: event.end_date,
      isHoliday: event.isHoliday,
      extendedProps: {
        description: event.event_desc,
      },
    };
  };

  const transformEventFromGoogle = (event) => {
    return {
      id: event.id,
      title: event.summary,
      start: event.start.dateTime,
      end: event.end.dateTime,
      extendedProps: {
        description: event.description,
        hangoutLink: event.hangoutLink,
      },
    };
  };

  useEffect(() => {
    getEvents();
    dispatch(getGoogleEvents());
  }, []);

  const calendarRef = useRef(null);

  const handleDateClick = (info) => {
    setDate(info.date);
    calendarRef.current.getApi().gotoDate(info.date);
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().on("dateClick", handleDateClick);
    }
  }, []);

  const handleEventMouseEnter = (info) => {
    const popover = document.createElement("div");
    popover.className = "absolute bg-white p-2 rounded shadow-lg";
    popover.style.left = `${info.jsEvent.pageX}px`;
    popover.style.top = `${info.jsEvent.pageY}px`;
    popover.innerHTML = `<p>${info.event.extendedProps.description}</p>`;
    document.body.appendChild(popover);

    info.el.addEventListener("mouseleave", () => {
      document.body.removeChild(popover);
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="prncplclndr">
        <div>
          <p
            style={{
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "18px",
              lineHeight: "21px",
              color: "#4D4D4D",
            }}
          >
            Home &gt; <b><u>Calendar</u></b>
          </p>
        </div>
        <br />
        <div style={{ bottom: "30px", position: "relative", right: "20px" }} className="acdClndr py-4">
          <div className="acdiv1">
            <div className="acd1d2">
              <MonthSelect calendarRef={calendarRef} setDate={setDate} date={date} />
              &nbsp; &nbsp; &nbsp;
              <YearSelect calendarRef={calendarRef} setDate={setDate} date={date} />
            </div>
          </div>
          <div className="acdiv2">
            <FullCalendar
              ref={calendarRef}
              headerToolbar={false}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              height={330}
              selectable={true}
              date={date}
              eventDidMount={(info) => {
                info.el.addEventListener("mouseenter", (e) => handleEventMouseEnter(info));
              }}
              eventClick={(info) => {
                if (info.event.extendedProps.hangoutLink) {
                  window.open(info.event.extendedProps.hangoutLink, "_blank");
                }
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          flex: "0.2",
          padding: "0 10px",
          background: "#FFFFFF",
          marginTop: "5px",
        }}
      >
        <HolidayEvents
          setOpen={setOpen}
          setHoliday={setHoliday}
          holidayEvents={holidayEvents}
          setEditData={setEditData}
          getEvents={getEvents}
        />
        <SchoolEvents
          setOpen={setOpen}
          setHoliday={setHoliday}
          schoolEvents={schoolEvents}
          setEditData={setEditData}
          getEvents={getEvents}
        />
      </div>
      <AddEventModal
        open={open}
        setOpen={setOpen}
        holiday={holiday}
        getEvents={getEvents}
        editData={editData}
        setEditData={setEditData}
        setHoliday={setHoliday}
      />
    </div>
  );
}

export default AdminCalendar;