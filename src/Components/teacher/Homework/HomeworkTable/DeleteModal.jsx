
import { Box, Modal } from '@mui/material';
import './HomeworkTable.css'
import { useState } from 'react';
import HomeWorkService from '../../../../services/homework.service';
import { toast } from 'react-toastify';

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
    const handleModalClose = () => setModalOpen(false);

    const handleDelete = () => {
        deleteHomework(props.id)
        handleModalClose();
    }

    /**
    *Delete a assignment 
    */
    const deleteHomework = (id) => {
        HomeWorkService.deleteHomework({ "homeworkId": id }).then((res) => {
            console.log(res)
            if (res.message) {
                toast.success(res.message);
                props.initialData();
            }
        }).catch((err) => {
            console.error("Problem in TeacherHomework :: deleteHomework() => ", err);
        })
    }

    return (
        <>
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
