import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import styles from './AddTodoModal.module.css';

const CalendarModal = ({ open, onClose, value, onChange, onSave }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="boxstyle" sx={{ width: 'max-content', px: 1, py: 2 }}>
        <div style={{ display: 'flex', padding: '0' }}>
          <h4 style={{ color: 'rgba(0, 0, 0, 0.55)', margin: 'auto', width: '100%', textAlign: 'center' }}>
            Calendar
          </h4>
          <button className={styles.modalbutton} onClick={onClose}>
            X
          </button>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              className={styles.clndr}
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={value}
              onChange={onChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div style={{ width: '70%', margin: 'auto', marginTop: '30px' }}>
          <button type="submit" onClick={onSave} className={styles.addbtn}>
            Save
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default CalendarModal;
