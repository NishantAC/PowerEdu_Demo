import React, { useEffect, useState } from "react";
import "./ExamMarks.css";
import ExamMarksTable from "./ExamMarksTable/ExamMarksTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamDetails } from "../../../../slices/hyexam";
import { fetchExamDetailsByTeacher } from "../../../../slices/exam";

function ExamMarks() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { examdetails } = useSelector((state) => state.exam);
  const [examSubject, setExamSubject] = useState("");

  useEffect(() => {
    dispatch(
      fetchExamDetailsByTeacher({ schoolcode: user?.schoolcode, classes: user.classes, userId: user.id })
    );
  }, []);

  return (
    <div className="exammarks">
      <div style={{ display: "flex", marginTop: "20px" }}>
        <p className="exammarksheader">
          Home &gt;
          <b>
            {" "}
            <u>Exam Marks</u>
          </b>
        </p>
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        <h3
          style={{
            fontFamily: "Poppins",
            fontWeight: 600,
            marginTop: "30px",
            fontSize: "25px",
          }}
        >
          Exam Marks
        </h3>
        {examSubject && (
          <h3
            style={{
              fontFamily: "Poppins",
              fontWeight: 400,
              marginTop: "30px",
              fontSize: "25px",
            }}
          >
            {" "}
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              style={{width: "22px"}}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>{" "}
            {`${examSubject}`}{" "}
          </h3>
        )}
      </div>
      <br />
      <div style={{ marginTop: "10px" }}>
        <ExamMarksTable
          setExamSubject={setExamSubject}
          examdetails={examdetails}
        />
      </div>
    </div>
  );
}

export default ExamMarks;