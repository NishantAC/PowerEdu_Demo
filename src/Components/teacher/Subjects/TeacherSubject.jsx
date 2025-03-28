import React, { useContext, useEffect, useState } from "react";
import SubDropdown from "./SubDropdown/SubDropdown";
import { MenuContext } from "../../../context/Menu/MenuContext";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubjectDetails } from "../../../slices/subject";
import SubjectTeacherService from "../../../services/subjectteacher.service";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion"; // Import ShadCN Accordion Components
import styles from "./TeacherSubject.module.css";
import ClassDropdown from "./SubDropdown/classDropdown";

function TeacherSubject() {
  const dispatch = useDispatch();
  const mycontext = useContext(MenuContext);
  const user = useSelector((state) => state.auth.user)
  const { subject } = useSelector((state) => state.subject);
  const [tableData, setTableData] = useState([]);
  const [classes, Setclasses] = useState([]);
  const [classSubjectMap, setClassSubjectMap] = useState(null); // for filters
  const [classDropdownValue, setClassDropdownValue] = useState("");

  //fetch all the assigned subject to the subject teacher
  const getAssignedSubjects = (class_code) => {
    const classSubjects = classSubjectMap[class_code];
    dispatch(
      getAllSubjectDetails({
        class_code,
        school_code: user?.school_id,
        subject_code: classSubjects,
      })
    );
  };

  //get All Ids
  const getClassIds = async () => {
    await SubjectTeacherService.getClassIds(user.id)
      .then((res) => {
        setClassSubjectMap(res.subjects);
        Setclasses(Object.keys(res.subjects));
      })
      .catch((err) =>
        console.error("Problem in TeacherNotice :: getClassIds() => ", err)
      );
  };

  useEffect(() => {
    getClassIds();
  }, []);

  useEffect(() => {
    if (subject) {
      const sortedSubjects = [...subject].sort((a, b) => {
        const nameA = a.subject_name.toUpperCase(); // Ignore case
        const nameB = b.subject_name.toUpperCase(); // Ignore case
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });

      setTableData(sortedSubjects);
    }
  }, [subject]);

  //Accordion state
  const [activeItem, setActiveItem] = useState(null);

  const handleAccordionToggle = (eventKey) => {
    setActiveItem(eventKey);
  };

  return (
    <div
      onClick={mycontext.offMenu}
      onScroll={mycontext.offMenu}
      className={styles.main}
    >
      <div>
        <p className={styles.para}>
          Home &gt;
          <b>
            {" "}
            <u>Subjects</u>
          </b>
        </p>
      </div>

      <div className={styles.TSdiv}>
        <ClassDropdown
          classes={classes}
          getAssignedSubjects={getAssignedSubjects}
          setClassDropdownValue={setClassDropdownValue}
          getClassIds={getClassIds}
        />
        {/* ShadCN Accordion Component */}
        <Accordion type="single" collapsible>
          {tableData?.length > 0 && classDropdownValue ? (
            tableData?.map((sub, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>
                  <SubDropdown
                    subject={sub}
                    index={index}
                    classDropdownValue={classDropdownValue}
                    getAssignedSubjects={getAssignedSubjects}
                  />
                </AccordionTrigger>
                <AccordionContent>
                  <SubDropdown
                    subject={sub}
                    index={index}
                    classDropdownValue={classDropdownValue}
                    getAssignedSubjects={getAssignedSubjects}
                    content
                  />
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <h5 className={styles.div2h2}>
              "Please select a class to view available subjects."
            </h5>
          )}
        </Accordion>
      </div>
    </div>
  );
}

export default TeacherSubject;
