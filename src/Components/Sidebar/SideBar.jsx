import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuContext } from "@/context/Menu/MenuContext";
import { FaSignOutAlt, FaHome, FaUser, FaEnvelope, FaBook, FaBus, FaSchool, FaMoneyBill, FaBell, FaCalendarAlt } 
from "react-icons/fa";
import { logout } from "@/slices/auth";
import { eventBus } from "@/common/EventBus";
import { useDispatch } from "react-redux";
import AdminSidebarItems from "./AdminSideBarItems";
import PrincipalSideBarItem from "./PrincipalSideBarItem";
import StudentSidebarItems from "./StudentSidebarItems";
import TeacherSideBarItem from "./TeacherSideBarItem";
import gsap from "gsap";
import { FaAngleDown } from "react-icons/fa";
import "./SideBar.css";
import checkUserType from "@/common/checkUserType";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";


function SideBar(props) {
  const mycontext = useContext(MenuContext);
  const location = useLocation();
  const lastActiveIndexString = localStorage.getItem("lastActiveIndex");
  const lastActiveIndex = Number(lastActiveIndexString);
  const [activeIndex, setActiveIndex] = useState(lastActiveIndex || 0);
  const [openIndex, setOpenIndex] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [Items, setItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const themeProperties = useSelector(selectThemeProperties);


  useEffect(() => {
    const userType = checkUserType(user?.id);
    console.log(themeProperties);

    if(userType === "No ID provided") {
      console.log("No ID provided");
      navigate("/");
      return;
    } 
    if (userType === "Admin") {
      setItems(AdminSidebarItems);
    } else if (userType === "Principal") {
      setItems(PrincipalSideBarItem);
    }
    else if (userType === "Teacher") {
      setItems(TeacherSideBarItem);
    }
    else if (userType === "Student") {
      setItems(StudentSidebarItems);
    }
  }, [user]);


  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    try {
      dispatch(logout());
      navigate("/");
    } catch (e) {
      console.log(e, "error");
    }
  }, [dispatch]);



  useEffect(() => {
    eventBus.subscribe("logout", () => {
      logOut();
    });

    return () => {
      eventBus.unsubscribe("logout");
    };
  }, [logOut]);

  useEffect(() => {
    const currentPath = location.pathname;
  
    Items.forEach((item, index) => {
      if (item.route === currentPath) {
        setActiveIndex(index); 
      } else if (item.child.length > 0) {
        const isChildActive = item.child.some((childItem) => childItem.route === currentPath);
        if (isChildActive) {
          setActiveIndex(index); 
        }
      }
    });
  }, [location.pathname]);


  useEffect(() => {
    const isCollapsedString = localStorage.getItem("isCollapsed");
    const isCollapsed = isCollapsedString === "true";
    setTimeout(() => {
      setIsCollapsed(isCollapsed);
    }, 1000);
  }, []);


  const icons = [
    FaHome,
    FaUser,
    FaCalendarAlt,
    FaEnvelope,
    FaBook,
    FaBus,
    FaMoneyBill,
    FaSchool,
    FaBell,
    FaBell,
  ];

  function changeActiveIndex(newIndex) {
    localStorage.setItem("lastActiveIndex", newIndex);
    setActiveIndex(newIndex);
  }

  function toggleOpenIndex(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  const toggleSidebar = () => {
    toggleOpenIndex(null);
    setIsCollapsed(!isCollapsed);
    localStorage.setItem("isCollapsed", !isCollapsed);
  };

  useEffect(() => {
    const sidebarAnimation = gsap.timeline();
    sidebarAnimation.to(
      ".sidebar",
      { width: isCollapsed ? "4rem" : "12rem", duration: 0.15, ease: "none" }
    );
    sidebarAnimation.to(
      ".sidebar .icon-name,  .logout",
      { opacity: isCollapsed ? 0 : 1, width: isCollapsed ? "0" : "auto", duration: 0.1, ease: "none"       },
      
    );
    sidebarAnimation.to(
      " .header" , {
        opacity: isCollapsed ? 0 : 1,
        duration: 0.1,
        width: isCollapsed ? "0" : "auto",
        height: isCollapsed ? "0" : "auto",
        ease: "none",
      });
    sidebarAnimation.to(
      ".sidebar .sideBarItems",
      { marginBottom: isCollapsed ? "2px" : "1rem", duration: 0.15, ease: "none" },
    );

    gsap.to(
      ".sideBarIcon",
      {
        marginLeft: isCollapsed ? "13px" : "4px",
        duration: 0.1,
        ease: "none"
      },
      '>'
    );

  }, [isCollapsed]);

  return (
    <div className=" py-2">
    <div className={`sidebar text-white h-[97.5vh] flex flex-col transition-width items-center duration-300 relative backdrop-blur-md rounded-[20px] max-h-screen `}

    style={{ 
      background:  themeProperties.sideBarColor, 
      color: themeProperties?.textColor }}
    
    onMouseLeave={() => {
      if (isCollapsed) {
        // toggleOpenIndex(null);
      }
    }}
    >

    <div className="cursor-pointer absolute -right-7 top-5"  onClick={toggleSidebar}>
        <div className="scale-75"> 
            <div className=" w-7 h-7 border-4 rounded-[5px] flex items-center"
              style={{ borderColor: themeProperties.normal1 }}
            >
              {/* line */}
              <div className=" w-[3px] h-7 sideBarIcon ml-[4px] "
              
              style={{ background: themeProperties.normal1 }}
              ></div>

            </div>
          </div>
      </div>

      <div className=" mt-0">
          <div className=" flex items-center justify-center my-3 gap-2">
            <img
              className=" w-10 bg-white rounded-full p-1"
              src="https://i.ibb.co/pn6BWTM/aquariacore.png"
              alt="logo"
            />
            <div>
              <h1 className="text-xl font-bold header">PowerEdu</h1>
            </div>
          </div>
        
      </div>
      <div className="Sidebarlist overflow-y-auto flex-grow select-none" >
        {Items.map((item, index) => {
          const Icon = icons[index];
          return (
            <div key={item.name} className={` sideBarItems `}>
              {item.child.length === 0 ? (
                <Link
                  to={item.route}
                  className={`flex items-center p-3 rounded-lg transition-colors duration-200 my-3 `}
                  style={{ background: activeIndex === index ? themeProperties.primaryColor : "",
                    "--hover-color": themeProperties.primaryColor,
                    border : activeIndex === index ? `2px solid ${themeProperties.textColor} `  : "",
                   }}
                  onClick={() => changeActiveIndex(index)}
                >

                   {/*  */}
                   <style>
                    {`

                      a:hover {

                        background-color: var(--hover-color);
                      }
                    `}
                  </style>

                      

                  <Icon className="icon mr-3"  />
                  {<span className="icon-name text-sm font-medium select-none"
                    style={{ color: themeProperties.textColor }}
                  >{item.name}</span>}



                </Link>
              ) : (
                <div className="">
                  <button
                     className={`flex items-center p-3 rounded-lg transition-colors duration-200 w-full my-3`}
                    style={{ background: activeIndex === index ? themeProperties.primaryColor : "",
                      "--hover-color": themeProperties.primaryColor,
                    border : activeIndex === index ? `2px solid ${themeProperties.textColor} `  : "",

                     }}

                    onClick={() => {
                      toggleOpenIndex(index);
                    }}
                  >
                    <Icon className="icon mr-3" />
                    {
                      isCollapsed && <FaAngleDown className={`icon ml-auto absolute translate-x-6 ${openIndex === index ? "transform rotate-0" : "transform -rotate-90"} FadeIn`} />
                    }
                        {/* This is for dynamic hover effect */}
                          <style>
                            {`
                              button:hover {
                                background-color: var(--hover-color);
                              }
                            `}
                          </style>

                   <span className="icon-name text-sm font-medium flex items-center gap-2"
                    style={{ color: themeProperties.textColor }}
                   
                   >{item.name} 

                    <FaAngleDown className={`icon ml-auto ${openIndex === index ? "transform rotate-0" : "transform -rotate-90"}`}
                     />

                   </span>
                  </button> 
                  {openIndex === index && (
                    <div className={` ${!isCollapsed ? " relative":"" }  z-[1000] `}>
                      <div
                        className={`ml-6 mt-2 z-[1000] ${
                          isCollapsed &&
                          " p-4 rounded-lg shadow-lg translate-x-12 -translate-y-[4rem] absolute w-44"
                        }`}
                        style={{ background: isCollapsed&& themeProperties.secondaryColor }}
                        onMouseLeave={() => {
                          if (isCollapsed) {
                            toggleOpenIndex(null);
                          }
                        }}
                      >
                        {isCollapsed && <span className=" text-sm font-medium relative p-2 border-b-2 w-full block text-start">
                          {item.name}
                          </span>}
                      <div className=" relative child_list pt-1"
                      style={{ 

                        // set the before and after color of the child list
                        "--before-color": themeProperties.textColor,
                      }}
                      >

                      <style>
                        {`

                          .child_list::before { 
                            background-color: var(--before-color);
                          }
                          .child_list::after {

                            background-color: var(--before-color);
                          }
                        `}
                      </style>

                      {item.child.map((childItem, jdx) => (
                  <Link
                    to={childItem.route}
                    key={childItem.name}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 mb-1 `}

                    style={{ background: location.pathname === childItem.route ? themeProperties.primaryColor : "",
                      "--hover-color": themeProperties.primaryColor,
                      border : location.pathname === childItem.route ? `2px solid ${themeProperties.textColor} `  : "",
                    }}
                    onClick={() => {
                      changeActiveIndex(index);
                      mycontext.setIsMenuOpen(false);
                    }}
                  >

                    <style>
                      {`
                        a:hover {
                          background-color: var(--hover-color);
                        }
                      `}
                    </style>

                      <span className="icon-name text-sm font-medium max-w-4 text-nowrap">{childItem.name}</span>
                    </Link>
                  ))}

                      </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        

      <div className="relative">
        <button
          className="flex items-center  p-3 rounded-lg w-full mt-4 transition-colors duration-200  bottom-0  "
          onClick={logOut}
          style={{ borderColor: themeProperties.textColor, background: themeProperties.logoutColor }}
        >
          <FaSignOutAlt className="icon mr-3" />
           <span className="icon-name text-sm font-medium logout">Logout</span>
        </button>
      </div>
      </div>
    </div>

    </div >
  );
}

export default SideBar;


// ! Copyright (c) 2024 Aquaria Core Pvt. Ltd.