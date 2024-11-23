import React from 'react'
import styles from "../../../../teacher/Home/ToDoModal.module.css";
import { Box, Modal, TextField } from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function TimeModal({ time, closeTime, endtime, openEndTime, closeEndTime, endtimevalue, timevalue, setEndTimevalue, setTimevalue }) {
  return (
    <>
      <Modal
        open={time}
        onClose={closeTime}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="timeboxstyle">
          <div style={{ display: "flex", padding: "0" }}>
            <h4
              style={{
                color: "rgba(0, 0, 0, 0.55)",
                margin: "auto",
                width: "100%",
                textAlign: "center",
              }}
            >
              Clock
            </h4>
            <button className={styles.modalbutton} onClick={closeTime}>
              X
            </button>
          </div>
          <div>
            {/* <Calendar onChange={onChange} value={value} /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticTimePicker
                ampm
                orientation="landscape"
                openTo="minutes"
                value={timevalue}
                onChange={(newValue) => {
                  setTimevalue(newValue);
                }}
                toolbarTitle="Start Time"
                renderInput={(params) => (
                  <TextField {...params} className={styles.textField} />
                )}
              />
            </LocalizationProvider>
          </div>
          <div style={{ width: "70%", marginTop: "30px" }}>
            <button type="submit" className="timesavebtn" onClick={openEndTime}>
              Save
            </button>
          </div>
        </Box>
      </Modal>
      {/* end time modal */}
      <Modal
        open={endtime}
        onClose={closeEndTime}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="timeboxstyle">
          <div style={{ display: "flex", padding: "0" }}>
            <h4
              style={{
                color: "rgba(0, 0, 0, 0.55)",
                margin: "auto",
                width: "100%",
                textAlign: "center",
              }}
            >
              Clock
            </h4>
            <button className={styles.modalbutton} onClick={closeEndTime}>
              X
            </button>
          </div>
          <div>
            {/* <Calendar onChange={onChange} value={value} /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticTimePicker
                ampm
                orientation="landscape"
                openTo="minutes"
                value={endtimevalue}
                onChange={(newValue) => {
                  setEndTimevalue(newValue);
                }}
                toolbarTitle="End Time"
                renderInput={(params) => (
                  <TextField {...params} className={styles.textField} />
                )}
              />
            </LocalizationProvider>
          </div>
          <div style={{ width: "70%", marginTop: "30px" }}>
            <button
              type="submit"
              className="timesavebtn"
              onClick={closeEndTime}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
    </>
  )
}
