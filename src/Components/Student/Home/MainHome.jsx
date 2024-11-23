import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom"; // Updated for React Router v6
import { useSelector } from "react-redux";
import AcademicCalendar from "./AcademicCalendar";
import Attendance from "./Attendance";
import HomeWork from "./HomeWork";
import TimeTable from "./TimeTable";
import UpcomingTest from "./UpcomingTest";

import "./MainHome.css";
import { MenuContext } from "../../../context/Menu/MenuContext";

export default function MainHome() {
    const { user: currentUser } = useSelector((state) => state.user);

    // Redirect unauthenticated users to the home page
    if (!currentUser) {
        return <Navigate to="/" replace />;
    }

    const mycontext = useContext(MenuContext);
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    // Fetch a random quote
    function getQuote() {
        fetch("https://type.fit/api/quotes")
            .then((res) => res.json())
            .then((data) => {
                const random = Math.floor(Math.random() * data.length);
                setQuote(data[random].text);
                setAuthor(data[random].author);
            });
    }

    useEffect(() => {
        getQuote();
        const intervalID = setInterval(() => {
            getQuote();
        }, 24 * 60 * 60 * 1000); // Refresh every 24 hours
        return () => {
            clearInterval(intervalID);
        };
    }, []);

    return (
        <div
            onClick={mycontext.offMenu}
            onScroll={mycontext.offMenu}
            className="main__container"
        >
            <div className="left__container">
                <br />
                <span
                    style={{
                        fontFamily: "sans-serif",
                        fontStyle: "normal",
                        fontWeight: "bold",
                        fontSize: "20px",
                    }}
                >
                    Hello,{" "}
                    <span
                        style={{
                            fontFamily: "sans-serif",
                            fontStyle: "normal",
                            fontWeight: "normal",
                            fontSize: "20px",
                        }}
                    >
                        {currentUser.firstname}
                    </span>
                    &nbsp;<span className="wave">👋</span>
                </span>
                <br />
                <br />
                <span
                    style={{
                        fontFamily: "sans-serif",
                        fontStyle: "italic",
                        fontWeight: "bold",
                        fontSize: "12px",
                    }}
                >
                    Quote of the day
                </span>
                <br />
                <span
                    style={{
                        fontFamily: "Noto Serif JP",
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "17px",
                        color: "#636363",
                    }}
                >
                    {quote}
                </span>
                <br />
                <span
                    style={{
                        fontFamily: "Noto Serif JP",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "17px",
                        color: "#636363",
                        float: "right",
                    }}
                >
                    - {author}
                </span>
                <br />
                <br />
                <br />
                <br />
                <TimeTable />
            </div>
            <div className="right__container">
                <div className="Div1 upper-container">
                    <div>
                        <Attendance className="atd__com" />
                    </div>
                    <div>
                        <HomeWork className="hmw__com" />
                    </div>
                </div>
                <div className="Div1">
                    <AcademicCalendar />
                    <UpcomingTest />
                </div>
            </div>
        </div>
    );
}
