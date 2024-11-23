import React, { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";

function Select({ options, text, info, setInfo, placeHolder }) {
  const [isInfoDropDownOpen, setInfoDropDownOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setInfoDropDownOpen(false)}>
      <div
        style={{
          height: "100%",
          width: "100%",
          border: "1px solid rgba(0,0,0,0.59)",
          display: "flex",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-13px",
            left: "13px",
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: "500",
            color: "rgba(0,0,0,0.94)",
            backgroundColor: "white",
          }}
        >
          {text}
        </div>
        <div
          style={{
            height: "100%",
            flex: "1",
            paddingLeft: "20px",
            fontFamily: "Inter",
            fontSize: "22px",
            fontWeight: "400",
            border: "none",
            outline: "none",
            userSelect: "none",
          }}
          onClick={() => setInfoDropDownOpen(!isInfoDropDownOpen)}
        >
          {info && info !== "" ? (
            <div
              style={{
                height: "100%",
                width: "100%",
                color: "rgba(0,0,0,0.65)",
                display: "flex",
                alignItems: "center",
              }}
            >
              {info}
            </div>
          ) : (
            <div
              style={{
                height: "100%",
                width: "100%",
                color: "rgba(144,144,144,0.65)",
                fontStyle: "italic",
                display: "flex",
                alignItems: "center",
              }}
            >
              {placeHolder}
            </div>
          )}
        </div>
        <div
          style={{
            width: "40px",
            display: "grid",
            placeContent: "center",
          }}
          onClick={() => setInfoDropDownOpen(!isInfoDropDownOpen)}
        >
          {isInfoDropDownOpen ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </div>
        {isInfoDropDownOpen && (
          <div
            style={{
              position: "absolute",
              top: "110%",
              width: "100%",
              maxHeight: "116px", // Changed height to maxHeight
              boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
              overflowY: "scroll",
              backgroundColor: "white",
              zIndex: "100",
            }}
          >
            {options.map((option, index) => (
              <div
                key={index} // Added key prop
                className="custom-scrollbar"
                style={{
                  width: "100%",
                  height: "40px",
                  fontFamily: "Lato",
                  fontSize: "18px",
                  fontWeight: "400",
                  color: "#202020",
                  paddingLeft: "20px",
                  borderBottom: "0.3px solid #414141",
                  display: "flex",
                  alignItems: "center",
                  userSelect: "none",
                }}
                onClick={() => setInfo(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default Select;
