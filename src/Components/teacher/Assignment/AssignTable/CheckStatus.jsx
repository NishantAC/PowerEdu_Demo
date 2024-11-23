import React, { useEffect, useState } from 'react';
import '../TeacherAssignment.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import "./Modal.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 240,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    height: '75%'
};

function CheckStatus({ checkbox, open, checkedAll, handleClose, checkAll, checkOne, updStdAssStatus }) {
    
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', margin: '8px 15px' }}>
                        <h3 className='head'>Update Status</h3>
                        <button onClick={handleClose} className="crsbtn">X</button>
                    </div>
                    <div style={{ height: '85%', overflowY: 'auto' }}>
                        <div div key={0} style={{ margin: '0 30px' }}>
                            <p className='text'>All<input type="checkbox" checked={checkedAll} onChange={() => { checkAll(checkbox) }} className='radiobtn' /></p>
                        </div>
                        {checkbox.map((row, index) => (
                            <> <hr style={{ margin: "0" }} />
                                <div key={index + 1} style={{ margin: '0 30px' }}>
                                    <p className='text'>{row.name}
                                        <input type="checkbox" checked={row.checked} value={row.userid} onChange={checkOne} className='radiobtn' />
                                    </p>
                                </div>
                            </>
                        ))}
                    </div>

                    <button onClick={updStdAssStatus} className='save'>Save</button>
                </Box>
            </Modal>
        </div >
    )
}

export default CheckStatus
