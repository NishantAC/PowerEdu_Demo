import React, { useEffect, useRef } from "react";

const Clock = ({ themeProperties }) => {
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      // Correcting the rotation direction
      const secondDegrees = (seconds / 60) * 360 - 90;
      const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 - 90;
      const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30 - 90;

      if (secondRef.current) secondRef.current.style.transform = `rotate(${secondDegrees}deg)`;
      if (minuteRef.current) minuteRef.current.style.transform = `rotate(${minuteDegrees}deg)`;
      if (hourRef.current) hourRef.current.style.transform = `rotate(${hourDegrees}deg)`;
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock();

    return () => clearInterval(intervalId);
  }, []);

  const clockColor = themeProperties?.specialColor || "#6A4CA3"; // Default background color
  const handColor = themeProperties?.textColorAlt || "#000000"; // Default hand color

  return (
    <div
      style={{
        position: "relative",
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        backgroundColor: clockColor,
        border: `3px solid ${handColor}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Hour Hand */}
      <div
        ref={hourRef}
        style={{
          position: "absolute",
          width: "30%",
          height: "2px",
          backgroundColor: handColor,
          top: "50%",
          left: "50%",
          transformOrigin: "0% 50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "2px",
        }}
      />
      {/* Minute Hand */}
      <div
        ref={minuteRef}
        style={{
          position: "absolute",
          width: "40%",
          height: "1.5px",
          backgroundColor: handColor,
          top: "50%",
          left: "50%",
          transformOrigin: "0% 50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "2px",
        }}
      />
      {/* Second Hand */}
      <div
        ref={secondRef}
        style={{
          position: "absolute",
          width: "45%",
          height: "1px",
          backgroundColor: "red",
          top: "50%",
          left: "50%",
          transformOrigin: "0% 50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "2px",
        }}
      />
      {/* Center Dot */}
      <div
        style={{
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          backgroundColor: handColor,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Clock;
