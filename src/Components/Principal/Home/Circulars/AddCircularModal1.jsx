import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './AddCircular.module.css';
import './Circulars.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import TelegramIcon from '@mui/icons-material/Telegram';
import { TextField } from '@mui/material';
import schoolService from '../../../../services/school.service';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AddCircularModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState({});
  const [logo, setLogo] = useState('');
  const { user } = useSelector(state => state.user);

  const [value, setValue] = useState(new Date());
  const [openClndr, setOpenclndr] = useState(false);
  const openclndr = () => setOpenclndr(true);
  const closeclndr = () => setOpenclndr(false);

  const [editorValue, setEditorValue] = useState('');

  useEffect(() => {
    schoolService.getSchoolData(user?.schoolcode)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });

    schoolService.getSchoolLogo(user?.schoolcode)
      .then((result) => {
        const url = URL.createObjectURL(new Blob([result], { type: 'image/jpeg' }));
        setLogo(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <p onClick={handleOpen} style={{ margin: '0px' }}>+</p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.boxstyle}>
          <button className={styles.modalbutton} onClick={handleClose}>X</button>
          <div style={{ display: 'flex', marginTop: '5px', marginBottom: '8px' }}>
            <img className={styles.logo} src={logo || "https://i.ibb.co/6mNnF3y/preview.jpg"} alt="School Logo" />
            <h2 className={styles.schoolname}>{data?.schoolname || "School Name"}</h2>
          </div>
          <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'space-between', marginBottom: '5px' }}>
            <TextField style={{ flexGrow: 1 }} id="filled-basic" size='small' placeholder='Subject' />
            <button className={styles.clndrbtn} onClick={openclndr}>{moment(value).format('DD-MM-YYYY')}</button>
          </div>
          <div style={{ background: 'rgba(0, 0, 0, 0.02)', height: '400px' }}>
            <h6 style={{ textAlign: 'center', borderBottom: '1px solid #DBDBDB', padding: '10px 0px', fontWeight: '600' }}>Circular</h6>
            <ReactQuill
              value={editorValue}
              onChange={setEditorValue}
              style={{ height: '88%' }}
            />
          </div>
          <button className={styles.postbtn}>Post<TelegramIcon style={{ fontSize: '20px' }} /></button>
        </Box>
      </Modal>
      <Modal
        open={openClndr}
        onClose={closeclndr}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="boxstyle" sx={{width: 'max-content', px: 1, py: 2}}>
            <div style={{display:'flex',padding:'0'}}>
                <h4 style={{color: 'rgba(0, 0, 0, 0.55)',margin:'auto',width:'100%',textAlign:'center'}}>Calendar</h4>
                <button className={styles.modalbutton} onClick={closeclndr}>X</button>
            </div>
            <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker className={styles.clndr}
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    value={value}
                    onChange={(newValue) => {
                    setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            </div>
            <div style={{width:'70%',margin:'auto',marginTop:'30px'}}>
                <button type="submit" onClick={closeclndr} className={styles.addbtn}>Save</button> 
            </div>
        </Box>
      </Modal>
    </div>
  )
}

export default AddCircularModal;