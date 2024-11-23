import React from 'react';
import '../TeacherAssignment.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    px: 3,
    py: 1
};

function UploadedAssign() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <button onClick={handleOpen} className="assignviewbtn">View</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex' }}>
                        <h3 style={{ marginTop: '0px' }}>Uploaded Assignment</h3>
                        <button onClick={handleClose} className="crossbtn">X</button>
                    </div>
                    <div style={{ width: '88%', margin: '20px auto' }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '55%' }}>
                                <label>Subject</label><br />
                                <select style={{ border: '1px solid rgba(0, 0, 0, 0.2)', background: 'white', width: '100%', borderRadius: '5px', fontSize: '17px', padding: '6px 10px', color: '#414141' }}>
                                    <option value="" hidden></option>
                                    <option>Science</option>
                                    <option>Mathematics</option>
                                </select>
                            </div>
                            <div style={{ marginLeft: 'auto', width: '40%' }}>
                                <label>Class</label><br />
                                <select style={{ border: '1px solid rgba(0, 0, 0, 0.2)', background: 'white', borderRadius: '5px', fontSize: '17px', padding: '6px 10px', color: '#414141', width: '100%' }}>
                                    <option value="" hidden></option>
                                    <option>5A</option>
                                    <option>6A</option>
                                    <option>7A</option>
                                    <option>8A</option>
                                </select>
                            </div>
                        </div>
                        <br />
                        <div>
                            <label>Assignment Description (Optional)</label><br />
                            <textarea style={{ border: '1px solid rgba(0, 0, 0, 0.2)', background: 'white', width: '100%', minHeight: '80px' }}></textarea>
                        </div>
                        <br />
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '45%' }}>
                                <label>Assignmed Date</label>
                                <br />
                                <input type="date" style={{ border: '1px solid rgba(0, 0, 0, 0.2)', background: 'white', height: '28px', width: '100%', fontSize: '17px', color: '#494949' }} />
                            </div>
                            <div style={{ marginLeft: 'auto', width: '45%' }}>
                                <label>Submit Date</label>
                                <br />
                                <input type="date" style={{ border: '1px solid rgba(0, 0, 0, 0.2)', background: 'white', height: '28px', width: '100%', fontSize: '17px', color: '#494949' }} />
                            </div>
                        </div>
                        <br />
                        <br />
                        <div style={{ textAlign: 'center' }}>
                            <button style={{ background: '#3CB532', width: '70%', margin: 'auto', color: 'white', border: 'none', padding: '8px' }}>Upload Paper</button>
                        </div>
                        <br />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default UploadedAssign
