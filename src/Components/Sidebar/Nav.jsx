import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getImageUrl } from "@/slices/image";
import schoolService from "@/services/school.service";
import { MenuContext } from "@/context/Menu/MenuContext";
import checkUserType from "@/common/checkUserType";
import NotificationModal from "./NotificationModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SelectTheme from "./SelectTheme";
import { selectThemeProperties } from "@/slices/theme";
import gsap from "gsap";
import SideBar from "./SideBar";

function Navbar() {
  const [data, setData] = useState({});
  const [newMail, setNewMail] = useState(true);
  const [ring, setRing] = useState(true);
  const [bellColor, setBellColor] = useState("#6755D9");
  const [logo, setLogo] = useState('');
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const user = JSON.parse(localStorage.getItem('user'));
  const code = user?.schoolcode;
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image);
  const navigate = useNavigate();
  const mycontext = useContext(MenuContext);
  const initial = user?.firstname ? user.firstname[0].toUpperCase() : 'T';
  const schooldata = JSON.parse(localStorage.getItem('school'));
  const [userType, setUserType] = useState("");
  const themeProperties = useSelector(selectThemeProperties);
  const navbarRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    schoolService.getSchoolData(code)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (messages.length < 1) {
      setRing(false);
      setBellColor("#6755D9");
    } else {
      setRing(true);
      setBellColor("red");
    }

    schoolService.getSchoolLogo(code)
      .then((result) => {
        const url = URL.createObjectURL(new Blob([result], { type: "image/jpeg" }));
        setLogo(url);
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

  const toggleNav = () => {
    setToggleMenu((prevState) => !prevState);
  };

  const handleAvatarClick = () => {
    setShowModal(!showModal);
  };


  return (
    <div
      className="rounded-[14px] relative overflow-hidden "
      style={{
        color: themeProperties?.textColorAlt,
      }}
    >
      <div className="flex items-center rounded-[10px] w-full justify-between px-4"

      >
        <div className="flex items-center gap-4 md:gap-10">
          <div className="flex items-center justify-center">
            <img src={logo} loading="lazy" alt="logo" className="object-cover w-10 h-10" />
          </div>
          <div className="text-[18px] font-helvetica text-nowrap">{schooldata?.school_name ?? "School Name"}</div>
          <div className="hidden md:block text-sm divider"
            style={{
              "--before-bg": themeProperties?.textColorAlt,
            }}
          >
            <style>
              {`
                .divider::before {
                  background-color: var(--before-bg);
                }
              `}
            </style>
            <p className="italic text-nowrap text-sm3">Powered By PowerEdu</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 justify-between">
          {data.view_performance_button && (
            <button className="py-2 px-3 md:py-3 md:px-4 rounded-full text-[12px] border-2 text-nowrap"
              onClick={toggleNav}
              style={{
                background: themeProperties?.normal1,
                color: themeProperties?.textColor,
              }}
            >
              View Performance Analytics
            </button>
          )}

          <NotificationModal />

          <div onClick={handleAvatarClick} className="cursor-pointer border-2 rounded-full scale-90"
            style={{ borderColor: themeProperties?.textColor }}
          >
            <Avatar>
              <AvatarImage src={image ? image : ""} alt={user?.firstname} className="rounded-full "  />
              <AvatarFallback style={{ background: themeProperties?.normal1, color : themeProperties?.textColor }}>CN</AvatarFallback>
            </Avatar>
          </div>
          <SelectTheme />
        </div>
      </div>
    </div>
  );
}

export default Navbar;