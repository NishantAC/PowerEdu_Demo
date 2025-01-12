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



function Information() {
  const { user } = useSelector((state) => state.user);
  const themeProperties = useSelector(selectThemeProperties);

  return (
    <div className=" max-xl:max-w-4/5 max-xl:mt-10 flex flex-col h-full p-2" >
  
      <div className="h-full relative overflow-hidden lg:flex w-full">

        <div className="flex flex-col gap-2 h-full w-full ">
        <TeacherAttendance />

        </div>

        <div className="flex flex-col gap-2 h-full overflow-scroll w-full">
          <CircularsList />
        </div>


      </div>


    </div>
  );
}

export default Information;