import { Box, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import schoolService from '../../../../services/school.service';

const MyModal = (props) => {
    const [openDetails, setOpenDetails] = useState(false);

    //states for modal
    const handleOpen = () => setOpenDetails(true);
    const handleClose = () => setOpenDetails(false);

    //detail of user
    const { user: currentUser } = useSelector((state) => state.user);
    const { schooldetail: userSchool } = useSelector((state) => state.schooldetail);
    const code = currentUser.school_id;
    const [logo, setLogo] = useState(null);

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
    }, []
    )

    return (
        <div>
            <button className="feesviewdetailsbtn" onClick={handleOpen}>
                View Details
            </button>
            <Modal open={openDetails} onClose={handleClose}>
                <Box className="modalstyles">
                    <button className="modalbutton" onClick={handleClose}>
                        X
                    </button>
                    <div id="feereciept">
                        <div className='container'>
                            <div className={"cdiv1"}>
                                <img className={"cimg"} src={logo} alt={userSchool?.schoolname}></img>
                                <h3 className={"ch3"}>{userSchool?.schoolname || "school"}</h3>
                            </div>
                            <div className={"slipbg"}>
                                <div className="cdiv3">
                                    <div className="cdiv4">
                                        <p><b>Fees Breakup</b></p>
                                        {
                                            props?.data.map(f => (
                                                <>
                                                    <p>{f.breakup_desc}</p>
                                                </>
                                            ))
                                        }
                                    </div>
                                    <div className="cdiv5">
                                        <p><b>Amount</b></p>
                                        {
                                            props?.data.map(f => (
                                                <>
                                                    <p>{f.amount}</p>
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="cdiv6">
                                    <div className="cdiv4">
                                        <p>Total amount to be paid:</p>
                                    </div>
                                    <div className="cdiv5">
                                        <p>{props?.total}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box >
            </Modal >
        </div >
    );
};

export default MyModal;
