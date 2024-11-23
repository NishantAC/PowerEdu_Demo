import React from 'react'
import styles from "../../../../teacher/Home/ToDoModal.module.css";
import { Box, Modal } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function CalendarModal({calendar, closeclndr, value, setValue}) {
  return (
    <Modal
        open={calendar}
        onClose={closeclndr}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="boxstyle">
          <div style={{ display: "flex", padding: "0" }}>
            <h4
              style={{
                color: "rgba(0, 0, 0, 0.55)",
                margin: "auto",
                width: "100%",
                textAlign: "center",
              }}
            >
              Calendar
            </h4>
            <button className={styles.modalbutton} onClick={closeclndr}>
              X
            </button>
          </div>
          <div>
            {/* <Calendar onChange={onChange} value={value} /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                className={styles.clndr}
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </LocalizationProvider>
          </div>
          <div style={{ width: "70%", margin: "auto", marginTop: "30px" }}>
            <button
              type="submit"
              className={styles.addbtn}
              onClick={closeclndr}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
  )
}
