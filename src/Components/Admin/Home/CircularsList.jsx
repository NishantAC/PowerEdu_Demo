import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CircularService from "../../../services/circular.service";
import moment from "moment";

function CircularsList({ themeProperties }) {
  const [deviceSize, setDeviceSize] = useState("pc");

  useEffect(() => {
    const handleResize = () => {
      const screenSize = window.innerWidth;
      if (screenSize < 640) {
        setDeviceSize("sm");
      } else if (screenSize < 720) {
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

  const { user } = useSelector((state) => state.user);
  const [circularsArray, setCircularsArray] = useState([]);
  useEffect(() => {
    CircularService.getCirculars(user?.school_code).then((res) => {
      res.forEach((circular, index) => {
        const newRow = {
          id: circular.id,
          subject: circular.title,
          date: moment(circular.date).format("DD-MM-YYYY"),
        };
        setCircularsArray((prevState) => [...prevState, newRow]);
      });
    });
  }, [user]);

  return (
    <div
      className={`min-h-[72vh] w-full lg:w-4/5 flex flex-col rounded-[20px] shadow-md bg-white overflow-hidden`}
    >
      {/* top heading box */}
      <div className="w-full h-15 rounded-t-lg flex items-center p-2 justify-center">
        <div
          className={`font-poppins ${deviceSize === "sm" ? "text-lg" : "text-xl"} text-center text-black bg-white`}
          style={{
            color: themeProperties.normal2,
            borderBottom: `2px solid ${themeProperties.primaryColor}`,
          }}
        >
          Circulars
        </div>
      </div>

      {/* bottom box */}
      <div className="h-75 flex flex-col pt-4 rounded-b-lg bg-white">
        {/* title */}
        <div
          className="flex justify-between text-end px-4 font-poppins text-lg"
          style={{
            color: themeProperties.textColorAlt,
          }}
        >
          <p className="w-50">Subject</p>
          <p className="w-28">Date</p>
        </div>

        {/* List of circulars box */}
        <div className="custom-scrollbar h-4/5 w-full flex flex-col overflow-y-scroll px-5 bg-white rounded-b-lg">
          {circularsArray.map((circular, index) => (
            <div
              key={index}
              className={`flex items-center justify-between font-roboto ${deviceSize === "sm" ? "text-base" : "text-lg"} font-normal leading-5 py-4`}
            >
              <div className="w-50">{circular.subject}</div>
              <div className="w-25">{circular.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CircularsList;