
import { Box, Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deletePaper } from '../../../../slices/questionpaper';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 360,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function DeleteModal({ open, handleClose, paperId }) {
    const dispatch = useDispatch()

    
    const handleDelete = (e) => {
        dispatch(deletePaper({id: paperId}));
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div style={{ display: 'flex' }}>
                    <h5 style={{ marginTop: '0px' }}>Delete Confirmation</h5>
                    <button onClick={handleClose} className="crossbtn">X</button>
                </div>
                <p style={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: '18px', color: '#494949', textAlign: 'center', marginTop: '20px' }}>
                Are you sure you want to delete this?
                </p>
                <br />
                <Box display={'flex'} justifyContent='space-evenly' >
                    <button onClick={handleClose} style={{ background: 'rgba(216, 97, 103, 0.1)', padding: '8px 40px', color: ' #494949', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleDelete} style={{ background: '#D86167', padding: '8px 40px', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Delete</button>

                </Box>

            </Box>
        </Modal>


    )


}

export default DeleteModal;