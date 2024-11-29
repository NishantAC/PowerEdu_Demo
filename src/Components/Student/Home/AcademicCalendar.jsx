import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MyMonthlyCalendar } from "./Calendar";
import MonthSelect from "./MonthDropdown";
import YearSelect from "./YearDropdown";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import CalendarServices from "../../../services/calendar.service";

export default function AcademicCalendar() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const { user: currentUser } =
    useSelector((state) => state.user);

  // Fetch events from the calendar service
  const getEvents = () => {
    const body = {
      schoolcode: currentUser.schoolcode,
      classid: currentUser.classname,
    };
    CalendarServices.getEvents(body)
      .then((res) => {
        const transformedEvents = res.data.map((event) => ({
          title: event.event_name,
          start: event.start_date,
          end: event.end_date,
          extendedProps: {
            description: event.event_desc,
            isHoliday: event.isHoliday,
          },
        }));
        setEvents(transformedEvents);
      })
      .catch((err) => console.error("Error fetching events: ", err));
  };

  useEffect(() => {
    getEvents();
  }, []);

  const calendarRef = useRef(null); // Create a reference to the FullCalendar component

  const handleDateClick = (info) => {
    setDate(info.date);
    calendarRef.current.getApi().gotoDate(info.date);
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().on("dateClick", handleDateClick);
    }
  }, []);

  const handleCalendarDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="acdClndr">
      <div className="acdiv1">
        <div className="acd1d1">
          <span>Academic Calendar</span>
          <div className="acd1d2">
            <MonthSelect calendarRef={calendarRef} setDate={setDate} date={date} />
            &nbsp; &nbsp; &nbsp;
            <YearSelect calendarRef={calendarRef} setDate={setDate} date={date} />
          </div>
        </div>
      </div>
      <div className="acdiv2">
        {/* FullCalendar with Tailwind CSS for hover effect */}
        <FullCalendar
          ref={calendarRef}
          headerToolbar={false}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          height={340}
          selectable={true}
          date={date}
          eventDidMount={(info) => {
            const eventElement = info.el;
            const description = info.event.extendedProps.description;

            // Add Tailwind CSS classes for hover effect
            eventElement.classList.add("relative", "group");
            const tooltip = document.createElement("div");
            tooltip.className = "absolute left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300";
            tooltip.innerText = description;
            eventElement.appendChild(tooltip);
          }}
        />
      </div>
    </div>
  );
}