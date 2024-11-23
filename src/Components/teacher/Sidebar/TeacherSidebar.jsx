import React, { useEffect, useState, useContext, useCallback } from "react";
import "./TeacherSidebar.css";
import styled from "styled-components";
import SidebarItems from "./SidebarItems";
import { Link } from "react-router-dom";
// import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
// import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
// import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
// import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
// import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
// import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
// import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { MenuContext } from "../../../context/Menu/MenuContext";
import LogoutIcon from "../../../icons/LogoutIcon";
import HomeIcon from "../../../icons/HomeIcon";
import SubjectsIcon from "../../../icons/SubjectsIcon";
import AssignmentIcon from "../../../icons/AssignmentIcon";
import TeachersIcon from "../../../icons/TeachersIcon";
import MailIcon from "../../../icons/MailIcon";
import ExamIcon from "../../../icons/ExamIcon";
import NoticesIcon from "../../../icons/NoticesIcon";
import { logout } from "../../../slices/auth";
import { eventBus } from "../../../common/EventBus";
import WebFont from "webfontloader";
import { useDispatch } from "react-redux";

function TeacherSidebar(props, { defaultActive }) {
  const mycontext = useContext(MenuContext);
  const location = props.history.location;
  const lastActiveIndexString = localStorage.getItem("lastActiveIndex");
  const lastActiveIndex = Number(lastActiveIndexString);
  const [activeIndex, setActiveIndex] = useState(
    lastActiveIndex || defaultActive
  );

  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Rubik']
      }
    });
  }, []);

  useEffect(() => {
    eventBus.subscribe("logout", () => {
      logOut();
    });

    return () => {
      eventBus.unsubscribe("logout");
    };
  }, [logOut]);

  const icons = [
    HomeIcon,
    TeachersIcon,
    AssignmentIcon,
    ExamIcon,
    SubjectsIcon,
    MailIcon,
    NoticesIcon,
  ];

  function changeActiveIndex(newIndex) {
    localStorage.setItem("lastActiveIndex", newIndex);
    setActiveIndex(newIndex);
  }

  function getPath(path) {
    if (path.charAt(0) !== "/") {
      return "/" + path;
    }
    return path;
  }

  useEffect(() => {
    const activeItem = SidebarItems.findIndex((item) => {
      const currentPath = getPath(location.pathname);
      if (item.route) {
        return currentPath === getPath(item.route);
      } else if (item.child) {
        // If the item has child elements, check their paths too
        return item.child.some(childItem => currentPath === getPath(childItem.route));
      }
      return false;
    });

    changeActiveIndex(activeItem);

  }, [location.pathname]);


  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const offMenu = () => {
    // mycontext.setMenu(false);
    mycontext.setIsMenuOpen(false);
  };


  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    value && !open ? setOpen(true) : handleClose();
  };
  const handleClose = () => setOpen(false);

  return (

    <div className="sidebar">
      {
        (mycontext.isMenuOpen || screenWidth > 720) && (

          <>
            <SidebarParent className="sbp">
              <div className="sidebardiv">
                <div className="logo-company">
                  <div
                    style={{
                      margin: "auto",
                      height: "auto",
                      width: "auto",
                      overflow: "hidden",
                      paddingTop: "16px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      style={{
                        maxHeight: "100%",
                        width: "70px",
                        overflow: "hidden",
                        margin: "auto",
                      }}
                      src="https://i.ibb.co/pn6BWTM/aquariacore.png"
                      alt="logo"
                    />
                  </div>
                  <p
                    style={{
                      color: "#FFF",
                      fontSize: "15px",
                      fontFamily: "Rubik",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "normal"
                    }}
                  >
                    AquariaCore
                  </p>
                </div>

                <div className="Sidebarlist" style={{ overflowY: "auto", height: "80%" }}>
                  {SidebarItems.map((item, index) => {
                    const Icon = icons[index];
                    return (
                      <Link to={item.child.length == 0 ? item.route : ''} key={item.name}>
                        <SidebarItem
                          key={item.name}
                          active={index === activeIndex}
                          className={item.child.length != 0 && item.name === value && open ? "styleitem" : "sidebaritem"}
                          onClick={() => {
                            if (item.child.length === 0) {
                              offMenu();
                            }
                            setActiveIndex(index);
                          }
                          }
                        >
                          {/* {console.warn(item.route)} */}
                          &nbsp;
                          {/*Items*/}
                          {item.child.length === 0 ?
                            (
                              <>
                                <p style={{ margin: "0px 0px 0px 12px" }}>
                                  <Icon
                                    style={{ transform: "scaleY(1.3) scaleX(1.2)" }}
                                  />
                                </p>
                                <p
                                  style={{ margin: "auto auto auto 4px" }}
                                  onClick={handleClose}
                                >
                                  {item.name}
                                </p>
                              </>
                            )
                            :
                            (<div onClick={() => { setValue(item.name); handleOpen() }}>
                              <p style={{ margin: "0px 0px 0px 12px" }}>
                                <Icon
                                  style={{ transform: "scaleY(1.3) scaleX(1.2)" }}
                                />
                              </p>
                              <p
                                style={{ margin: "auto auto 2px 4px" }}
                              >
                                {item.name}
                              </p>

                              {open
                                ?
                                (<div
                                  open={open}
                                  style={{
                                    height: "fitContent",
                                    width: "100%",
                                    position: "absolute",
                                    display: "grid",
                                    left: "0px",
                                    background: 'linear-gradient(205.44deg, #30313C 16.12%, rgba(37, 38, 52, 0.86) 83.88%)'
                                  }}>
                                  {item.name === value
                                    ?
                                    item.child.map((childItem, jdx) => (
                                      <Link to={childItem.route} key={jdx} onClick={() => { handleClose(); offMenu(); }}>
                                        <div
                                          key={jdx}
                                          style={{
                                            paddingLeft: "12px",
                                            paddingTop: "0",
                                            // marginLeft: "15px",
                                            borderBottom: "0.5px solid #fff",
                                            color: "white",
                                            fontSize: "12px",
                                          }}
                                        >
                                          <span key={childItem.name}>
                                            {childItem.name}
                                          </span>
                                        </div>
                                      </Link>
                                    ))
                                    : ""
                                  }
                                </div>) : ("")}
                            </div>)
                          }
                        </SidebarItem>
                      </Link>);
                  })}
                </div>
              </div>

              {/*logout*/}
              <a
                href="/"
                className="logoutbtn"
                style={{
                  backgroundColor: "#FF2934",
                  height: "50px",
                  width: "140px",
                  display: "flex",
                  alignItems: "center",
                  position: "fixed",
                  bottom: 0,
                }}
                onClick={logOut}
              >
                <p style={{ color: "white", margin: "auto" }}>
                  <LogoutIcon />
                </p>
                <span
                  style={{
                    color: "white",
                    fontFamily: "Rubik",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "14px",
                    marginRight: "32px",
                  }}
                >
                  Logout
                </span>
              </a>

            </SidebarParent >
          </>
        )
      }
    </div >
  )
}

export default TeacherSidebar;

const SidebarParent = styled.div`
  background: linear-gradient(
    179.21deg,
    rgba(4, 5, 19, 0.85) 6.55%,
    rgba(4, 5, 19, 0.8) 35.17%,
    rgba(4, 5, 19, 0.77) 64.84%,
    rgba(4, 5, 19, 0.85) 99.32%
  );
  height: 100%;
  width: 140px;
  z-index: 4;
  position: fixed;
  a {
    text-decoration: none;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    color: #000000;
    padding-left: 4px;
  }
  & > div {
    width: 140px;
    height:134vh;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SidebarItem = styled.div`
  transition: all 1s ease-in-out;
  background: ${(props) =>
    props.active
      ? " linear-gradient(180deg, #585961 0%, rgba(88, 89, 97, 0.37) 100%); box-shadow:  0px 4px 4px rgba(0, 0, 0, 0.33);"
      : ""};
  height: 32px;
  width: 140px;
  display: flex;
  align-items: center;
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 21px;
    color: #ffffff;
    display: inline-block;
  }
  &:hover {
    cursor: pointer;
  }
  &:hover:not(:first-child) {
    background: linear-gradient(
      180deg,
      #585961 0%,
      rgba(88, 89, 97, 0.37) 100%
    );
  }
`;
