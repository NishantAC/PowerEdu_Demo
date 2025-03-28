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
      className={`flex max-xl:flex-col h-full max-lg:min-h-[100vh]`}
     
    >
      {/* Left Section */}

      <div  className={`rounded-[18px] p-2 overflow-hidden z-50 xl:w-[23%] min-w-fit max-lg:w-full h-full min-h-fit `}
        style={{
        }}
        >

        <div className=" flex flex-col gap-2 h-full"
          style={{
            color: themeProperties.textColor,
            }}
        >
          <div 
            className=" rounded-[15px] shadow-md flex flex-col justify-center backdrop-blur-lg p-3 h-[50%] "
            style={{
            background: themeProperties.specialColor,
            }}
          >
            <div className="  py-2"
            style={{color: themeProperties.textColorAlt,

            }}
            >
              <h3 className=" font-work-sans"> Welcome</h3>
              <h1 className="text-4xl font-semibold font-work-sans">
              {user?.first_name + " !"} 
              </h1>
            </div>

            <div className=" p-4"
            style={{color: themeProperties.normal2,}}
            >
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

            </div>

          </div>
            <div className={` h-full `}>
              <MeetingsBox />
            </div>
        </div>
      </div>

      {/* Right Section */}

      <div className="xl:flex-1 xl:h-full"
      >
        <Information />
      </div>

    </div>
  );
}

export default Home;