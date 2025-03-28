import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { selectThemeProperties } from "@/slices/theme";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/Components/ui/button";
import { useSelector } from "react-redux";
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  const currentYear = new Date().getFullYear();
  const fromMonth = new Date(currentYear - 80, 0); // 5 years ago
  const toMonth = new Date(currentYear + 80, 11); // 5 years ahead


  const themeProperties = useSelector(selectThemeProperties);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      style={{
        backgroundColor: themeProperties?.inputBackground,
        color: themeProperties?.textColor,
      }}
      classNames={{
        months: "flex flex-ol sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        caption: "flex justify-between items-center pt-1 px-2",
        caption_label: "text-base hidden font-semibold text-primary",
        dropdown: "border border-gray-300 bg-white rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary",
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
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
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
        caption_dropdowns: "flex space-x-2",
        vhidden: "sr-only",
        ...classNames,
      }}
      Components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      captionLayout="dropdown" // Enables month and year dropdowns
      fromMonth={fromMonth} // Restrict the start of selectable months
      toMonth={toMonth} // Restrict the end of selectable months
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
