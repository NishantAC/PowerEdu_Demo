import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Grid,
  Typography,
  IconButton,
  Box,
  Badge,
  styled,
  MenuItem,
  Select,
} from "@mui/material";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  setMonth,
  setYear,
} from "date-fns";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import CalendarServices from "../../services/calendar.service";
import { getGoogleEvents } from "../../slices/calendar";
import AddEventModal from "./AddEventModal";
import { selectThemeProperties } from "@/slices/theme";

import {
  Select as SelectShadCn,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

const StyledDay = styled(Paper)(({ theme, isSelected, isToday, isCurrentMonth, hasEvents, themeProperties }) => ({
  height: '80px', // Increased height for better spacing
  padding: '20px',
  display: isCurrentMonth ? 'flex' : 'none',
  margin: '8px',
  flexDirection: 'column',
  cursor: 'pointer',
  backgroundColor: isSelected
    ? `${themeProperties.specialColor}`
    : isToday
    ? `${theme.palette.grey[200]}80`
    : `${themeProperties.boxBackgroundSolid}`,
  color: !isCurrentMonth
    ? themeProperties.textColorAlt
    : isSelected
    ? themeProperties.textColorAlt
    : 'inherit',

  borderRadius: '8px',
  transition: 'all 0.2s ease',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: 'none',
  outline: '2px solid transparent',
  
  
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: isCurrentMonth &&  '0 4px 8px rgba(0,0,0,0.1)',
    outline: hasEvents ? `2px solid #ff662e` : `2px solid ${themeProperties.specialColor}`,


    '& $eventDot': {
      transform: 'scale(1.2)',
    },


  },
}));

const EventDot = styled('div')(({ color }) => ({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: color || '#1976d2',
  margin: '1px',
}));

const EventPreview = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '4px',
  left: '4px',
  right: '4px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2px',
}));

const CalendarHeader = styled(Box)(({ theme }) => ({
  borderRadius: '12px',
  marginBottom: '18px',
  display: 'flex',
  justifyContent: 'center',
  gap: '16px',
  alignItems: 'center',
}));


function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [holiday, setHoliday] = useState(null);
  const [editData, setEditData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "MMMM"));
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const themeProperties = useSelector(selectThemeProperties);
  const circulars = useSelector(
    (state) => state.circularManagementSlice.circulars
  );
  const dispatch = useDispatch();
  const { googleEvents } = useSelector((state) => state.calendarSlice);
  const { user: currentUser } = useSelector((state) => state.user);

  const months = Array.from({ length: 12 }, (_, i) => format(setMonth(new Date(), i), "MMMM"));
  const years = Array.from({ length: 21 }, (_, i) => (new Date().getFullYear() - 10 + i).toString());

  const getEvents = () => {
    const dbEventsPromise = CalendarServices.getEventsForManagement(currentUser.school_id);
    const googleEventsPromise = dispatch(getGoogleEvents());

    Promise.all([dbEventsPromise, googleEventsPromise])
      .then(([dbEventsRes, googleEventsRes]) => {
        const dbEvents = dbEventsRes.data.map(transformEventFromDB);
        const googleEvents = googleEventsRes.payload.map(transformEventFromGoogle);
        const mergedEvents = [...dbEvents, ...googleEvents];
        setEvents(mergedEvents);
      })
      .catch((err) => console.error("error is ", err));
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

  useEffect(() => {
    getEvents();
  }, [currentDate]);

  const handleMonthChange = (month, index) => {
    setSelectedMonth(month);
    setCurrentDate(setMonth(currentDate, index)); // Update currentDate with the selected month
  };

  
  const handleYearChange = (year) => {
    console.log(year);
    setCurrentDate(setYear(currentDate, parseInt(year, 10))); 
    setSelectedYear(year);

  };
  const renderHeader = () => (
    <CalendarHeader 
    >
      <IconButton 
        onClick={() => {
          setCurrentDate(subMonths(currentDate, 1));
          setSelectedMonth(format(subMonths(currentDate, 1), "MMMM"));
          setSelectedYear(format(subMonths(currentDate, 1), "yyyy"));
        }}
        sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <SelectShadCn  value={selectedMonth} onValueChange={(value) => handleMonthChange(value, months.indexOf(value))}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder={selectedMonth} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Months</SelectLabel>
              {months.map((month, index) => (
                <SelectItem key={index} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </SelectShadCn>
  
        <SelectShadCn value={selectedYear} onValueChange={(value) => handleYearChange(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder={selectedYear} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Years</SelectLabel>
              {years.map((year, index) => (
                <SelectItem key={index} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </SelectShadCn>
      </Box>
      <IconButton 
        onClick={() => {
          setCurrentDate(addMonths(currentDate, 1));
          setSelectedMonth(format(addMonths(currentDate, 1), "MMMM"));
          setSelectedYear(format(addMonths(currentDate, 1), "yyyy"));
        }}
        sx={{ '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }}
      >
        <NavigateNextIcon />
      </IconButton>
    </CalendarHeader>
  );


  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <Grid item xs key={i}>
          <Typography align="center" sx={{ fontWeight: "semibold", 
            color: themeProperties.specialColor
           }}>
            {format(addDays(startDate, i), "EEEE")}
          </Typography>
        </Grid>
      );
    }

    return <Grid container spacing={1}>{days}</Grid>;
  };

const renderCells = () => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const rows = [];
  let days = [];
  let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDay = day;
        const dayEvents = events?.filter((event) =>
          isSameDay(new Date(event.start), currentDay)
        );
        days.push(
          <Grid item xs key={day.toString()}>
            <StyledDay
              isSelected={isSameDay(day, selectedDate)}
              isToday={isSameDay(day, new Date())}  
              isCurrentMonth={isSameMonth(day, monthStart)}
              hasEvents={dayEvents?.length > 0}
              onClick={() => {
                setSelectedDate(currentDay);
                setOpen(true);
              }}
              themeProperties={themeProperties}
            >
              <Typography variant="body2" sx={{ textAlign: 'right' }}>
                {format(day, "d")}
              </Typography>
              <EventPreview>
                {dayEvents?.map((event, index) => (
                  <EventDot 
                    key={index}
                    color={event.isHoliday ? '#f44336' : '#1976d2'}
                  />
                ))}
              </EventPreview>
            </StyledDay>
          </Grid>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <Grid container spacing={1} key={day.toString()}>
          {days}
        </Grid>
      );
      days = [];
    }
    return rows;
  };

  return (
    <div className=" p-2 h-full">
    <div className="flex gap-2 h-full p-2" 
      style={{
        background: themeProperties.boxBackgroundSolid,
        color: themeProperties.textColor,
        borderRadius: '12px',
      }}
    >
      <div className=" flex-1">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      <AddEventModal
        open={open}
        setOpen={setOpen}
        holiday={holiday}
        getEvents={getEvents}
        setEditData={setEditData}
        setHoliday={setHoliday}
        selectedDate={selectedDate}
        events={events}
      />
    </div>
        
    </div>
  );
}

export default Calendar;