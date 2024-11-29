import React, { useEffect, useRef, useState } from "react";
import "./PrincipalCalendar.css";
import CircleIcon from "@mui/icons-material/Circle";
import FullCalendar from "@fullcalendar/react";
import MonthSelect from "../../Student/Home/MonthDropdown";
import YearSelect from "../../Student/Home/YearDropdown";
import { useDispatch, useSelector } from "react-redux";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarServices from "../../../services/calendar.service";
import { getGoogleEvents } from "../../../slices/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import HolidayEvents from "./HolidayEvents";
import SchoolEvents from "./SchoolEvents";
import AddEventModal from "./AddEventModal";
function PrincipalCalendar() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
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
      if (event.event_type !== "normal") {
        if (event.isHoliday) holidayEventsArray.push(event);
        else schoolEventsArray.push(event);
      }
    });

    setHolidayEvents(holidayEventsArray);
    setSchoolEvents(schoolEventsArray);
  };

  const getEvents = async () => {
    try {
      const dbEventsRes = await CalendarServices.getEventsForManagement(currentUser.schoolcode);
      const googleEventsRes = await dispatch(getGoogleEvents());

      const dbEvents = dbEventsRes.data.map(transformEventFromDB);
      const googleEvents = googleEventsRes.payload.map(transformEventFromGoogle);

      const mergedEvents = [...dbEvents, ...googleEvents];
      setEvents(mergedEvents);
      separateEvents(mergedEvents);
    } catch (err) {
      console.error("Error fetching events: ", err);
    }
  };

  const transformEventFromDB = (event) => ({
    id: event.id,
    school_code: event.school_code,
    class_code: event.class_code,
    title: event.event_name,
    event_type: event.event_type,
    start: event.start_date,
    end: event.end_date,
    isHoliday: event.isHoliday,
    extendedProps: { description: event.event_desc },
  });

  const transformEventFromGoogle = (event) => ({
    id: event.id,
    title: event.summary,
    start: event.start.dateTime,
    end: event.end.dateTime,
    extendedProps: {
      description: event.description,
      hangoutLink: event.hangoutLink,
    },
  });

  useEffect(() => {
    getEvents();
  }, [dispatch, currentUser]);

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

  return (
    <div style={{ display: "flex" }}>
      <div className="prncplclndr">
        <div>
          <p style={{ fontFamily: "Roboto", fontSize: "18px", color: "#4D4D4D" }}>
            Home &gt; <b><u>Calendar</u></b>
          </p>
        </div>
        <br />
        <div className="acdClndr">
          <div className="acdiv1">
            <div className="acd1d2">
              <MonthSelect
                calendarRef={calendarRef}
                setDate={setDate}
                date={date}
              />
              &nbsp; &nbsp; &nbsp;
              <YearSelect
                calendarRef={calendarRef}
                setDate={setDate}
                date={date}
              />
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
                const tooltipContent = (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>{info.event.title}</TooltipTrigger>
                      <TooltipContent>
                        <p>{info.event.extendedProps.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
                info.el.appendChild(tooltipContent);
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

      <div style={{ flex: "0.2", padding: "0 10px", background: "#FFFFFF", marginTop: "5px" }}>
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

export default PrincipalCalendar;