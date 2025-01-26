import React, { useState } from 'react';
import styles from './ProfileDetails.module.css';
import TextField from '@mui/material/TextField';
import { useSelector,useDispatch } from 'react-redux';
import { color } from '@mui/system';
import { Avatar } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { setUser } from '../../../slices/user';
import ProfileService from '../../../services/profile.service';


const option = {
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#000000",
        fontWeight: 600
    }
}
function ProfileDetails() {

    const dispatch = useDispatch(); // Get the dispatch function
    const { user: currentUser } = useSelector((state) => state.user);
    const image = useSelector((state) => state.image);

    const [edit, setEdit] = useState(true);
    const [email, setEmail] = useState(currentUser?.email);
    const [addressLine1, setAddressLine1] = useState(currentUser?.adress1);
    const [addressLine2, setAddressLine2] = useState(currentUser?.adress2);



    const handleEdit = () => {
        setEdit(!edit);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            // Make an API call to update the user's data in the database
            const response = ProfileService.updateUserInfo(currentUser.id, email, addressLine1, addressLine2); 

                // Update the local storage data with the new values
                const updatedUser = { ...currentUser, email, adress1: addressLine1, adress2: addressLine2 };
                localStorage.setItem("user", JSON.stringify(updatedUser));

                // Update the user data in the Redux store
                dispatch(setUser(updatedUser));

            setEdit(true);
            
        } catch (error) {
            console.error("Error updating user info", error);
        }
    }

    const initial = currentUser.firstname[0].toUpperCase();

    return (
       <form onSubmit={handleSubmit}>
            
        <div className={styles.Main}>
            <div className={styles.backcol2}>
                <div className={styles.profile}>
                    <h2 className={styles.divh2}>Student Profile</h2>
                    {image ? <Avatar className={styles.divp} sx={{ height: '150px', width: '150px' }} alt={currentUser?.firstname.toUpperCase()} src={image} />
                        : <div className={styles.divp}><p className={styles.proIcon}>{initial}</p></div>}
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.div1}>
                    <TextField value={currentUser?.firstname} className={styles.TextField} label="First Name" variant="outlined" type="text" disabled={true} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.middlename} className={styles.TextField} label="Middle Name(optional)" variant="outlined" type="text" disabled={true} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.lastname} className={styles.TextField} label="Last Name" variant="outlined" type="text" disabled={true} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div1}>
                    <TextField value={currentUser?.classname} className={styles.TextField} label="Class" variant="outlined" disabled={true} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.rollno} className={styles.TextField} label="Roll No" variant="outlined" disabled={true} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.admissionno} className={styles.TextField} label="Admission No" variant="outlined" type="number" disabled={true} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div1}>
                    <TextField value={currentUser?.admisiondate} className={styles.TextField} label="Admission Date" variant="outlined" disabled={true} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={email} onChange={(e) => setEmail(e.target.value)} className={styles.TextField} label="Email" variant="outlined" type="email" disabled={edit} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.dob} className={styles.TextField} label="D.O.B." variant="outlined" disabled={true} sx={option} InputLabelProps={{ sx: { marginTop: '0px' } }} />
                </div>
                <div className={styles.div1}>
                    <TextField value={currentUser?.fathername} className={styles.TextField} label="Father Name" variant="outlined" type="text" disabled={true} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.mothername} className={styles.TextField} label="Mother Name" variant="outlined" type="text" disabled={true} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.guardianname} className={styles.TextField} label="Guardian Name(optional)" variant="outlined" type="text" disabled={true} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div2}>
                    <TextField value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className={styles.TextField2} label="Address Line 1" variant="outlined" disabled={edit} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div2}>
                    <TextField value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className={styles.TextField2} label="Address Line 2" variant="outlined" disabled={edit} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div1}>
                    <TextField value={currentUser?.father_contact} className={styles.TextField} label="Father Contact No." variant="outlined" disabled={true} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.mother_contact} className={styles.TextField} label="Mother Contact No." variant="outlined" disabled={true} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                {<div className={styles.div3}>
                <button type='button' onClick={handleEdit} className={styles.profilebtn}>Edit<EditOutlinedIcon className={styles.EdIcon} /></button>
                <button type='submit' className={styles.profilebtn}>Save & Close</button>
            </div>}
            </div>
        </div>
       </form>
    )
}

export default ProfileDetails
