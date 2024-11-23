import React, { useEffect, useState } from "react";

function Button({ text, onClick }) {
  const [deviceSize, setDeviceSize] = useState("pc");
  useEffect(() => {
    const handleResize = () => {
      const screenSize = window.innerWidth;
      if (screenSize < 640) {
        setDeviceSize("sm");
      } else if (screenSize < 768) {
        setDeviceSize("md");
      } else if (screenSize < 1024) {
        setDeviceSize("xl");
      } else if (screenSize < 1280) {
        setDeviceSize("2xl");
      } else {
        setDeviceSize("pc");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <button className="left-container-btn"
      style={{
        width: "325px",
        color: "white",
        height: "60px",
        borderRadius: "10px",
        // backgroundColor: "transparent",
        // border: "1px solid #8B8B8B",
        fontFamily: "Poppins, sans-serif",
        // fontWeight: "600",
        // fontSize: `${deviceSize === "xl"
        //   ? "14px"
        //   : deviceSize === "md"
        //     ? "13px"
        //     : deviceSize === "sm"
        //       ? "2.6vw"
        //       : "18px"
        //   }`,
        // lineHeight: "27px",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
