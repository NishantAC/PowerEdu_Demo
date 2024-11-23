import * as React from 'react';
import style from './Fees.module.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';

function createData(feesbreakups, amount) {
    return {feesbreakups, amount};
  }
  
  const rows = [
    createData('Tution Fees','2000.00'),
    createData('Library', '500.00'),
    createData('Misc Fees','500.00'),
  ];

export default function FeesSlip() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const { school: userSchool } = useSelector((state) => state.school);

  return (
    <div>
      <p onClick={handleOpen}>Download Receipt</p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.modalstyles}>
            <button className={style.modalbutton} onClick={handleClose}>X</button>
            <div className={style.cdiv1}>
                    <img className={style.cimg} src="https://i.ibb.co/6mNnF3y/preview.jpg"></img>
                    <h3 className={style.ch3}>{userSchool.schoolname}</h3>
            </div>
            <div className={style.slipbg}>
                <div className={style.slipdiv1}>
                    <div className={style.slipdiv2}>
                        <p>Admission No:- <b>{currentUser.admissionno}</b></p>
                        <p>Roll No:- <b>{currentUser.rollno}</b></p>
                        <p>Student Name:- <b>{currentUser.firstname} {currentUser.lastname}</b></p>
                        <p>Parent Name:- <b>{currentUser.parentname}</b></p>
                    </div>
                    <div className={style.cdiv2}>
                        <p>Class:- <b>{currentUser.classname}</b></p>
                        <p>Due Date:- <b>25-08-21</b></p>
                        <p>Paid on:- <b>25-08-2021</b></p>
                        {/* <p>Payment Type:- <b>Online</b></p> */}
                    </div>
                </div>
                <div className={style.cdiv3}>
                    <div className={style.cdiv4}>
                        <p>Fees Breakup</p>        
                        {rows.map((row)=>(
                            <p>{row.feesbreakups}</p>
                        ))}
                    </div>
                    <div className={style.cdiv5}>
                        <p>Amount</p>
                        {rows.map((row)=>(
                            <p>{row.amount}</p>
                        ))}
                    </div>
                </div>
                <div className={style.cdiv6}>
                    <div className={style.cdiv4}>
                        <p>Total amount paid:</p>
                    </div>
                    <div className={style.cdiv5}>
                        <p>3000</p>
                    </div>
                </div>
            </div>
        </Box>
      </Modal>
    </div>
  );
}