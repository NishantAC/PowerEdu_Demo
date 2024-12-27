import React, { useEffect, useState } from "react";
// import "./TabProfile.css";
import TextField from "@mui/material/TextField";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import styles from "./TabProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import SubjectTeacherService from "../../../../services/subjectteacher.service";
import authService from "../../../../services/auth.service";
import { fetchTeachersProfile } from "../../../../slices/principal";
import { getCurrentTeacherData } from "../../../../slices/subjectteacher";

const option = {
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000000",
    fontWeight: 600,
  },
};

function TabProfile({ currentteacher }) {
  const [disable, setDisable] = React.useState(true);
  const handleEdit = () => {
    dispatch(getCurrentTeacherData({ userId: currentteacher.user_id }))

    setDisable(!disable)
  };
  const handleSave = () => setDisable(true);
  const [classes, setClasses] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getClasses = async () => {
      try {
        const res = await SubjectTeacherService.getClassIds(currentteacher?.user_id);
        console.log(res);
        setClasses(Object.keys(res.subjects));
      } catch (error) {
        console.log(error);
      }
    };
    getClasses();
  }, [currentteacher]);
  // const image = useSelector((state) => state.image);
  const [userData, setUserData] = useState(currentteacher);

  useEffect(() => {
    setUserData(currentteacher);
  }, [currentteacher]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(userData)

  const handleUpdate = async () => {
    try {
      if (currentteacher != userData) {
        const response = await authService.updateUser(currentteacher.user_id, userData);
        if (response?.message) {
          toast(response?.message);
        }
        if (response?.error) {
          toast(response?.error);
        }
        handleEdit();
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.details}>
      <div className={styles.div1}>
        <TextField
          value={userData?.firstname}
          className={styles.TextField}
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
          value={userData?.middlename}
          className={styles.TextField}
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
          value={userData?.lastname}
          className={styles.TextField}
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
      <div className={styles.div1}>
        {console.table(userData)}
        <TextField
          value={classes ?? "none"}
          className={styles.TextField}
          label="Class"
          variant="outlined"
          disabled
          sx={option}
          InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
        />
        <TextField
          value={userData?.dob}
          className={styles.TextField}
          label="D.O.B."
          variant="outlined"
          disabled={disable}
          sx={option}
          InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
          name="dob"
          onChange={handleInputChange}
        />
        <TextField
          value={userData?.user_id}
          className={styles.TextField}
          label="Teacher ID"
          variant="outlined"
          disabled
          sx={option}
          InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
          name="user_id"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.div1}>
        <TextField
          value={userData?.doj}
          className={styles.TextField}
          label="Date Of Joining"
          variant="outlined"
          disabled={disable}
          sx={option}
          InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
          name="doj"
          onChange={handleInputChange}
        />
        <TextField
          value={userData?.email}
          className={styles.TextField}
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
          value={userData?.qualification ?? "Ba"}
          className={styles.TextField}
          label="Qualification"
          variant="outlined"
          type="text"
          sx={option}
          disabled={disable}
          InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
          name="qualification"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.div1}>
        <TextField
          value={userData?.fathername}
          className={styles.TextField}
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
          value={userData?.mothername}
          className={styles.TextField}
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
          value={userData?.guardianname}
          className={styles.TextField}
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
      <div className={styles.div2}>
        <TextField
          value={userData?.address1}
          className={styles.TextField2}
          label="Address Line 1"
          variant="outlined"
          disabled={disable}
          sx={option}
          InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
          name="address1"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.div2}>
        <TextField
          value={userData?.address2}
          className={styles.TextField2}
          label="Address Line 2"
          variant="outlined"
          disabled={disable}
          sx={option}
          InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
          name="address2"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.div1}>
        <TextField
          value={userData?.fathercontact}
          className={styles.TextField}
          label="Home Contact No."
          variant="outlined"
          disabled={disable}
          sx={option}
          InputLabelProps={{ sx: { marginTop: "0px", color: "c4c4c4" } }}
          name="fathercontact"
          onChange={handleInputChange}
        />
        <TextField
          value={userData?.mothercontact}
          className={styles.TextField}
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

export default TabProfile;
