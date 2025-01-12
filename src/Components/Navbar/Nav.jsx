import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getImageUrl } from "@/slices/image";
import schoolService from "@/services/school.service";
import { MenuContext } from "@/context/Menu/MenuContext";
import checkUserType from "@/common/checkUserType";
import NotificationModal from "./NotificationModal";
import { selectThemeProperties } from "@/slices/theme";
import Profile from "./Profile";
import Clock from "./Clock";

function Navbar({ toggleSidebar }) {
  const [data, setData] = useState({});
  const [newMail, setNewMail] = useState(true);
  const [ring, setRing] = useState(true);
  const [bellColor, setBellColor] = useState("#6755D9");
  const [logo, setLogo] = useState("");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const user = useSelector((state) => state.user);
  const code = user?.schoolcode;
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image);
  const navigate = useNavigate();
  const mycontext = useContext(MenuContext);
  const initial = user?.firstname ? user.firstname[0].toUpperCase() : "T";
  const schooldata = JSON.parse(localStorage.getItem("school"));
  const [userType, setUserType] = useState("");
  const themeProperties = useSelector(selectThemeProperties);
  const navbarRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentSection, setCurrentSection] = useState("Dashboard");

  useEffect(() => {
    if (user?.image) {
      dispatch(getImageUrl({ path: user?.image }));
    }
  }, [dispatch, user]);

  const messages = [];

  useEffect(() => {
    schoolService
      .getSchoolData(code)
      .then((result) => {
        setData(result.data);
        setLogo(result?.data?.school_logo);
      })
      .catch((error) => {
        
      });
  }, [code]);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());

      return () => clearInterval(intervalId);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const timeParts = currentTime.split(" ");
  const timeWithoutPeriod = timeParts[0];
  const period = timeParts[1];

  function formatSectionName(section) {
    return section
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  useEffect(() => {
    const location = window.location.href;
    const splitLocation = location.split("/");
    const section = splitLocation[splitLocation.length - 1];
    setCurrentSection(formatSectionName(section));
  }, [window.location.href]);

  return (
    <div
      className="rounded-[14px] relative overflow-hidden p-2 "
      style={{
        color: themeProperties?.textColorAlt,
      }}
    >
      <div className="flex items-center rounded-[10px] w-full  px-4">
        <div className="flex items-center gap-2 md:gap-4 justify-between w-full">
          <div
            className="text-[20px] font-bold capitalize flex gap-4 items-center"
            style={{
              color: themeProperties?.textColor,
            }}
          >

            {currentSection}
          </div>
          <div className="flex items-center gap-4 ">
            <div className="flex items-center gap-4">
              <div className=" ">
                <Clock themeProperties={themeProperties} />
              </div>
              <div
                className="text-[14px] font-work-sans w-32"
                style={{
                  color: themeProperties?.textColor,
                }}
              >
                {timeWithoutPeriod}{" "}
                <span style={{ color: themeProperties?.specialColor }}>
                  {period}
                </span>
              </div>
              <div
              className="cursor-pointer left-1"
              onClick={toggleSidebar}
            >
              <div className="scale-[0.6]">
                <div
                  className="w-7 h-7 border-[4px] rounded-[5px] flex items-center"
                  style={{
                    borderColor: themeProperties?.sideBarCollapseButton,
                  }}
                >
                  <div
                    className="w-[4px] h-7 sideBarIcon ml-[4px]"
                    style={{
                      background: themeProperties?.sideBarCollapseButton,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            </div>
            <NotificationModal />
            <Profile
              initial={initial}
              image={image}
              themeProperties={themeProperties}
              schoolData={schooldata}
              logo={logo}
              data={data}
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
