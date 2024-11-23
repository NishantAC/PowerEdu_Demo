import React from 'react';
import styles from './ProfileDetails.module.css';
import TextField from '@mui/material/TextField';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';

const option = {
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#000000",
        fontWeight: 600
    }
}
function ProfileDetails() {
    const [disable, setDisable] = React.useState(true);
    const handleEdit = () => setDisable(false);
    const handleSave = () => setDisable(true);
    const { user: currentUser } = useSelector((state) => state.user);
    const initial = currentUser.firstname[0].toUpperCase();

    const image = useSelector((state) => state.image);

    return (
        <div className={styles.Main}>
            <div className={styles.backcol2}>
                <div className={styles.profile}>
                    <h2 className={styles.divh2}>Principal Profile</h2>
                    <div className={styles.divp}>
                        {image ? <Avatar  sx={{ height: '150px', width: '150px' }} alt={currentUser?.firstname} src={image} style={{ backgroundColor: '#5647b2' }} />
                            : <p className={styles.proIcon}>{initial}</p>}
                    </div>
                </div>
            </div>

            <div className={styles.details}>

                {/* <div className={styles.div4}>
              
                <TextField className={styles.TextField} label="Rekor ID" variant="outlined" color='grey' disabled={disable} InputLabelProps={{sx: { marginTop: '0px' }}} />
                <TextField className={styles.TextField3} label="User Type" variant="outlined" color='grey' disabled={disable} InputLabelProps={{sx: { marginTop: '0px' }}}/>
               
            </div> */}
                <div className={styles.div1}>
                    <TextField value={currentUser?.firstname} className={styles.TextField} label="First Name" variant="outlined" type="text" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.middlename} className={styles.TextField} label="Middle Name(optional)" variant="outlined" type="text" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.lastname} className={styles.TextField} label="Last Name" variant="outlined" type="text" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div1}>
                    {/* {console.table(currentUser)} */}
                    <TextField value={currentUser?.userid} className={styles.TextField} label="Employee ID" variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser.roles[0]} className={styles.TextField} label="Role" variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser.dob} className={styles.TextField} label="D.O.B." variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div1}>
                    <TextField value={currentUser?.admisiondate} className={styles.TextField} label="Date Of Joining" variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.email} className={styles.TextField} label="Email" variant="outlined" type="email" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.qualification ?? "Ba"} className={styles.TextField} label="Qualification" variant="outlined" type="text" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div1}>
                    <TextField value={currentUser?.fathername} className={styles.TextField} label="Father Name" variant="outlined" type="text" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.mothername} className={styles.TextField} label="Mother Name" variant="outlined" type="text" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.guardianname} className={styles.TextField} label="Guardian Name(optional)" variant="outlined" type="text" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div2}>
                    <TextField value={currentUser?.adress1} className={styles.TextField2} label="Address Line 1" variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div2}>
                    <TextField value={currentUser?.adress2} className={styles.TextField2} label="Address Line 2" variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                </div>
                <div className={styles.div1}>
                    <TextField value={currentUser?.father_contact} className={styles.TextField} label="Home Contact No." variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
                    <TextField value={currentUser?.mother_contact} className={styles.TextField} label="Mother Contact No." variant="outlined" disabled={disable} sx={option} InputLabelProps={{ sx: { marginTop: '0px', color: "c4c4c4" } }} />
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
