import React, { useEffect, useState } from "react";
import HandWave from "../../../icons/HandWave";
import Information from "./Information";
import MeetingsBox from "../../Meeting/MeetingsBox";
import { CSSTransition } from "react-transition-group";
import CreateNewUserModal from "./Modals/CreateNewUserModal";
import AddEventModal from "./Modals/AddEventModal";
import { useNavigate } from "react-router-dom";
import { selectThemeProperties } from "@/slices/theme";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [deviceSize, setDeviceSize] = useState("pc");
  const yearArray = [];
  for (let year = 1951; year <= 2050; year++) {
    yearArray.push(year.toString());
  }
  const themeProperties = useSelector(selectThemeProperties);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

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
    <div
      className={`flex pb-3 gap-4 max-xl:flex-col `}
     
    >
      <div 
        style={{
          background: themeProperties.secondaryColor,
          borderRadius: "20px",
          overflow: "hidden",
        }}>

      {/* Left Section */}
      <div
        className={`shadow-lg flex h-full flex-col p-2 gap-2`}
        style={{
          color: themeProperties.textColor,
          // background: "rgba(255, 255, 255, 0.6)",
          }}
      >
        <div 
          className=" bg-white rounded-[20px] p-3 shadow-lg "
        >
          <div className="  py-2  "
          style={{color: themeProperties.normal2}}
          >
            <h3 className="opacity-90 font-sans"> Welcome</h3>
            <h1 className="text-4xl font-semibold font-work-sans">
            {user?.firstname}
            </h1>
          </div>


          <div
            className={`flex gap-2 flex-col items-center`}
          >
            <div className=" flex gap-2 items-center justify-center">
              <div>
                <CreateNewUserModal themeProperties = {themeProperties}/>

              </div>
              <div>
                <AddEventModal  themeProperties = {themeProperties}/>

              </div>
            </div>
            <a
              href="https://calendar.google.com/calendar/u/0/r/eventedit?vcon=meet&dates=now&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className=" text-nowrap"
                style={{
                  background: themeProperties.normal2,
                  color: themeProperties.textColor,
                  borderRadius: "10px",
                  padding: "10px 48px",
                  width: "100%",

                }}
              >
                Schedule A Meeting
              </button>
            </a>
          </div>

        </div>
          <div className={` flex-1`}>
            <MeetingsBox />
          </div>
      </div>
      </div>

      {/* Right Section */}

      <div className="flex-1"
        style={{ backgroundColor: themeProperties.background }}
      >
        <Information />
      </div>

    </div>
  );
}

export default Home;