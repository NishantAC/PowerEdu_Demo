import { Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import React from 'react';
import './HomeworkAssign.css';
import homework from "./assets/homework.png";
import writing from "./assets/writing.png";
import { Link } from "react-router-dom";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    width: "45vw",
    height: "65vh",
};

const HomeworkAssignmodel = ({ open, handleClose }) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ width: 'fit-content', fontFamily: "sans-serif", fontStyle: "normal", fontWeight: "600", fontSize: "20px" }}>Homework/Assignments</span>
                    <button className="modalbutton" onClick={handleClose}>X</button>
                </Box>
                <Box className="modelbody">
                    <Link to="/teacher/add-homework" className="homeworksection">
                        <img src={homework} alt="homework" />
                        <span>HomeWork Section</span>
                    </Link>
                    <Link to="/teacher/add-assignment" className="homeworksection">
                        <img src={writing} alt="assignment" />
                        <span>Assignment Section</span>
                    </Link>
                </Box>
            </Box>

        </Modal>
    )
}

export default HomeworkAssignmodel


