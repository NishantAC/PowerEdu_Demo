import React, { useContext, useEffect, useState } from "react";
import styles from './StudentExam.module.css'
import { MenuContext } from "../../../context/Menu/MenuContext";
import ClassTestDropdown from "./ClassTest/ClassTestDropdown";
import ExamDropdown from "./ExamDropdown/ExamDropdown";
import { fetchExamMarks } from "../../../slices/hyexam";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassTestMarks } from "../../../slices/classtestmark";

export default function StudentExam() {
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const mycontext = useContext(MenuContext);
  const dispatch = useDispatch()
  const {user: currentUser} = useSelector(state => state.user)

  useEffect(() => {
    const body = { userid: currentUser?.userid, class_id: currentUser?.classid, school_id: currentUser?.school_id }
    dispatch(fetchExamMarks(body))
    dispatch(fetchClassTestMarks(body))
  }, []);


  return (
    <div onClick={mycontext.offMenu} onScroll={mycontext.offMenu} className={styles.examdiv}>
      <p>
        Home{" "}&gt;
        <b>
          {" "}
          <u>Exam</u>
        </b>
      </p>
      <div className={styles.content}>
        <ExamDropdown expandedAccordion={expandedAccordion} setExpandedAccordion={setExpandedAccordion} /><br />
        <ClassTestDropdown expandedAccordion={expandedAccordion} setExpandedAccordion={setExpandedAccordion} />
      </div>
    </div>
  );
}
