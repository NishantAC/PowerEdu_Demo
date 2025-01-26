import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { selectThemeProperties } from "@/slices/theme";
import CircularsList from "@/Components/Admin/Home/CircularsList";
import Timetable from "./Timetable/Timetable";
import Totalinfo from "./Totalinfo/Totalinfo";
import TeacherAttendance from "./TeacherAttendance/TeacherAttendance";
import Circulars from "./Circulars/Circulars";
import TopStudents from "./TopStudents/TopStudents";
import ToDo from "../../teacher/Home/ToDo";
import HomeInfo from "./HomeInfo";



function Information() {
  const { user } = useSelector((state) => state.user);
  const themeProperties = useSelector(selectThemeProperties);

  return (
    <div className=" max-xl:max-w-4/5 max-xl:mt-10 flex flex-col h-full " >
      <div className={`flex max-xl:flex-col-reverse flex-row justify-around items-center max-xl:py-4 rounded-[20px] `}
      >
        <div className="flex max-md:flex-col w-96 justify-center items-center absolute top-2 right-[33%] z-50 " >
        </div>

        {/* <StatsAndCharts
            totalStudents={totalStudents}
            totalTeachers={totalTeachers}
            totalStaff={totalStaff}
            chartData={chartData}
            deviceSize={deviceSize}
            monthArray={monthArray}
            yearArray={yearArray}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            initialDate={initialDate}
            themeProperties={themeProperties}
          /> */}
      </div>
      <div className="h-full relative  ">
        <HomeInfo />

      </div>
    </div>
  );
}

export default Information;