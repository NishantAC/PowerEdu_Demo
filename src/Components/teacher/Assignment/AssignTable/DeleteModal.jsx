
import { Box, Modal } from '@mui/material';
import './AssignTable.css'
import { useState } from "react";
import AssignmentService from '../../../../services/assignment.service';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 360,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
};


function DeleteModal(props) {

    const [modalOpen, setModalOpen] = useState(false);
    // const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleDelete = () => {
        deleteAssignment(props.id)
        handleModalClose();
    }

    /**
    *Delete a assignment 
    */
    const deleteAssignment = (id) => {
        
        AssignmentService.deleteAssignment({ "assignmentId": id }).then((res) => {
            props.initialData();
        }).catch((err) => {
            console.error("Problem in AssignTabel :: deleteAssignment() => ", err);
        })
    }

    return (<>
        <button className="TtabDel" onClick={() => setModalOpen(true)}>Delete</button>
        <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} style={{ background: "#ffffff", width: "465px !important" }}>
                <div style={{ display: 'flex' }}>
                    <h5 className='head'>Delete Assignment</h5>
                    <button onClick={handleModalClose} className="crsbtn">X</button>
                </div>
                <p
                    style={{
                        fontFamily: 'Poppins',
                        fontWeight: '500',
                        fontSize: '18px',
                        color: '#494949',
                        textAlign: 'center',
                        marginTop: '20px'
                    }}>
                    Confirm Delete Assignment Request ?
                </p>
                <br />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <>
                        <button onClick={handleModalClose} style={{ background: 'rgba(216, 97, 103, 0.1)', padding: '8px 40px', color: ' #494949', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                    </>
                    <>
                        <button onClick={handleDelete} style={{ background: '#D86167', padding: '8px 40px', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Delete</button>
                    </>
                </div>
            </Box>
        </Modal>
    </>
    )
}

export default DeleteModal;



{/* <Modal
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
        <div style={{ width: '90%', margin: 'auto' }} >
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
</Modal> */}
