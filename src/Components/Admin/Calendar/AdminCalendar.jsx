import React, { useEffect, useRef, useState } from "react";
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
import { Calendar } from "rsuite";
import "rsuite/dist/rsuite.min.css";

function AdminCalendar() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [holidayEvents, setHolidayEvents] = useState([]);
  const [schoolEvents, setSchoolEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [holiday, setHoliday] = useState(null);
  const [editData, setEditData] = useState(null);
  const themeProperties = useSelector((state) => state.themeProperties);

  const dispatch = useDispatch();
  const { googleEvents } = useSelector((state) => state.calendarSlice);
  const { user: currentUser } = useSelector((state) => state.user);
  const calendarRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const dbEventsRes = await CalendarServices.getEventsForManagement(
          currentUser.schoolcode
        );
        const googleEventsRes = await dispatch(getGoogleEvents());

        const dbEvents = dbEventsRes.data.map(transformEventFromDB);
        const googleEvents = googleEventsRes.payload.map(transformEventFromGoogle);

        const mergedEvents = [...dbEvents, ...googleEvents];
        setEvents(mergedEvents);
        separateEvents(mergedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, [dispatch, currentUser]);

  const transformEventFromDB = (event) => ({
    id: event.id,
    title: event.event_name,
    start: event.start_date,
    end: event.end_date,
    isHoliday: event.isHoliday,
    extendedProps: {
      description: event.event_desc,
    },
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

  const separateEvents = (events) => {
    setHolidayEvents(events.filter((e) => e.isHoliday));
    setSchoolEvents(events.filter((e) => !e.isHoliday));
  };

  return (
    <div
      className="w-full h-full p-4 rounded-lg overflow-hidden"
      style={{ backgroundColor: themeProperties?.borderColor, color: themeProperties?.textColorAlt }}
    >
      <div
        className="flex flex-col items-center justify-between p-6 rounded-lg"
        style={{ backgroundColor: themeProperties?.background, color: themeProperties?.textColorAlt }}
      >

        <div className="mb-4">
          <Calendar
            bordered
            value={date}
            onChange={(value) => setDate(value)}
            className={`rounded-lg shadow-lg `}
            style={{ backgroundColor: themeProperties?.background, color: themeProperties?.textColorAlt }}
            
          />
        </div>
        <div className="grid grid-cols-1 gap-4 w-full"> 
          <div className="p-4 border rounded-lg shadow-lg " style={{ color: themeProperties?.textColorAlt }}>
            <HolidayEvents
              setOpen={setOpen}
              setHoliday={setHoliday}
              holidayEvents={holidayEvents}
              setEditData={setEditData}
              getEvents={() => {
                dispatch(getGoogleEvents());
              }}
            />
          </div>
          <div className="p-4 border rounded-lg shadow-lg bg-white" style={{ color: themeProperties?.textColorAlt }}>
            <SchoolEvents
              setOpen={setOpen}
              setHoliday={setHoliday}
              schoolEvents={schoolEvents}
              setEditData={setEditData}
              getEvents={() => {}}
            />
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <AddEventModal
        open={open}
        setOpen={setOpen}
        holiday={holiday}
        getEvents={() => {}}
        editData={editData}
        setEditData={setEditData}
        setHoliday={setHoliday}
      />
    </div>
  );
}

export default AdminCalendar;
