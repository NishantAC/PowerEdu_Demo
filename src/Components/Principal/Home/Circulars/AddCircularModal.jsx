import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './AddCircular.module.css';
import './Circulars.css'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import TelegramIcon from '@mui/icons-material/Telegram';
import schoolService from '../../../../services/school.service';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { TextField } from '@mui/material';
import Editor from './Editor';
import CircularService from '../../../../services/circular.service';

function AddCircularModal({ setRows }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setData] = useState({});
    const [logo, setLogo] = useState('');
    const { user } = useSelector(state => state.user)
    const [title, setTitle] = useState('')
    const [editorHtml, setEditorHtml] = useState('');

    const [value, setValue] = useState(new Date());
    const [openClndr, setOpenclndr] = useState(false);
    const openclndr = () => setOpenclndr(true);
    const closeclndr = () => setOpenclndr(false);

    useEffect(() => {
        schoolService.getSchoolData(user?.school_id)
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.error(error);
            });

        schoolService.getSchoolLogo(user?.school_id)
            .then((result) => {
                const url = URL.createObjectURL(new Blob([result], { type: "image/jpeg" }));
                setLogo(url);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handlePost = (e) => {
        e.preventDefault()
        const circularData = {
            school_id: user?.school_id,
            title,
            message: editorHtml,
            date: value,
            added_by: user.id
        }
        CircularService.createCircular(circularData).then(res => {
            // console.log(res)
            setRows(prev => [...prev, res])
            setTitle('')
            setEditorHtml('')
            setValue(new Date())
            handleClose()
        }).catch(err => console.error(err))
    }

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
                        <img className={styles.logo} src={logo || "https://i.ibb.co/6mNnF3y/preview.jpg"}></img>
                        <h2 className={styles.schoolname}>{data?.schoolname || "School Name"}</h2>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <TextField style={{ flexGrow: 1 }} id="filled-basic" size='small' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <button className={styles.clndrbtn} onClick={openclndr}>{moment(value).format('DD-MM-YYYY')}</button>
                    </div>
                    <div style={{ background: 'rgba(0, 0, 0, 0.02)', height: '400px' }}>
                        <h6 style={{ textAlign: 'center', padding: '10px 0px', margin: 0, fontWeight: '600' }}>Circular</h6>
                        {/* <textarea type="text" placeholder="Write your message" className={styles.inputbox}/> */}

                        <div className="editor" style={{ height: '90%' }}>
                            <Editor editorHtml={editorHtml} setEditorHtml={setEditorHtml} />
                        </div>
                    </div>

                    <button className={styles.postbtn} onClick={handlePost}>Post<TelegramIcon style={{ fontSize: '20px' }} /></button>
                </Box>
            </Modal>
            <Modal
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
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <div style={{ width: '70%', margin: 'auto', marginTop: '30px' }}>
                        <button type="submit" onClick={closeclndr} className={styles.addbtn}>Save</button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default AddCircularModal
