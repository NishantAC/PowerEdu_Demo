import React from "react";
import PendingFeesTable from "./PendingFeesTable";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../Academic/AcademicFees.css";

function PendingFees({ data }) {
  return (
    <div>
      <Accordion className="accord">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="SubLayout"
        >
          <Typography className="typo">Pending Fees</Typography>
        </AccordionSummary>

        <AccordionDetails className="details" sx={{ padding: 0 }}>
          <PendingFeesTable data={data} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default PendingFees;
