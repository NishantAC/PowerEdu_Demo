import React, { useState } from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClassTestDDMenu from './ClassTestDDMenu';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../ExamDropdown/ExamDropdown.module.css';
import { useSelector } from 'react-redux';

function ClassTestDropdown({expandedAccordion, setExpandedAccordion}) {
  const [DropMenu, setDropMenu] = useState(false);
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };
  const {classtestmark} = useSelector(state => state.classtestmark)
  return (
    <div className={styles.main}>
      <Accordion className={styles.accord} expanded={expandedAccordion === 'classTest'} onChange={handleAccordionChange('classTest')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ fontSize: "40px", fontWeight: 'normal' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={styles.examLayout}
        >
          <Typography className={styles.typo}>Class Test</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.details}>
          <ClassTestDDMenu classtestmark={classtestmark} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ClassTestDropdown
