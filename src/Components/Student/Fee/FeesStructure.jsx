import * as React from 'react';
import style from './Fees.module.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import moment from 'moment';
import JsPDF from 'jspdf';
import { useEffect } from 'react';
import schoolService from '../../../services/school.service';
import { useState } from 'react';

export default function FeesStructure(props) {

  const { user: currentUser } = useSelector((state) => state.user);
  const { schooldetail: userSchool } = useSelector((state) => state.schooldetail);
  const code = currentUser.school_id;
  const [logo, setLogo] = useState(null);

  /**
   * download pdf
   */
  const generatePDF = () => {
    const report = new JsPDF('portrait', 'pt', 'a4');
    report.html(document.querySelector('#feereciept')).then(() => {
      report.save('FeeReciept.pdf');
    });
  }

  /**
   * get logo
  */
  useEffect(() => {
    schoolService.getSchoolLogo(code)
      .then((result) => {
        const url = URL.createObjectURL(new Blob([result], { type: "image/jpeg" }))
        setLogo(url);
      }).catch((error) => {
        
      })
  }, [code])

  // 
  return (
    <div>
      <Modal
        open={props?.open}
        onClose={props?.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.modalstyles}>
          <button className={style.modalbutton} onClick={props?.handleClose}>X</button>
          {
            props?.data?.downloadOpt &&
            <button className={style.modalbutton} onClick={generatePDF}>
              <i class="bi bi-cloud-arrow-down"></i>
            </button>
          }
          <div id="feereciept">
            <div className='container'>
              <div className={style.cdiv1}>
                <img className={style.cimg} src={logo} alt={userSchool?.schoolname}></img>
                <h3 className={style.ch3}>{userSchool?.schoolname}</h3>
              </div>
              <div className={style.slipbg}>
                <div className={style.slipdiv1}>
                  <div className={style.slipdiv2}>
                    <p>Admission No:- <b>{currentUser?.admissionno}</b></p>
                    <p>Roll No:- <b>{currentUser?.rollno}</b></p>
                    <p>Student Name:- <b>{currentUser?.firstname} {currentUser?.lastname}</b></p>
                    <p>Parent Name:- <b>{currentUser?.guardianname}</b></p>
                  </div>
                  <div className={style.cdiv2}>
                    <p>Class:- <b>{currentUser.classname}</b></p>
                    <p>Due Date:- <b>{moment(props?.data?.feeType?.due_date).format("DD-MM-YYYY")}</b></p>
                  </div>
                </div>
                <div className={style.cdiv3}>
                  <div className={style.cdiv4}>
                    <p><b>Fees Breakup</b></p>
                    {
                      props?.data?.feeStructure.map(f => (
                        <>
                          <p>{f.breakup_desc}</p>
                        </>
                      ))
                    }
                  </div>
                  <div className={style.cdiv5}>
                    <p><b>Amount</b></p>
                    {
                      props?.data?.feeStructure.map(f => (
                        <>
                          <p>{f.amount}</p>
                        </>
                      ))
                    }
                  </div>
                </div>
                <div className={style.cdiv6}>
                  <div className={style.cdiv4}>
                    <p>Total amount to be paid:</p>
                  </div>
                  <div className={style.cdiv5}>
                    <p>{props?.data?.feeType?.amount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}