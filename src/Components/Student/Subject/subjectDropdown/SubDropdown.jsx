import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // Shadcn Accordion components
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BasicTable from "./DropdownMenu";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

import styles from "../StudentSubject.module.css";

function SubDropdown({ subject, index, activeItem }) {
  return (
    <AccordionItem value={String(index)}>
      <AccordionTrigger>
        <Typography
          sx={{
            fontFamily: "Rubik",
            fontStyle: "normal",
            fontWeight: 500,
            color: "#646464",
            fontSize: "24px !important",
            lineHeight: "28px !important",
          }}
        >
          {subject?.subject_name}
        </Typography>
        <KeyboardArrowDownIcon
          style={{
            fontSize: "35px",
            fontWeight: "lighter",
            transform: activeItem === index ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease-in-out",
          }}
        />
      </AccordionTrigger>
      <AccordionContent
        style={{
          background: "#FFFFFF",
          border: "1px solid #A5A5A5",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "5px",
        }}
      >
        {subject?.chapters?.length > 0 ? (
          <BasicTable chapters={subject?.chapters} />
        ) : (
          <h5 className={styles.div2h2}>No chapters found.!</h5>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

export default SubDropdown;
