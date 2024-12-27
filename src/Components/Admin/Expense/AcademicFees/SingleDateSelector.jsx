import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import InputParent from "./InputParent";

function SingleDateSelector({ correctFormatDate, isEditMode, info, setInfo }) {
  const [isDateOpened, setDateOpened] = useState(false);
  const [isCalenderOpen, setCalenderOpen] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      setDateOpened(true);
    }
  }, [isEditMode]);

  function doubleDigit(number) {
    return number > 9 ? number : `0${number}`;
  }

  function reverseFormatDate(date) {
    const day = doubleDigit(date.getDate());
    const month = doubleDigit(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // Function to handle date change from calendar
  const handleDateChange = (newDate) => {
    setInfo(reverseFormatDate(newDate));
    setCalenderOpen(false); // Close the calendar after selecting a date
  };

  const getParsedDate = () => {
    const parsedDate = info ? new Date(info) : null;
    return parsedDate;
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (!info && !isEditMode) setDateOpened(false);
        setCalenderOpen(false);
      }}
    >
      <div className="dueDate">
      <InputParent text="Due Date *">

        {/* <InputParent text="Fee Frequency *"> */}
          {isDateOpened ? (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontFamily: "Lato",
                  fontWeight: "500",
                  fontSize: "18px",
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  paddingLeft: "10px",
                  gap: "10px",
                }}
              >
                {info ? (
                  <div>{correctFormatDate(info)}</div>
                ) : (
                  <div style={{ color: "#909090", opacity: "0.65" }}>
                    dd-mm-yyyy
                  </div>
                )}
              </div>
              <div
                style={{
                  color: "#909090",
                  opacity: "0.65",
                  height: "20px",
                  width: "18px",
                  display: "grid",
                  placeContent: "center",
                }}
                onClick={() => {
                  if (!info) setDateOpened(false);
                  setCalenderOpen(!isCalenderOpen);
                }}
              >
                <CalendarTodayIcon />
              </div>
            </div>
          ) : (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 10px",
              }}
              onClick={() => {
                setDateOpened(true);
                setCalenderOpen(true);
              }}
            >
              <div
                style={{
                  fontFamily: "Inter",
                  fontWeight: "400",
                  fontStyle: "italic",
                  fontSize: "22px",
                  color: "#909090",
                  opacity: "0.65",
                }}
              >
                Select Date
              </div>
              <div
                style={{
                  color: "#909090",
                  opacity: "0.65",
                  height: "20px",
                  width: "18px",
                  display: "grid",
                  placeContent: "center",
                }}
              >
                <CalendarTodayIcon />
              </div>
            </div>
          )}
        </InputParent>

        {isCalenderOpen && (
          <Popover>
            <PopoverTrigger asChild>
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  zIndex: "30",
                  width: "300px",
                }}
              >
                <Calendar onChange={handleDateChange} value={getParsedDate()} />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar onChange={handleDateChange} value={getParsedDate()} />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default SingleDateSelector;
