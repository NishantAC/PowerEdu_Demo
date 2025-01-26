import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTeachersBySchool,
  getSubjectTeacherData,
} from "../../../../slices/subjectteacher";
import MarkAttendance from "./MarkAttendance";
import { toast } from "sonner";
import { markUserAttendance } from "../../../../slices/attendance";
import TeacherProfileCard from "./TeacherProfileCard";
import { selectThemeProperties } from "@/slices/theme";

function TeachersAttendance() {
  const themeProperties = useSelector(selectThemeProperties);
  const [markAttendance, setMarkAttendance] = useState(false);
  const showMarkAttendance = () => setMarkAttendance(true);
  const hideMarkAttendance = () => setMarkAttendance(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { subjectteachers } = useSelector((state) => state.subjectteacher);
  const [teachers, setTeachers] = useState(subjectteachers);
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    if (user?.school_id && !subjectteachers) dispatch(fetchAllTeachersBySchool({ schoolcode: user?.school_id }));
  }, [user]);

  useEffect(() => {
    setTeachers(subjectteachers);
  }, [subjectteachers]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  // const handleClassChange = (event) => {
  //   setSelectedClass(event.target.value);
  // };

  // const handleSubjectChange = (event) => {
  //   setSelectedSubject(event.target.value);
  // };
  //
  // const applyFilters = () => {
  //   let filteredTeachers = teachers;
  //   filteredTeachers = teachers.filter(
  //     (teach) =>
  //       (selectedClass === "" || teach?.classname === selectedClass) &&
  //       (selectedSubject === "" || teach?.subjectname === selectedSubject)
  //   );
  //   setTeachers(filteredTeachers);
  // };

  const handleSave = () => {
    if (attendanceList?.length > 0) {
      dispatch(markUserAttendance({ attendanceList }))
        .then((result) => {
          if (result && result.payload) {
            toast(result?.payload?.message);
          }
          setAttendanceList([]);
          hideMarkAttendance();
        })
        .catch((err) => toast(err));
    }
  };

  return (
    <div className=" p-2 rounded-[20px] h-full ">
      <div
        className=" rounded-[20px] h-full relative overflow-hidden shadow-lg"
        style={{
          background: themeProperties.boxBackgroundSolid,
          color: `${themeProperties.color}`,
          transition: "all 0.25s linear",
        }}
      >
        <div>
          {!markAttendance && (
            <button
              className=" absolute px-4 rounded-lg py-2 bottom-2 right-2 z-50"
              onClick={showMarkAttendance}
              style={{
                background: themeProperties.buttonColor,
                color: `${themeProperties.textColorAlt}`,
                transition: "all 0.25s linear",
              }}
            >
              Mark Attendance
            </button>
          )}
          <div className=" h-[88vh] overflow-y-auto">
            {markAttendance ? (
              <MarkAttendance hideTable={hideMarkAttendance} />
            ) : (
              <TeacherProfileCard />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeachersAttendance;
