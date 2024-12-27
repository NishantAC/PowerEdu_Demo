import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import InputParent from "./InputParent";

function RangeDateSelector({ correctFormatDate, isEditMode, info, setInfo }) {
  const [isStartEndDateOpened, setStartEndDateOpened] = useState(false);
  const [isCalenderOpen, setCalenderOpen] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      setStartEndDateOpened(true);
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

  const getParsedDate = (date) => {
    const parsedDate = date ? new Date(date) : null;
    return parsedDate;
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        if ((!info.start_date || !info.end_date) && !isEditMode)
          setStartEndDateOpened(false);
        setCalenderOpen(false);
      }}
    >
      <div className="startEndDate">
        <InputParent text="Start/End Date *">
          {isStartEndDateOpened ? (
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
                {info.start_date ? (
                  <div>{correctFormatDate(info.start_date)}</div>
                ) : (
                  <div style={{ color: "#909090", opacity: "0.65" }}>
                    dd-mm-yyyy
                  </div>
                )}
                <div>-</div>
                {info.end_date ? (
                  <div>{correctFormatDate(info.end_date)}</div>
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
                  if (!info.start_date || !info.end_date)
                    setStartEndDateOpened(false);
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
                setStartEndDateOpened(true);
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
            <PopoverTrigger>
              <button>Open Calendar</button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                onChange={(newDate) => {
                  setInfo({ ...info, start_date: reverseFormatDate(newDate) });
                }}
                value={getParsedDate(info.start_date)}
              />
              <Calendar
                onChange={(newDate) => {
                  setInfo({ ...info, end_date: reverseFormatDate(newDate) });
                }}
                value={getParsedDate(info.end_date)}
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default RangeDateSelector;
