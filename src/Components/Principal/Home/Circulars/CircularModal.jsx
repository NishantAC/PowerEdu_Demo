import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './AddCircular.module.css';
import './Circulars.css'
import schoolService from '../../../../services/school.service';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Button, TextField } from '@mui/material';
import DisplayEditor from './DisplayEditor';
import TelegramIcon from '@mui/icons-material/Telegram';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CircularService from '../../../../services/circular.service';



function CircularModal({ rows, row, open, handleClose, edit, setRows }) {

  const [data, setData] = useState({});
  const [logo, setLogo] = useState('');
  const { user } = useSelector(state => state.user)
  const [editData, setEditData] = useState(row);
  const [openClndr, setOpenclndr] = useState(false);

  console.log(row, "this is row")

  useEffect(() => {
    setEditData(row)
  }, [row, open])

  const openclndr = () => setOpenclndr(true);
  const closeclndr = () => setOpenclndr(false);

  const handleChange = (name, value) => {
    setEditData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    schoolService.getSchoolData(user?.school_id)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });

    schoolService.getSchoolLogo(user?.school_id)
      .then((result) => {
        const url = URL.createObjectURL(new Blob([result], { type: "image/jpeg" }));
        setLogo(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault()
    const circularData = {
      school_id: user?.school_id,
      title: editData.title,
      message: editData.message,
      date: editData.date,
      added_by: user.id,
      id: editData.id
    }

    CircularService.editCircular(circularData)
      .then(updatedCircular => {
        console.log(updatedCircular);

        const updatedRows = rows.map(row => {
          if (row.id === updatedCircular.id) {
            return updatedCircular;
          }
          return row;
        });

        setRows(updatedRows);

        handleClose();
      })
      .catch(err => console.error(err));

  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.boxstyle}>
          <button className={styles.modalbutton} onClick={handleClose}>X</button>
          <div style={{ display: 'flex', marginTop: '5px', marginBottom: '8px' }}>
            <img className={styles.logo} src={logo || "https://i.ibb.co/6mNnF3y/preview.jpg"}></img>
            <h2 className={styles.schoolname}>{data?.school_name || "School Name"}</h2>
          </div>
          <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'space-between', marginBottom: '5px' }}>
            <TextField style={{ flexGrow: 1 }} id="filled-basic" size='small' placeholder='Title' value={editData.title} disabled={edit ? false : true} onChange={(e) => handleChange("title", e.target.value)} />
            <button className={styles.clndrbtn} onClick={() => edit && openclndr()}>{moment(editData.date).format('DD-MM-YYYY')}</button>
          </div>
          <div style={{ background: 'rgba(0, 0, 0, 0.02)', height: '400px' }}>
            <h6 style={{ textAlign: 'center', padding: '10px 0px', margin: 0, fontWeight: '600' }}>Circular</h6>
            {/* <textarea type="text" placeholder="Write your message" className={styles.inputbox}/> */}

            <div className="editor" style={{ height: '90%' }}>
              <DisplayEditor handleChange={handleChange} editorHtml={editData.message} edit={edit} />
            </div>
            {edit && <button className={styles.postbtn} onClick={handleEdit}>Post<TelegramIcon style={{ fontSize: '20px' }} /></button>}

          </div>
        </Box>
      </Modal>
      {edit && <Modal
        open={openClndr}
        onClose={closeclndr}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="boxstyle" sx={{ width: 'max-content', px: 1, py: 2 }}>
          <div style={{ display: 'flex', padding: '0' }}>
            <h4 style={{ color: 'rgba(0, 0, 0, 0.55)', margin: 'auto', width: '100%', textAlign: 'center' }}>Calendar</h4>
            <button className={styles.modalbutton} onClick={closeclndr}>X</button>
          </div>
          <div>
            {/* <Calendar onChange={onChange} value={value} /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker className={styles.clndr}
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={editData.date}
                onChange={(newValue) => {
                  handleChange("date", newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div style={{ width: '70%', margin: 'auto', marginTop: '30px' }}>
            <button type="submit" onClick={closeclndr} className={styles.addbtn}>Save</button>
          </div>
        </Box>
      </Modal>}
    </div>
  )
}

export default CircularModal
