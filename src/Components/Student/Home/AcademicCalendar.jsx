import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MyMonthlyCalendar } from "./Calendar";
import MonthSelect from "./MonthDropdown";
import YearSelect from "./YearDropdown";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CalendarServices from "../../../services/calendar.service";

export default function AcademicCalendar() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const { user: currentUser } = useSelector((state) => state.user);

  // Fetch events from the calendar service
  const getEvents = () => {
    const body = {
      school_id: currentUser.school_id,
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

  const calendarRef = useRef(null); // Create a reference to the Calendar component

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
        <Popover>
          <PopoverTrigger>
            <button>Open Calendar</button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              ref={calendarRef}
              date={date}
              onChange={handleCalendarDateChange}
              events={events}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}