import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClickAwayListener, Badge, Box } from "@mui/material";
import BurgerMenuIcon from "@/icons/BurgerMenuIcon";
import Logout from "../Student/Sidebar/Logout";
import { getImageUrl } from "@/slices/image";
import schoolService from "@/services/school.service";
import { MenuContext } from "@/context/Menu/MenuContext";
import checkUserType from "@/common/checkUserType";
import NotificationModal from "./NotificationModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IoMailOutline } from "react-icons/io5";
import { IoMailUnreadOutline } from "react-icons/io5";
import SelectTheme from "./SelectTheme";
import { selectThemeProperties } from "@/slices/theme";
import gsap from "gsap";

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

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleAvatarClick = () => {
    setShowModal(!showModal);
  };

  const handleSchoolClick = () => {
    setShowModal(false);
    navigate('/admin/school');
  };

  const handleLogoutClick = () => {
    setShowModal(false);
    console.log('Logout Clicked');
  };

  const handleOutsideClick = () => {
    setShowModal(false);
  };


  useEffect(() => {
    const NavbarAnimation = gsap.timeline();
    NavbarAnimation.to(navbarRef.current, {
      duration: 0.5,
    });
  }, [isCollapsed]);

  return (

    <>

{/*
  <div className="cursor-pointer absolute -translate-x-9 translate-y-10"  onClick={toggleNavbar}>
        <div className="scale-75 rotate-90">
            <div className=" w-7 h-7 border-4 rounded-[5px] flex items-center"
              style={{ borderColor: themeProperties.primaryColor }}
            >
              <div className=" w-[3px] h-7 navbarIcon ml-[4px] "
              
              style={{ background: themeProperties.primaryColor }}
              ></div>

            </div>
          </div>
      </div>    

    */}

    <div
      ref={navbarRef}
      className="rounded-[20px] p-[3px] my-2 relative overflow-hidden"
      style={{
        // background: themeProperties?.secondaryColor,
        color: themeProperties?.textColorAlt,
      }}
    >




      <div className="flex items-center rounded-[18px] w-full justify-between px-4 bg-[#ffffff41] backdrop-blur-lg">
        <div className="flex items-center gap-10">
          <div className="flex items-center justify-center">
            <img src={logo} loading="lazy" alt="logo" className="object-cover w-12 h-12" />
          </div>
          <div className="text-[23px] font-helvetica-bold text-nowrap" >{schooldata?.school_name ?? "School Name"}</div>
          <div className="text-sm divider"
            style={{
              "--before-bg": themeProperties?.normal1,
            }}
          >
            <style>
              {`
                .divider::before {
                  background-color: var(--before-bg);
                }
              `}
            </style>
            <p className="italic text-nowrap">Powered By PowerEdu</p>
          </div>
        </div>

        <div className="flex items-center gap-10 justify-between">
          {data.view_performance_button && (
            <>
              <button className="py-3 px-4 rounded-full border-2 text-nowrap" onClick={toggleNav}
                style={{
                  background: themeProperties?.normal1,
                  color: themeProperties?.headerTextColor,
                  borderColor: themeProperties?.textColor
                }}
              >
                View Performance Analytics
              </button>
            </>
          )}
          <NotificationModal />

          <div onClick={handleAvatarClick} className="cursor-pointer border-2 rounded-full"
              style={{ borderColor: themeProperties?.textColor }} 
          
          >
            <Avatar >
              <AvatarImage src={image ? image : ""} alt={user?.firstname} className="rounded-full "
              />
              <AvatarFallback
                style={{ background: themeProperties?.normal1 }}
              >CN</AvatarFallback>
            </Avatar>
          </div>
          <SelectTheme />
        </div>

      </div>
    </div>

    </>
  );
}

export default Navbar;