import React from "react";
import "./AcademicFees.css";
import AcademicFeesTable from "./AcademicFeesTable";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function AcademicFees({ typeName, data }) {
  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        marginTop: "auto",
      }}
    >
      <Accordion className="accord">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="SubLayout"
        >
          <Typography className="typo">{typeName}</Typography>
        </AccordionSummary>

        <AccordionDetails className="details">
          <AcademicFeesTable data={data} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AcademicFees;
