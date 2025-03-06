"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useSelector } from "react-redux"
import { selectThemeProperties } from "@/slices/theme";
import MeetingDetailsDialog from "../Meeting/MeetingDetailsDialog";
import moment from "moment"

function Calendarmini({
  className,
  classNames,
  showOutsideDays = true,
  googleEvents,
  circularsArray,
  ...props
}) {
  const themeProperties = useSelector(selectThemeProperties);
  const googleEventDates = googleEvents.map(event => new Date(event.start.dateTime).toDateString());

  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  function handleDayClick(date) {
    const event = googleEvents.find(
      (e) => new Date(e.start.dateTime).toDateString() === date.toDateString()
    );
    if (event) {
      setSelectedEvent(event);
      setOpen(true);
    }
  }

  return (
    <>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn(" flex items-center justify-center scale-95 py-2 ", className)}
        style={{
          backgroundColor: themeProperties?.inputBackground,
          color: themeProperties?.textColor,
        }}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 ",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] ",
          row: "flex w-full mt-2 flex-nowrap w-full",
          cell: cn(
            "relative p-[2px] text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          ),
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
          ),
          day_range_start: "day-range-start",
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ className, ...props }) => (
            <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
          ),
          IconRight: ({ className, ...props }) => (
            <ChevronRight className={cn("h-4 w-4", className)} {...props} />
          ),
        }}
        modifiers={{
          googleEvent: (date) => googleEventDates.includes(date.toDateString()),
        }}
        modifiersClassNames={{
          googleEvent: "bg-red-500 text-white cursor-pointer hover:bg-red-600 hover:text-white",
        }}
        onDayClick={handleDayClick}
        {...props}
      />
      {open && (
        <MeetingDetailsDialog
          open={open}
          setOpen={setOpen}
          meeting={selectedEvent}
          onOpenChange={setOpen}
          themeProperties={themeProperties}
          date={moment(selectedEvent.start.dateTime).format("DD-MM-YYYY")}
        />
      )}
    </>
  )
}

Calendarmini.displayName = "Calendarmini"

export { Calendarmini }