import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import NavBar from "../Navbar/Nav";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";

function Layout(props) {
  const navigate = useNavigate();
  const [isOnMail, setIsOnMail] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const themeProperties = useSelector(selectThemeProperties);


  useEffect(() => {
    if (window.location.pathname.includes("mail")) {
      setIsOnMail(true);
    } else {
      setIsOnMail(false);
    }
  }, [window.location.pathname]);

  useEffect(() => {

    if(!localStorage.getItem("lastActiveIndex")){
      localStorage.setItem("lastActiveIndex", 0);
    }

    const isCollapsedString = localStorage.getItem("isCollapsed");
    const isCollapsed = isCollapsedString === "true";
    setTimeout(() => {
      setIsCollapsed(isCollapsed);
    }, 1000);
  }, []);

  function toggleOpenIndex(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  const toggleSidebar = () => {
    toggleOpenIndex(null);
    setIsCollapsed(!isCollapsed);
    localStorage.setItem("isCollapsed", !isCollapsed);
  };

  return (
    <div>
      <div className=" flex gap-2 pb-0 m-0 px-2 max-md:px-0 max-h-screen">
        <div className="z-[10] h-screen py-2 hidden md:block">
          <SideBar
            toggleSidebar={toggleSidebar}
            toggleOpenIndex={toggleOpenIndex}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        </div>
        <div
          className=" flex flex-col flex-1 overflow-x-hidden gap-3 my-2 max-md:my-0 z-[0] lg-md:rounded-[20px] backdrop-blur-lg"
          style={{
            backgroundColor: themeProperties.backgroundRight,
            color: themeProperties.textColor,
          }}
        >
          <div className="z-50 h-[7vh] ">
            <NavBar
              toggleSidebar={toggleSidebar}
              toggleOpenIndex={toggleOpenIndex}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              openIndex={setOpenIndex}
            />
          </div>
          <div className="flex-1 overflow-y-scroll ">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
