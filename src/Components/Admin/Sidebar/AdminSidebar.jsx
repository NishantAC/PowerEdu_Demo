import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuContext } from "../../../context/Menu/MenuContext";
import { FaSignOutAlt, FaHome, FaUser, FaEnvelope, FaBook, FaBus, FaSchool, FaMoneyBill, FaBell, FaCalendarAlt } from "react-icons/fa";
import { logout } from "../../../slices/auth";
import { eventBus } from "../../../common/EventBus";
import { useDispatch } from "react-redux";
import SidebarItems from "./SidebarItems";
import { FiSidebar } from "react-icons/fi";
import gsap from "gsap";
import { FaAngleDown } from "react-icons/fa";
import "./AdminSidebar.css";


function AdminSidebar(props) {
  const mycontext = useContext(MenuContext);
  const location = useLocation();
  const lastActiveIndexString = localStorage.getItem("lastActiveIndex");
  const lastActiveIndex = Number(lastActiveIndexString);
  const [activeIndex, setActiveIndex] = useState(lastActiveIndex || 0);
  const [openIndex, setOpenIndex] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    try {
      dispatch(logout());
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
  
    SidebarItems.forEach((item, index) => {
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
  };

  useEffect(() => {
    const sidebarAnimation = gsap.timeline();
    sidebarAnimation.to(
      ".sidebar",
      { width: isCollapsed ? "5rem" : "12rem", duration: 0.2, ease: "none" }
    );
    sidebarAnimation.to(
      ".sidebar .icon-name, .header",
      { opacity: isCollapsed ? 0 : 1, width: isCollapsed ? "0" : "auto", duration: 0.1, ease: "none" },
      
    );
    sidebarAnimation.to(
      ".sidebar .sideBarItems",
      { marginBottom: isCollapsed ? "2px" : "1rem", duration: 0.2, ease: "none" },
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
    <div className=" flex gap-1 ">
    <div className={`sidebar bg-gray-900 text-white h-screen py-3 flex flex-col ${isCollapsed ? "w-16" : "w-64"} transition-width items-center duration-300 relative`}
    
    onMouseLeave={() => {
      if (isCollapsed) {
        // toggleOpenIndex(null);
      }
    }}
    >
      <div className="">
          <div className=" flex flex-col items-center justify-center my-4">
            <img
              className=" w-10"
              src="https://i.ibb.co/pn6BWTM/aquariacore.png"
              alt="logo"
            />
            <div>
              <h1 className="text-2xl font-bold header">Aquaria</h1>
            </div>
          </div>
        
      </div>
      <div className="Sidebarlist overflow-y-auto flex-grow select-none" >
        {SidebarItems.map((item, index) => {
          const Icon = icons[index];
          return (
            <div key={item.name} className={` sideBarItems `}>
              {item.child.length === 0 ? (
                <Link
                  to={item.route}
                  className={`flex items-center p-3 rounded-lg transition-colors duration-200 hover:bg-gray-700 ${index === activeIndex ? "bg-gray-700" : ""}`}
                  onClick={() => changeActiveIndex(index)}
                >
                  <Icon className="icon mr-3" color="white" />
                  {<span className="icon-name text-white text-sm font-medium select-none">{item.name}</span>}
                </Link>
              ) : (
                <div className="">
                  <button
                     className={`flex items-center p-3 rounded-lg transition-colors duration-200 hover:bg-gray-700 ${
                      index === activeIndex ? "bg-gray-700" : ""
                    }`}
                    onClick={() => {
                      toggleOpenIndex(index);
                    }}
                  >
                    <Icon className="icon mr-3" />
                    {
                      isCollapsed && <FaAngleDown className={`icon ml-auto absolute translate-x-6 ${openIndex === index ? "transform rotate-0" : "transform -rotate-90"} FadeIn`} />
                    }

                   <span className="icon-name text-sm font-medium flex items-center gap-2">{item.name} 

                    <FaAngleDown className={`icon ml-auto ${openIndex === index ? "transform rotate-0" : "transform -rotate-90"}`}
                     />

                   </span>
                  </button> 
                  {openIndex === index && (
                    <div className={` ${!isCollapsed ? " relative":"" }  z-[1000] `}>
                      <div
                        className={`ml-6 mt-2 z-[1000] ${
                          isCollapsed &&
                          "  bg-gray-900 p-4 rounded-lg shadow-lg translate-x-12 -translate-y-[4rem] absolute w-44"
                        }`}
                        onMouseLeave={() => {
                          if (isCollapsed) {
                            toggleOpenIndex(null);
                          }
                        }}
                      >
                        {isCollapsed && <span className="text-white text-sm font-medium relative p-2 border-b-2 w-full block text-start border-gray-500 ">
                          {item.name}
                          </span>}
                      <div className=" relative child_list pt-1">

                      {item.child.map((childItem, jdx) => (
                  <Link
                    to={childItem.route}
                    key={childItem.name}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-700 ${
                      location.pathname === childItem.route ? "bg-gray-700" : ""
                    }`}
                    onClick={() => {
                      changeActiveIndex(index);
                      mycontext.setIsMenuOpen(false);
                    }}
                  >
                      <span className="icon-name text-white text-sm font-medium">{childItem.name}</span>
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
          className="flex items-center justify-center bg-red-600 p-3 rounded-lg w-full mt-4 transition-colors duration-200 hover:bg-red-700 absolute "
          onClick={logOut}
        >
          <FaSignOutAlt className="icon mr-3" />
          {!isCollapsed && <span className="icon-name text-sm font-medium">Logout</span>}
        </button>
      </div>
      </div>
    </div>

    <div className="cursor-pointer"  onClick={toggleSidebar}>
      <div className=" absolute top-4 scale-75">
          <div className=" w-7 h-7 border-black border-4 rounded-[5px] flex items-center">
            {/* line */}
            <div className=" w-[3px] h-7 bg-black sideBarIcon ml-[4px] "></div>

          </div>
        </div>
    </div>
    </div >
  );
}

export default AdminSidebar;