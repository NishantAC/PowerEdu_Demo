import React, { useEffect, useRef, useState } from "react";
import "./HomeWork.css";
import "../../teacher/Home/Calendar.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import HomeWorkService from "../../../services/homework.service";
import { useSelector } from "react-redux";
import moment from "moment";
import DatePicker from "react-datepicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "react-datepicker/dist/react-datepicker.css";

export default function HomeWork() {
  const { user: currentUser } = useSelector((state) => state.user);
  const works = useRef([]);
  const [list, setList] = useState([]);

  const [startDate, setDate] = React.useState(new Date());
  const selectDateHandler = (d) => {
    setDate(d);
  };

  useEffect(() => {
    HomeWorkService.getClassHomework({
      class_code: currentUser.classname,
      school_code: currentUser.schoolcode,
      date: startDate,
    })
      .then((res) => {
        works.current = res;
        // console.log(res)
        setList(res);
        // filterByDate(res, new Date());
      })
      .catch((err) => console.error(err));
  }, [currentUser, startDate]);

  const filterByDate = (data, date) => {
    const filter = [];
    data.forEach((f) => {
      if (
        moment(date).format("DD-MM-YYYY") ===
        moment(new Date(f.work_date)).format("DD-MM-YYYY")
      ) {
        filter.push(f);
      }
    });
    setList(filter);
  };

  useEffect(() => {
    document.querySelectorAll(".hwdiv21").forEach((el, index) => {
      let color;
      if (index % 3 === 0) {
        color = "#9EFF8E"; // Green
      } else if (index % 3 === 1) {
        color = "#FFA7AB"; // Red
      } else {
        color = "#9FB3FF"; // Blue
      }
      el.style.borderColor = color;
    });
  }, [list]);

  console.log(list);
  return (
    <div className="homework">
      <div className="homeworkdiv1">
        <div className="homeworkdate">
          <span className="homeworkspan">Daily Homework</span>
          <div className="homeworkdated1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="date"
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={selectDateHandler}
                maxDate={new Date()}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="homeworkdiv2">
          {list.length > 0 ? (
            list.map((row, ind) => (
              <div key={ind} className="hwdiv21">
                <h4>{row?.subject?.subject_name}</h4>
                <p>{row?.homework_desc}</p>
              </div>
            ))
          ) : (
            <div className="no-homework-message">
              <h4>No homework available for this date</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
