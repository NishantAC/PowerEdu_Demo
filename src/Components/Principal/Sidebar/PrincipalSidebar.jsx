import React, { useEffect, useState, useContext, useCallback } from "react";
import "./PrincipalSidebar.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MenuContext } from "../../../context/Menu/MenuContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../slices/auth";
import WebFont from "webfontloader";
import { eventBus } from "../../../common/EventBus";
import LogoutIcon from "../../../icons/LogoutIcon";
import HomeIcon from "../../../icons/HomeIcon";
import MailIcon from "../../../icons/MailIcon";
import NoticesIcon from "../../../icons/NoticesIcon";
import TeachersIcon from "../../../icons/TeachersIcon";
import ExamIcon from "../../../icons/ExamIcon";
import FeesIcon from "../../../icons/FeesIcon";
import AllTeachersIcon from "../../../icons/AllTeacher";
import Calender from "../../../icons/Calender";
import schoolService from "../../../services/school.service";
import SidebarItems from "../../Sidebar/PrincipalSideBarItem";

function PrincipalSidebar(props, { defaultActive }) {
  const mycontext = useContext(MenuContext);
  const location = props.history.location;
  const lastActiveIndexString = localStorage.getItem("lastActiveIndex");
  const lastActiveIndex = Number(lastActiveIndexString);
  const [activeIndex, setActiveIndex] = useState(
    lastActiveIndex || defaultActive
  );
  const [logo, setLogo] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)
  const code = user?.schoolcode;

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  //font
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Rubik']
      }
    });
  }, []);

  //logout
  useEffect(() => {
    eventBus.subscribe("logout", () => {
      logOut();
    });

    return () => {
      eventBus.unsubscribe("logout");
    };
  }, [logOut]);


  //get logo
  useEffect(() => {
    schoolService
      .getSchoolLogo(code)
      .then((result) => {
        const url = URL.createObjectURL(
          new Blob([result], { type: "image/jpeg" })
        );
        setLogo(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const icons = [
    HomeIcon,
    TeachersIcon,
    AllTeachersIcon,
    ExamIcon,
    Calender,
    FeesIcon,
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

  //active item
  useEffect(() => {
    const activeItem = SidebarItems.findIndex(
      (item) => getPath(item.route) === getPath(location.pathname)
    );
    changeActiveIndex(activeItem);
  }, []);

  const toggleNav = () => {
    mycontext.setMenu(true);
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  //width
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

  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    value && !open ? setOpen(true) : setOpen(true) || handleClose();
  };
  const handleClose = () => setOpen(false);

  return (
    <div className="sidebar">
      {/* chnaged mycontext.Menu to mycontext.isMenuOpen*/}
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
                <br />
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
                    <Link to={item.child.length == 0 && item.route} key={item.name}>
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
                          <>
                            <p style={{ margin: "0px 0px 0px 12px" }}>
                              <Icon
                                style={{ transform: 'scaleY(1.3) scaleX(1.2)' }}
                              />
                            </p>
                            <p
                              style={{ margin: "auto auto auto 6px" }}
                              onClick={handleClose}>
                              {item.name}
                            </p>
                          </>
                          :
                          <div onClick={() => { setValue(item.name); handleOpen() }} className="sidebaritem">
                            <p style={{ margin: "0px 0px 0px 12px" }}>
                              <Icon
                                style={{ transform: 'scaleY(1.3) scaleX(1.2)' }}
                              />
                            </p>
                            <p
                              style={{ margin: "auto auto 2px 4px" }}>
                              {item.name}
                            </p>
                            {open ?
                              <div
                                open={open}
                                style={{
                                  height: "fitContent",
                                  width: "100%",
                                  position: "absolute",
                                  display: "grid",
                                  left: "0px",
                                  background: 'linear-gradient(205.44deg, #30313C 16.12%, rgba(37, 38, 52, 0.86) 83.88%)'
                                }}>
                                {item.name === value ?
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
                                        }}>
                                        <span key={childItem.name} >{childItem.name}</span>
                                      </div>
                                    </Link>
                                  )) : ""
                                }
                              </div>
                              : ""
                            }
                          </div>
                        }
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
                {/* <LogoutRoundedIcon /> */}
                <LogoutIcon />
              </p>
              <span style={{
                color: "white",
                fontFamily: "Rubik",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "14px",
                marginRight: "32px",
              }}>Logout</span>
            </a>
          </SidebarParent>
        </>
      )
      }
      {/*burgur icon*/}
      {/* {!mycontext.Menu ? (
        <button onClick={toggleNav} className="sidebarbtn">
          <MenuIcon style={{ verticalAlign: "middle", color: "#035473" }} />
        </button>
      ) : (
        ""
      )} */}
    </div >
  );
}

export default PrincipalSidebar;

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
  position:fixed;
  a {
    text-decoration: none;
    font-family: Roboto;
    font-style: normal;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    color: #000000;
    padding-left: 4px;
  }
  & > div {
    width: 140px;
    height: 134vh;
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
    font-weight: 400;
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

// const SidebarParent = styled.div`
//   background: linear-gradient(
//     179.21deg,
//     rgba(4, 5, 19, 0.85) 6.55%,
//     rgba(4, 5, 19, 0.8) 35.17%,
//     rgba(4, 5, 19, 0.77) 64.84%,
//     rgba(4, 5, 19, 0.85) 99.32%
//   );

//   height: 100%;
//   width: 140px;
//   z-index: 4;
//   position: fixed;
//   a {
//     text-decoration: none;
//     font-family: Roboto;
//     font-style: normal;
//     font-weight: bold;
//     font-size: 18px;
//     line-height: 28px;
//     color: #000000;
//     padding-left: 10px;
//   }
//   & > div {
//     width: 145px;
//     height: 134vh;
//   }
// `;

// const SidebarItem = styled.div`
//   transition: all 0.2s ease-in-out;

//   background: ${(props) =>
//     props.active
//       ? "linear-gradient(180deg, #585961 0%, rgba(88, 89, 97, 0.37) 100%); box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.33);"
//       : ""};
//   height: 32px;
//   width: 140px;
//   display: flex;
//   align-items: center;
//   p {
//     font-family: Rubik;
//     font-style: normal;
//     font-weight: normal;
//     font-size: 14px;
//     line-height: 21px;
//     color: #ffffff;
//     display: inline-block;
//   }

//   &:hover {
//     cursor: pointer;
//   }

//   &:hover:not(:first-child) {
//     background: linear-gradient(
//       180deg,
//       #585961 0%,
//       rgba(88, 89, 97, 0.37) 100%
//     );
//   }
// `;
