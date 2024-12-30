import React from "react";

function InputParent({ children, text }) {
  
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        border: "1px solid rgba(0,0,0,0.59)",
        position: "relative",
      }}
    >
      {children}
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
          zIndex: "10",
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default InputParent;
