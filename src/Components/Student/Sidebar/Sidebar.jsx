import React, { useEffect, useState, useContext, useCallback } from "react";
import "./Sidebar.css";
import styled from "styled-components";
import SidebarItems from "./SidebarItems";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MenuContext } from "../../../context/Menu/MenuContext";
import { logout } from "../../../slices/auth";
import { eventBus } from "../../../common/EventBus";
import WebFont from 'webfontloader';
import HomeIcon from "../../../icons/HomeIcon";
import SubjectsIcon from "../../../icons/SubjectsIcon";
import AssignmentIcon from "../../../icons/AssignmentIcon";
import TeachersIcon from "../../../icons/TeachersIcon";
import FeesIcon from "../../../icons/FeesIcon";
import ExamIcon from "../../../icons/ExamIcon";
import NoticesIcon from "../../../icons/NoticesIcon";
import LogoutIcon from "../../../icons/LogoutIcon";

function Sidebar(props, { defaultActive }) {
  const navigate = useNavigate();
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
    navigate('/');
  }, [dispatch, navigate]);

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
    SubjectsIcon,
    AssignmentIcon,
    TeachersIcon,
    FeesIcon,
    ExamIcon,
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
    const activeItem = SidebarItems.findIndex(
      (item) => getPath(item.route) === getPath(location.pathname)
    );
    changeActiveIndex(activeItem);
  }, [location]);

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
    mycontext.setIsMenuOpen(false);
  };

  return (
    <div className="sidebar">
      {(mycontext.isMenuOpen || screenWidth > 720) && (
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
                    paddingTop: "12px",
                    textAlign: 'center'
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
                  className="logo-text"
                >
                  AquariaCore
                </p>
              </div>
              <div className="Sidebarlist" style={{ overflowY: "auto", height: "80%" }}>
                {SidebarItems.map((item, index) => {
                  const Icon = icons[index];
                  return (
                    <Link to={item.route} key={item.name}>
                      <SidebarItem
                        key={item.name}
                        active={index === activeIndex}
                        className="sidebaritem"
                        onClick={offMenu}
                      >
                        <p style={{ margin: "auto 0px auto 12px" }}>
                          <Icon style={{ transform: 'scaleY(1.3) scaleX(1.2)' }} />
                        </p>
                        {/* &nbsp; */}
                        <p style={{ margin: "auto auto auto 6px" }}>{item.name}</p>
                      </SidebarItem>
                    </Link>
                  );
                })}
              </div>
            </div>
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
              <span style={{ color: "white", fontStyle: "normal", fontWeight: "normal", fontSize: "13px", marginRight: "22px" }}>Logout</span>
            </a>
          </SidebarParent>
        </>
      )}
    </div>
  );
}

export default Sidebar;

const SidebarParent = styled.div`
  background: linear-gradient(
    179.21deg,
    rgba(4, 5, 19, 0.85) 6.55%,
    rgba(4, 5, 19, 0.8) 35.17%,
    rgba(4, 5, 19, 0.77) 64.84%,
    rgba(4, 5, 19, 0.85) 99.32%
  );
  height:100%;
  width: 140px;
  z-index: 4;
  position:fixed;
  a {
    text-decoration: none;
    font-family: Roboto;
    font-style: normal;
    font-size: 16px;
    font-weight:400;
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
    font-size: 13px;
    font-weight:400;
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
