import React, { useEffect, useState } from 'react';
import './ProfileDetails.css';
import TextField from '@mui/material/TextField';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentDetails, updateStudentDetails } from '../../../../slices/student';

const option = {
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#000000",
        fontWeight: 600,
    },
};

function ProfileDetails({ UserId }) {
    const dispatch = useDispatch();
    const { student: studentDetails } = useSelector((state) => state.student);
    const [disable, setDisable] = useState(true);
    const [updatedDetails, setUpdatedDetails] = useState(studentDetails);

    useEffect(() => {
        dispatch(fetchStudentDetails({ user_id: UserId }))
    }, [])

    const handleEdit = () => {
        dispatch(fetchStudentDetails({ user_id: UserId }))
        setDisable(!disable)
    };

    useEffect(() => {
        setUpdatedDetails(studentDetails)
    }, [studentDetails])
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setUpdatedDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleUpdate = () => {
        dispatch(updateStudentDetails(updatedDetails))
    }


    return (
        <div className="details">
            <div className="Principaldiv1">
                <TextField
                    value={updatedDetails?.firstname}
                    className="TextField"
                    label="First Name"
                    variant="outlined"
                    type="text"
                    disabled={disable}
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="firstname"
                    onChange={handleInputChange}
                />
                <TextField
                    value={updatedDetails?.middlename}
                    className="TextField"
                    label="Middle Name(optional)"
                    variant="outlined"
                    type="text"
                    disabled={disable}
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="middlename"
                    onChange={handleInputChange}
                />
                <TextField
                    value={updatedDetails?.lastname}
                    className="TextField"
                    label="Last Name"
                    variant="outlined"
                    type="text"
                    disabled={disable}
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="lastname"
                    onChange={handleInputChange}
                />
            </div>
            <div className="Principaldiv1">
                <TextField
                    value={updatedDetails?.class}
                    className="TextField"
                    label="Class"
                    variant="outlined"
                    disabled
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                />
                <TextField
                    value={updatedDetails?.rollno}
                    className="TextField"
                    label="Roll No"
                    variant="outlined"
                    disabled={disable}
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="rollno"
                    onChange={handleInputChange}
                />
                <TextField
                    value={updatedDetails?.admissionno}
                    className="TextField"
                    label="Admission No"
                    variant="outlined"
                    disabled
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="admissionno"
                    onChange={handleInputChange}
                />
            </div>
            <div className="Principaldiv1">
                <TextField
                    value={updatedDetails?.admissionDate}
                    className="TextField"
                    label="Admission Date"
                    variant="outlined"
                    disabled={disable}
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="admissionDate"
                    onChange={handleInputChange}
                />
                <TextField
                    value={updatedDetails?.email}
                    className="TextField"
                    label="Email"
                    variant="outlined"
                    type="email"
                    disabled={disable}
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="email"
                    onChange={handleInputChange}
                />
                <TextField
                    value={updatedDetails?.dob}
                    className="TextField"
                    label="D.O.B."
                    variant="outlined"
                    type="text"
                    sx={option}
                    disabled={disable}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="dob"
                    onChange={handleInputChange}
                />
            </div>
            <div className="Principaldiv1">
                <TextField
                    value={updatedDetails?.fathername}
                    className="TextField"
                    label="Father Name"
                    variant="outlined"
                    type="text"
                    disabled={disable}
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="fathername"
                    onChange={handleInputChange}
                />
                <TextField
                    value={updatedDetails?.mothername}
                    className="TextField"
                    label="Mother Name"
                    variant="outlined"
                    type="text"
                    disabled={disable}
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="mothername"
                    onChange={handleInputChange}
                />
                <TextField
                    value={updatedDetails?.guardianname}
                    className="TextField"
                    label="Guardian Name(optional)"
                    variant="outlined"
                    type="text"
                    disabled={disable}
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="guardianname"
                    onChange={handleInputChange}
                />
            </div>
            <div className="Principaldiv2">
                <TextField
                    value={updatedDetails?.address1}
                    className="TextField2"
                    label="Address Line 1"
                    variant="outlined"
                    disabled={disable}
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="address1"
                    onChange={handleInputChange}
                />
            </div>
            <div className="Principaldiv2">
                <TextField
                    value={updatedDetails?.address2}
                    className="TextField2"
                    label="Address Line 2"
                    variant="outlined"
                    disabled={disable}
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="address2"
                    onChange={handleInputChange}
                />
            </div>
            <div className="Principaldiv1">
                <TextField
                    value={updatedDetails?.fathercontact}
                    className="TextField"
                    label="Home Contact No."
                    variant="outlined"
                    disabled={disable}
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="fathercontact"
                    onChange={handleInputChange}
                />
                <TextField
                    value={updatedDetails?.mothercontact}
                    className="TextField"
                    label="Mother Contact No."
                    variant="outlined"
                    disabled={disable}
                    sx={option}
                    InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
                    name="mothercontact"
                    onChange={handleInputChange}
                />
            </div>
            <div style={{ textAlign: "right", padding: '0px 5px', width: "100%" }}>
                <button
                    className="profilebtn"
                    onClick={handleEdit}
                    style={{ backgroundColor: "#309D1E", display: 'inline-flex', gap: '8px', alignItems: 'center' }}
                >
                    Edit
                    <EditOutlinedIcon
                        style={{
                            fontSize: "16px",
                            // margin: "0px 8px",
                            verticalAlign: "middle",
                        }}
                    />
                </button>
                <button
                    className="profilebtn"
                    onClick={handleUpdate}
                    style={{ backgroundColor: "#214DF9" }}
                >
                    Save & Close
                </button>
            </div>
        </div>
    );
}

export default ProfileDetails
