import React, { useContext, useState, useEffect } from "react";
import AcademicCalendar from "./AcademicCalendar";
import Attendance from "./Attendance";
import HomeWork from "./HomeWork";
import TimeTable from "./TimeTable";
import UpcomingTest from "./UpcomingTest";
import "./MainHome.css";
import { MenuContext } from "../../../context/Menu/MenuContext";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./StudentHome.css";
import Readmore from "./Readmore";

export default function MainHome() {
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/" />;
  }

  const mycontext = useContext(MenuContext);

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  function getQuote() {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        const filteredQuetes = data.filter((f) => f?.text.length <= 70);
        const random = Math.floor(Math.random() * filteredQuetes.length);
        setQuote(filteredQuetes[random].text);
        setAuthor(filteredQuetes[random].author);
      });
  }

  useEffect(() => {
    getQuote();
    const intervalID = setInterval(() => {
      getQuote();
    }, 24 * 60 * 60 * 1000);
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
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "20px",
            lineHeight: "30px",
          }}
        >
          Hello
          <span
            style={{
              fontFamily: "Lato",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "20px",
              lineHeight: "30px",
            }}
          >
            {`, ${user.firstname}`}
          </span>
          &nbsp;<span className="wave">👋&#127995;</span>
        </span>
        <br />
        <br />
        <span
          style={{
            fontFamily: "Lato",
            fontStyle: "italic",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "normal",
          }}
        >
          Quote of the day
        </span>
        <br />
        <span
          style={{
            fontFamily: "Noto Serif JP",
            fontStyle: "normal",
            fontWeight: 550,
            fontSize: "1.125rem",
            lineHeight: "normal",
            color: "#636363",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            marginTop: "0.7rem",
          }}
        >
          <Readmore quote={quote} wordLength={60} />
        </span>
        <br />
        <span
          style={{
            fontFamily: "Noto Serif JP",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "1.125rem",
            lineHeight: "2.1875rem",
            color: "#636363",
            float: "right",
          }}
        >
          - {author}
        </span>
        <br />
        <br />
        <TimeTable />
      </div>
      <div className="right__container">
        <div className="Div1">
          <Attendance className="atd__com" />
          <HomeWork className="hmw__com" />
        </div>
        <div className="Div1">
          <AcademicCalendar />
          <UpcomingTest currentUser={user} />
        </div>
      </div>
    </div>
  );
}