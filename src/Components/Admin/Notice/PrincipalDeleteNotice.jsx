import React from 'react';
import styles from './AdminNotice.module.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ClassNoticeService from '../../../services/classnotice.service';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    // px: 2,
    // py: 2
};

function PrincipalDeleteNotice({ title, id, type, fetchNotices, filterClass }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.warn(type);

    const deleteNotice =  () => {
             ClassNoticeService.deleteClassNotice(id).then((res) => {
                fetchNotices(filterClass);
                toast(res?.message);
                handleClose();
                console.table("class_notices", res.data)
            }).catch((err) => console.error(err));
        }
    

    return (
        <div>
            <FontAwesomeIcon onClick={handleOpen} icon={faTrash} style={{ color: "#6755D9", cursor: "pointer" }} />
            <Modal
                style={{ zIndex: '0' }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={styles.box} >
                    <div className={styles.boxdiv}>
                        <h3 className={styles.boxdivh3}>Delete Notice</h3>
                        <button onClick={handleClose} className={styles.crossbtn}>X</button>
                    </div>
                    <div style={{width: "90%", margin: 'auto'}}>
                        <div style={{display: "flex", textAlign: "center", justifyContent: "center", paddingTop: "10px" }} >
                            <h4 style={{
                                fontFamily: 'Poppins',
                                fontStyle: "normal",
                                fontWeight: 500,
                                fontSize: "20px",
                                lineHeight: "21px",
                                color: "#494949"
                            }}>Do you really want to delete
                                <br />
                                <span style={{ color: "#6755d9", fontSize: "18px" }}>{title}</span>?
                            </h4>
                        </div>
                        <div className={styles.formbtn} style={{ display: "flex", gap: 20 }} >
                            <button type="button" className={styles.upload} onClick={deleteNotice}>Yes</button>
                            <button type="button" onClick={handleClose} className={styles.upload} >No</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default PrincipalDeleteNotice
