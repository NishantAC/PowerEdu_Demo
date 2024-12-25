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

function Navbar() {
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
  const user = JSON.parse(localStorage.getItem("user"));
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
    const role = checkUserType(user?.id);
    console.log(role);
    setUserType(role);
  }, []);

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
        console.log(error);
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

  useEffect(() => {
    const location = window.location.href;
    const splitLocation = location.split("/");
    const section = splitLocation[splitLocation.length - 1];
    setCurrentSection(section);
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
            className="text-[20px] font-bold capitalize "
            style={{
              color: themeProperties?.textColor,
            }}
          >
            {currentSection}
          </div>
          <div className="flex items-center gap-4 ">
            {/* time showing */}

            <div
              className="text-[14px] font-work-sans"
              style={{
                color: themeProperties?.textColor,
              }}
            >
              {timeWithoutPeriod}{" "}
              <span style={{ color: themeProperties?.specialColor }}>{period}</span>
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
