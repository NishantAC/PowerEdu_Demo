import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./StudentAssignment.css";
import { MenuContext } from "../../../context/Menu/MenuContext";
import AssignedDate from "./AssignedDropdown";
import DueDate from "./DueDateDropdown";
import WeeklyTable from "./StudentAssignmentWeekly";
import SubjectSelect from "./SubjectDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  registerOrGetAssignments,
  stdFilteredAssignments,
} from "../../../slices/assignment";
import {
  resetAssFilter,
  sortByMonthWeekly,
} from "../../../slices/assigndropdown.slice";

import styles from "./StudentAssignment.module.css";

export default function StudentAssignment() {
  const { user: currentUser } = useSelector((state) => state.user);
  const [active, setActive] = useState(2);

  const dropDown = useSelector((state) => state.assigndrop);
  const dispatch = useDispatch();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  const mycontext = useContext(MenuContext);

  //get class assignment
  useEffect(() => {
    (async () => {
      await getClassAssignments();
    })();
    return () => {
      dispatch(resetAssFilter());
    };
  }, []);

  const getClassAssignments = async () => {
    dispatch(
      registerOrGetAssignments({
        body: {
          user_id: currentUser.id,
          class_code: currentUser.classname,
          school_code: currentUser.schoolcode,
        },
      })
    );
  };

  //filter data
  const chooseFilterOne = (e) => {
    const { id } = e.target;
    const json = {
      overview: String(id) === "overview",
      monthly: String(id) === "monthly",
      weekly: String(id) === "weekly",
    };
    dispatch(sortByMonthWeekly(json));
    setActive(0);
  };

  const chooseFilterTwo = (e) => {
    const { id } = e.target;
    const json = {
      overview: String(id) === "overview",
      monthly: String(id) === "monthly",
      weekly: String(id) === "weekly",
    };
    dispatch(sortByMonthWeekly(json));
    setActive(1);
  };

  const chooseFilterThree = (e) => {
    const { id } = e.target;
    const json = {
      overview: String(id) === "overview",
      monthly: String(id) === "monthly",
      weekly: String(id) === "weekly",
    };
    dispatch(sortByMonthWeekly(json));
    setActive(2);
  };

  return (
    <div
      onClick={(event) => {
        mycontext.closeMenu();
      }}
      onScroll={(event) => {
        mycontext.closeMenu();
      }}
      className={styles.assigndiv}
    >
      <p className={styles.para}>
        Home &gt;
        <b>
          {" "}
          <u>Fees</u>
        </b>
      </p>
      <div className={styles.div1}>
        <div className={styles.div2}>
          <div>
            <p className={styles.para2}>Filters:-</p>
          </div>

          <div className={styles.blck}>
            <SubjectSelect />
            &nbsp; &nbsp; &nbsp; &nbsp;
            <AssignedDate />
            &nbsp; &nbsp; &nbsp; &nbsp;
            <DueDate />
          </div>
          <a
            href={() => {
              return false;
            }}
            onClick={() => {
              dispatch(resetAssFilter());
              setActive(2);
            }}
            className={styles.anchor}
          >
            Clear Filters
          </a>
        </div>
        <div className={styles.div3}>
          <button
            autoFocus
            className={`${styles.assignbtn} ${
              active == 0 ? styles.assignbtnfocus : ""
            }`}
            id="weekly"
            onClick={chooseFilterOne}
          >
            Weekly
          </button>
          <button
            className={`${styles.assignbtn} ${
              active == 1 ? styles.assignbtnfocus : ""
            }`}
            id="monthly"
            onClick={chooseFilterTwo}
          >
            Monthly
          </button>
          <button
            id="overview"
            className={`${styles.assignbtn} ${
              active == 2 ? styles.assignbtnfocus : ""
            }`}
            onClick={chooseFilterThree}
          >
            Overview
          </button>
        </div>
        <br />
        <div className={styles.div4}>
          <div className={styles.assignlayout}>
            <p className={styles.assignheading}>Assignments</p>
          </div>
          <div className={styles.tblayout}>
            <WeeklyTable />
          </div>
        </div>
      </div>
    </div>
  );
}