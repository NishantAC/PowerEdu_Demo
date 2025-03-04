import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MenuContext } from "../../../context/Menu/MenuContext";
import Timetable from "./Timetable/Timetable";
import Totalinfo from "./Totalinfo/Totalinfo";
import TeacherAttendance from "./TeacherAttendance/TeacherAttendance";
import Circulars from "./Circulars/Circulars";
import TopStudents from "./TopStudents/TopStudents";
import ToDo from "../../Teacher/Home/ToDo";
import { selectThemeProperties } from "@/slices/theme";
import MeetingsBox from "@/Components/Meeting/MeetingsBox";
import CircularsList from "@/Components/Admin/Home/CircularsList";
import Information from "./Information";
function PrincipalHome() {
  const mycontext = useContext(MenuContext);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const themeProperties = useSelector(selectThemeProperties);


  const handleUploadNotice = () => {
    navigate("/principal/notice");
  };

  const handleCreateExam = () => {
    navigate("/principal/exam");
  };

  return (
    <div
      className={`flex max-xl:flex-col h-full max-lg:min-h-[100vh]`}
     
    >
       <div  className={`rounded-[18px] p-2 overflow-hidden z-50 w-[23%] max-lg:w-full h-full max-lg:min-h-[100vh]`}
        style={{
        }}
        >

        <div className=" flex flex-col gap-2 h-full"
          style={{
            color: themeProperties.textColor,
            }}
        >
          <div 
            className=" rounded-[15px] shadow-md flex flex-col justify-center backdrop-blur-lg p-3 h-[50%] "
            style={{
            background: themeProperties.specialColor,
            }}
          >
            <div className="  py-2"
            style={{color: themeProperties.textColorAlt,

            }}
            >
              <h3 className=" font-work-sans"> Welcome</h3>
              <h1 className="text-4xl font-semibold font-work-sans">
              {user?.first_name + " !"} 
              </h1>
            </div>

            <div className=" p-4"
            style={{color: themeProperties.normal2,}}
            >
            </div>
            <div
              className={`flex gap-2 flex-col items-center`}
            >
              <div className=" flex gap-2 items-center justify-center">
                <div>
                </div>
                <div>

                </div>
              </div>

            </div>

          </div>
            <div className={` h-full `}>
              <MeetingsBox />
            </div>
        </div>
      </div>

      <div className="xl:flex-1 xl:h-full"
      >
        <Information />
      </div>
        
      {/* <div className="flex flex-1">
        <div className="flex flex-1">
          <div className="">
            <Totalinfo />
          </div>
          <div className="">
          <TopStudents />
            <TeacherAttendance />
          </div>

          <div className="w-full">
          <CircularsList />

            <ToDo />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default PrincipalHome;