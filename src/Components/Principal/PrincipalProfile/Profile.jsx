import React, { useContext } from "react";
import styles from './Profile.module.css';
import ProfileDetails from './ProfileDetails';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { Link } from 'react-router-dom'

export default function PrincipalProfile() {

  return (
    <div>
      <div className={styles.div1}>
        <p className={styles.prodiv}>
          Home{" "}&gt;
          <b>
            {" "}
            <u>Profile</u>
          </b>
        </p>
        <Link className={styles.link} to="/principal/home" >
          <button className={styles.backbtn}><KeyboardBackspaceOutlinedIcon className={styles.backIcon} />Back</button></Link>
      </div>
      <div className={styles.backcol}>
        <ProfileDetails />
      </div>
    </div>
  );
}
