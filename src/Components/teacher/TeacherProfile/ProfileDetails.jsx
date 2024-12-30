import React, { useEffect } from 'react';
import styles from './ProfileDetails.module.css';
import TextField from '@mui/material/TextField';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import classService from '../../../services/class.service';

const option = {
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#000000",
        fontWeight: 600
    }
}

function ProfileDetails() {
    const [disable, setDisable] = React.useState(true);
    const handleEdit = () => setDisable(!disable);
    const handleSave = () => setDisable(true);
    const { user: currentUser } = useSelector((state) => state.user);
    const initial = currentUser.firstname[0].toUpperCase();
    const [classes, setClasses] = React.useState('');
    const image = useSelector((state) => state.image);

    
    const getClassed = async () => {
        const result = await classService.getClasses(currentUser.userid);
        setClasses(result.data.classes.toString());
    }

    useEffect(() => {
        getClassed();
    }, [])

    return (
        <div className={styles.Main}>
            <div className={styles.backcol2}>
                <div className={styles.profile}>
                    <h2 className={styles.divh2}>Teacher Profile</h2>
                    <div className={styles.divp}>
                    {image ? <Avatar sx={{ height: '150px', width: '150px' }} alt={currentUser?.firstname.toUpperCase()} src={image} />
                        : <p className={styles.proIcon}>{initial}</p>}</div>
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.div1}>
                    <TextField value={currentUser?.firstname} className={styles.TextField} label="First Name" variant="outlined" type="text" disabled={true} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.middlename} className={styles.TextField} label="Middle Name(optional)" variant="outlined" type="text" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.lastname} className={styles.TextField} label="Last Name" variant="outlined" type="text" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div1}>
                    <TextField value={currentUser.classes ?? "none"} className={styles.TextField} label="Class" variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser.dob} className={styles.TextField} label="D.O.B." variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.id} className={styles.TextField} label="Teacher ID" variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div1}>
                    <TextField value={currentUser?.doj} className={styles.TextField} label="Date Of Joining" variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.email} className={styles.TextField} label="Email" variant="outlined" type="email" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.qualification ?? "Ba"} className={styles.TextField} label="Qualification" variant="outlined" type="text" sx={option} disabled={disable} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div1}>
                    <TextField value={currentUser?.fathername} className={styles.TextField} label="Father Name" variant="outlined" type="text" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.mothername} className={styles.TextField} label="Mother Name" variant="outlined" type="text" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.guardianname} className={styles.TextField} label="Guardian Name(optional)" variant="outlined" type="text" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div2}>
                    <TextField value={currentUser?.address1} className={styles.TextField2} label="Address Line 1" variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div2}>
                    <TextField value={currentUser?.address2} className={styles.TextField2} label="Address Line 2" variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div1}>
                    <TextField value={currentUser?.fathercontact} className={styles.TextField} label="Father Contact No." variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.mothercontact} className={styles.TextField} label="Mother Contact No." variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                {/* <div className={styles.div3}>
                    <button className={styles.profilebtn} onClick={handleEdit} >Edit<EditOutlinedIcon className={styles.EdIcon} /></button>
                    <button className={styles.profilebtn} onClick={handleSave}>Save & Close</button>
                </div> */}
            </div>
        </div>
    )
}

export default ProfileDetails
