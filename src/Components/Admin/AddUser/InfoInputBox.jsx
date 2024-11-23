import React from "react";

const InfoInputBox = ({ text, inputType }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        border: "1px solid rgba(0,0,0,0.59)",
        position: "relative",
      }}
    >
      {inputType === "date" ? (
        <input
          type="date"
          style={{
            height: "100%",
            width: "100%",
            padding: "0px 10px",
            color: "rgba(0,0,0,0.65)",
            border: "none",
            outline: "none",
            userSelect: "none",
          }}
        />
      ) : (
        <input
          style={{
            height: "100%",
            width: "100%",
            paddingLeft: "20px",
            fontFamily: "Inter",
            fontSize: "22px",
            fontWeight: "400",
            color: "rgba(0,0,0,0.65)",
            border: "none",
            outline: "none",
          }}
        />
      )}

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
          color: "black",
          zIndex: "10",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default InfoInputBox;
