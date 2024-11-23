import React, { useEffect, useState, useContext, useCallback } from "react";
import "./Sidebartest.css";
import styled from "styled-components";
import SidebarItems from "./SidebarItems";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuContext } from "../../../context/Menu/MenuContext";
import { logout } from "../../../slices/auth";
import EventBus from "../../../common/EventBus";
import WebFont from 'webfontloader';
import HomeIcon from "../../../icons/HomeIcon";
import SubjectsIcon from "../../../icons/SubjectsIcon";
import AssignmentIcon from "../../../icons/AssignmentIcon";
import TeachersIcon from "../../../icons/TeachersIcon";
import FeesIcon from "../../../icons/FeesIcon";
import ExamIcon from "../../../icons/ExamIcon";
import NoticesIcon from "../../../icons/NoticesIcon";
import LogoutIcon from "../../../icons/LogoutIcon";
import BurgerMenuIcon from "../../../icons/BurgerMenuIcon";

function Sidebar(props, { defaultActive }) {
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
        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
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

    const toggleNav = () => {
        mycontext.setMenu(true);
    };
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
        mycontext.setMenu(false);
    };
    return (
        <div className="sidebar__main">
            <div className="sidebar__top">
                <div className="sidebar__logo">
                    <img
                        src="https://i.ibb.co/6mNnF3y/preview.jpg"
                        alt="logo"
                    />
                </div>
                <p>
                    Company
                </p>
            </div>
            <div className="sidebar__middle">

                {
                    [
                        {
                            name: "Home",
                            route: "/student/home",
                        },

                        {
                            name: "Notice",
                            route: "/student/notice"
                        },
                        {
                            name: "Subjects",
                            route: "/student/subject"
                        },
                        {
                            name: "Teachers",
                            route: "/student/teacher"
                        },
                        {
                            name: "Assignments",
                            route: "/student/assignment"
                        },
                        {
                            name: "Exam",
                            route: "/student/exam"
                        },
                        {
                            name: "Fees",
                            route: "/student/fee"
                        },


                    ].map((item, index) => {
                        const Icon = icons[index];
                        return (

                            <Link to={item.route} className='sidebar__option' active={index === activeIndex}

                                onClick={offMenu}
                                key={item.name} >
                                <p style={{ margin: "auto 0px auto 12px" }}>
                                    <Icon style={{ transform: 'scaleY(1.3) scaleX(1.2)' }} />
                                </p>
                                &nbsp;
                                <p style={{ margin: "auto auto auto 2px" }}>{item.name}</p>
                            </Link>
                        )
                    })
                }


            </div>
            <div className="sidebar__bottom">
                <div
                    className="sidebar__bottom--btn"

                    onClick={logOut}
                >
                    <p style={{ color: "white", margin: "auto" }}>
                        <LogoutIcon />
                    </p>
                    <a href="/" style={{ color: "white", fontFamily: "Rubik", fontStyle: "normal", fontWeight: "normal", fontSize: "14px", marginRight: "25px" }}>Logout</a>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

