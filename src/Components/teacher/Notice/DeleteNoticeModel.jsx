import React from 'react';
import styles from './TeacherNotice.module.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FaTrash } from "react-icons/fa6";
import ClassNoticeService from '../../../services/classnotice.service';
import { toast } from 'sonner';

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

function DeleteNoticeModal({ title, id, type, fetchNotices, classIds,setType }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.warn(type);

    const deleteNotice = async () => {
        if (type === "class_notices") {
            await ClassNoticeService.deleteClassNotice(id).then((res) => {
                fetchNotices(classIds);
                classFunc()
                toast(res?.message);
                handleClose();
                console.table(res.data)
            }).catch((err) => console.error(err));
        }
        //this is schoolnotice
        else if (type === "overall") {
            // await ClassNoticeService.deleteSchoolNotice(id).then((res) => {
            //     //get the notice again
            //     fetchNotices(classIds);
            //     schoolFunc()
            //     //show notification
            //     toast(res?.message);
            //     //close the model
            //     handleClose();
            //     console.table(res)
            // }).catch((err) => console.error(err));
        }
    }

    return (
        <div>
            <FaTrash onClick={handleOpen} className={styles.deleteicon} />
                
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
                    <div style={{width: '90%', margin: 'auto'}} >
                        <div style={{ display: "flex", textAlign: "center", justifyContent: "center", paddingTop: "10px" }} >
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

export default DeleteNoticeModal
