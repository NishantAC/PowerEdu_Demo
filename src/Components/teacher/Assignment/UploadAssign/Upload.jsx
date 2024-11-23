import './upload.css'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    px: 3,
    py: 1,
    overflowY: 'scroll'
};

function Upload({ Tdata }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <button className='Utabview' onClick={handleOpen}>View</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='mainbox'>
                    <div style={{ display: 'flex' }}>
                        <h3 className='head'>Uploaded Assignment</h3>
                        <button onClick={handleClose} className="crsbtn">X</button>
                    </div>

                    <>
                        <div style={{ width: '100%', padding: "20px" }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <label className='lbltext' >Subject</label><br />
                                    <select className='indrp' disabled >
                                        <option value={Tdata.subject.subject_name} >{Tdata.subject.subject_name}</option>
                                    </select>

                                    {/* <input type='text' className='insidetext' value={Tdata.subjectname} disabled></input> */}
                                </div>
                                <div>
                                    <label className='lbltext' >Class</label><br />
                                    <select className='indrp' disabled>
                                        <option value={Tdata.class_code} >{Tdata.class_code}</option>
                                    </select>
                                    {/* <input type='text' className='insidetext' value={Tdata.classname} disabled></input> */}
                                </div>
                            </div>
                            <br />
                            <div style={{ width: '100%' }}>
                                <label className='lbltext'>Assignment Description(Optional)</label><br />
                                <textarea style={{ width: "100%" }} className='insidetext' disabled>{Tdata.description}</textarea>
                            </div>
                            <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div >
                                    <label className='lbltext'>Assigned Date</label>
                                    <br />
                                    <input type='date' value={Tdata.duration.assigndate} className='insidetext' disabled />
                                    {/* <span className='insidetext' >{</span> */}
                                </div>
                                <div >
                                    <label className='lbltext'>Submit Date</label>
                                    <br />
                                    <input type='date' value={Tdata.duration.duedate} className='insidetext' disabled />
                                    {/* <span className='insidetext' >{Tdata.duedate}</span> */}
                                </div>
                            </div>
                            <br />
                            {/* <div style={{ width: '100%' }}>
                                <label className='lbltext'>File</label>
                                <br />
                                <span style={{ fontWeight: '500', fontFamily: 'Poppins' }}>{Tdata.filename}</span>
                            </div> */}
                        </div>
                    </>
                </Box>
            </Modal>
        </>
    )
}

export default Upload
