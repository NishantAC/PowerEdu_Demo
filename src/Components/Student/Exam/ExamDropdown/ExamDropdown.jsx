import React, { useEffect, useState } from "react";
import styles from "./ExamDropdown.module.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../Components/ui/dropdown-menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExamDropdownMenu from "./ExamDropdownMenu";
import ExamDDMYearly from "./ExamDDMYearly";
import HYExamService from "../../../../services/hyexam.service";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchExamMarks } from "../../../../slices/hyexam";

function ExamDropdown({ expandedAccordion, setExpandedAccordion }) {
  const { user } = useSelector((state) => state.user);
  const [value, setValue] = useState("all");
  const currentYear = new Date().getFullYear();
  const [DropMenu, setDropMenu] = useState(false);
  const { hyexams, dropDown } = useSelector((state) => state.hyexam);
  const [exams, setExams] = useState(hyexams);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };

  useEffect(() => {
    setExams(hyexams);
  }, [hyexams]);

  const handleChange = (selectedValue) => {
    if (selectedValue === "all") {
      setExams(hyexams);
    } else {
      const filtered = hyexams.filter(
        (exam) => String(exam.examtype) === String(selectedValue)
      );
      setExams(filtered);
    }
    if (!DropMenu) {
      setDropMenu(true);
    }
    setValue(selectedValue);
  };

  const year = new Date().getFullYear(); // returns the current year

  return (
    <div className={styles.main}>
      <Accordion
        className={styles.accord}
        expanded={expandedAccordion === "exam"}
        onChange={handleAccordionChange("exam")}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon style={{ fontSize: "40px", fontWeight: "normal" }} />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={styles.examLayout}
        >
          <div className={styles.examdropExam}>
            <Typography className={styles.typo}>Exam</Typography>
            {expandedAccordion === "exam" && (
              <div className={styles.content}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={styles.dropdownBtn}>
                      {value === "all" ? "All Exams" : `${value}-${year}`}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => handleChange("all")}>
                      All Exams
                    </DropdownMenuItem>
                    {dropDown.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onSelect={() => handleChange(option)}
                      >
                        {option}-{year}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails className={styles.details}>
          <ExamDropdownMenu exams={exams} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ExamDropdown;