import React, { useState, useEffect } from 'react';
import './ProfileDetails.css';
import TextField from '@mui/material/TextField';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentDetails, updateStudentDetails } from "../../../../slices/student"

function ProfileDetails({ hideOverall, userId }) {
    const dispatch = useDispatch();
    const { student: studentDetails } = useSelector((state) => state.student);
    const [edit, setEdit] = useState(true);
    const [updatedDetails, setUpdatedDetails] = useState(studentDetails);

    useEffect(() => {
        setUpdatedDetails(studentDetails)
    }, [studentDetails])

    useEffect(() => {
        dispatch(fetchStudentDetails({ user_id: userId }))
    }, [])

    const handleChange = (e, field) => {
        setUpdatedDetails((prev) => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSubmit = () => {
        dispatch(updateStudentDetails(updatedDetails))
        hideOverall()
    }

    console.log(studentDetails)
    return (
        <div>
            <div className='profilediv1'>
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'firstname')} value={updatedDetails?.firstname} id="outlined-basic" label="First Name" variant="outlined" className='textfieldprofile' />
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'middlename')} value={updatedDetails?.middlename} id="outlined-basic" label="Middle Name(optional)" variant="outlined" className='textfieldprofile' />
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'lastname')} value={updatedDetails?.lastname} id="outlined-basic" label="Last Name" variant="outlined" className='textfieldprofile' />
            </div>
            <div className='profilediv1'>
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'class')} value={updatedDetails?.class} id="outlined-basic" label="Class" variant="outlined" className='textfieldprofile' />
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'rollno')} value={updatedDetails?.rollno} id="outlined-basic" label="Roll No" variant="outlined" className='textfieldprofile' />
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'admissionno')} value={updatedDetails?.admissionno} id="outlined-basic" label="Admission No" variant="outlined" className='textfieldprofile' />
            </div>
            <div className='profilediv1'>
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'admissionDate')} value={updatedDetails?.admissionDate} type='date' id="outlined-basic" label="Admission Date" variant="outlined" className='textfieldprofile' />
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'email')} value={updatedDetails?.email} id="outlined-basic" label="Email" variant="outlined" className='textfieldprofile' />
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'dob')} value={updatedDetails?.dob} type='date' id="outlined-basic" label="D.O.B." variant="outlined" className='textfieldprofile' />
            </div>
            <div className='profilediv1'>
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'fathername')} value={updatedDetails?.fathername} id="outlined-basic" label="Father Name" variant="outlined" className='textfieldprofile' />
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'mothername')} value={updatedDetails?.mothername} id="outlined-basic" label="Mother Name" variant="outlined" className='textfieldprofile' />
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'guardianname')} value={updatedDetails?.guardianname} id="outlined-basic" label="Guardian Name(optional)" variant="outlined" className='textfieldprofile' />
            </div>
            <div className='profilediv2'>
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'address1')} value={updatedDetails?.address1} id="outlined-basic" label="Address Line 1" variant="outlined" className='textfieldprofile2' />
            </div>
            <div className='profilediv2'>
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'address2')} value={updatedDetails?.address2} id="outlined-basic" label="Address Line 2" variant="outlined" className='textfieldprofile2' />
            </div>
            <div className='profilediv1'>
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'fatherContact')} value={updatedDetails?.fatherContact} id="outlined-basic" label="Father Contact No." variant="outlined" className='textfieldprofile' />
                <TextField disabled={edit} onChange={(e) => handleChange(e, 'motherContact')} value={updatedDetails?.motherContact} id="outlined-basic" label="Mother Contact No." variant="outlined" className='textfieldprofile' />
            </div>
            <div style={{ textAlign: 'right', marginRight: '5%', width: '100%' }}>
                <button onClick={() => setEdit(!edit)} className="profilebtn" style={{ backgroundColor: '#309D1E' }}>Edit<EditOutlinedIcon style={{ fontSize: '16px', margin: '0px 8px', verticalAlign: 'middle' }} /></button>
                <button onClick={handleSubmit} className="profilebtn" style={{ visibility: edit ? 'hidden' : '', backgroundColor: '#214DF9' }}>Save & Close</button>
            </div>
        </div>
    )
}

export default ProfileDetails
