import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import './CalendarBox.css';

const CalendarBox = ({ date, themeProperties }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);

  const handleEventClick = (info) => {
    setEventDetails(info.event);
    setIsDialogOpen(true);
  };

return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "",
        }}
        events={[
          { title: "event 1", date: "2024-11-12" },
          { title: "event 2", date: "2024-11-13" },
        ]}
        initialDate={date}
        eventClick={handleEventClick}
        dayCellClassNames={(date) => {
          if (date.isToday) {
            return 'fc-day-today';
          }
          return '';
        }}
        buttonText={{
          customButton: 'Custom Text'
        }}
        
        
      />

      <style jsx>{`

        .fc .fc-daygrid-day.fc-day-today {
          background: ${themeProperties.normal1};
        }
        .fc-prev-button.fc-button.fc-button-primary,
        .fc-next-button.fc-button.fc-button-primary,
        .fc-today-button.fc-button.fc-button-primary {
          background: ${themeProperties.textColor};
          color: ${themeProperties.normal2};
          border : 0px ;
          text-transform: capitalize;
          border-radius: 5px;
          border: 1px solid ${themeProperties.textColor}; 
          
        }

        .fc-prev-button.fc-button.fc-button-primary:hover,
        .fc-next-button.fc-button.fc-button-primary:hover,
        .fc-today-button.fc-button.fc-button-primary:hover {
          background: ${themeProperties.normal2};
          color: ${themeProperties.textColor};
          border : 0px ;
          text-transform: capitalize;
          border: 1px solid ${themeProperties.textColor}; 
          cursor: pointer;
          
        }


        .fc-toolbar-title {
          color: ${themeProperties.textColor};
        }
        .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
          color: ${themeProperties.textColor} !important;
        }
          .fc .fc-toolbar.fc-header-toolbar {
          background: ${themeProperties.normal2} !important;
      }

        .fc-event-title-container {
          background: ${themeProperties.normal2};
          color: ${themeProperties.textColor};
        }


        .fc-event-title-container:hover {
          background: ${themeProperties.normal2};
          color: ${themeProperties.textColor};
          cursor: pointer;
        }
        
      `}</style>

      {eventDetails && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button style={{ display: "none" }}>Open</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{eventDetails.title}</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
);
};

export default CalendarBox;