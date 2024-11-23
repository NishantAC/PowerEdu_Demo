import React, { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../../context/Menu/MenuContext";
import SubDropdown from "./subjectDropdown/SubDropdown";
import { useDispatch, useSelector } from "react-redux";
import SubjectService from "../../../services/subject.service";
import { getAllSubjectDetails } from "../../../slices/subject";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // Import the Shadcn Accordion components
import "./subjectDropdown/SubDropdown.css";
import styles from "./StudentSubject.module.css";

export default function StudentSubject() {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.user);
  const { subject } = useSelector((state) => state.subject);
  const mycontext = useContext(MenuContext);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // getting data with classid and schoolcode
    dispatch(
      getAllSubjectDetails({
        class_code: currentUser.classname,
        school_code: currentUser.schoolcode,
      })
    );
  }, []);

  console.log(subject);

  const [activeItem, setActiveItem] = useState(null);

  const handleAccordionToggle = (value) => {
    setActiveItem(value);
  };

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

  return (
    <div
      onClick={mycontext.offMenu}
      onScroll={mycontext.offMenu}
      className={styles.main}
    >
      <p className={styles.para}>
        Home &gt;
        <b>
          {" "}
          <u>Subjects</u>
        </b>
      </p>
      <div className={styles.ssdiv}>
        <Accordion type="single" collapsible value={activeItem} onValueChange={handleAccordionToggle}>
          {tableData?.length > 0 ? (
            tableData?.map((sub, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{sub.subject_name}</AccordionTrigger>
                <AccordionContent>
                  <SubDropdown activeItem={activeItem} subject={sub} index={index} />
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <h5 className={styles.div2h2}>No subject found.!</h5>
          )}
        </Accordion>
      </div>
    </div>
  );
}
