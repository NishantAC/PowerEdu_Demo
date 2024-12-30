import React, { useContext, useState } from "react";
import styles from "./Fees.module.css";
import "./StudentFee.css";
import { MenuContext } from "../../../context/Menu/MenuContext";
import AcademicFeeTable from "./StudentAcademicFee";
import TransportFeeTable from "./StudentTransportFee";
import { style } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";

import styless from "./StudentFee.module.css";
import AcademicFeesService from "../../../services/academicfees.service";
import TransportFeesService from "../../../services/transportfee.service";
import ExtracurricularFeesService from "../../../services/extracurricularfee.service";

export default function StudentTeacher() {
  const mycontext = useContext(MenuContext);
  const { user: currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [feesData, setFeesData] = useState([]);
  const [tabType, setTabType] = useState("Academic");

  useEffect(() => {
    handleApplyFilter();
  }, [tabType, dispatch]);

  //handel drop down
  const handleApplyFilter = async () => {
    if (tabType === "Academic") {
      
      const allFee = await AcademicFeesService.getAllFees({
        school_code: currentUser.schoolcode,
        class_code: currentUser.classname,
      });
      setFeesData(allFee);
    } else if (tabType === "Transport") {
      const allFee = await TransportFeesService.getAllFees({
        school_code: currentUser.schoolcode,
        class_code: currentUser.classname,
      });
      setFeesData(allFee);
    } else {
      const allFee = await ExtracurricularFeesService.getAllFees({
        school_code: currentUser.schoolcode,
        class_code: currentUser.classname,
      });
      setFeesData(allFee);
    }
  };

  //handeltabs
  const Handeltabs = (e) => {
    setTabType(e.target.value);
  };

  return (
    <div
      onClick={mycontext.offMenu}
      onScroll={mycontext.offMenu}
      className={styles.feesdiv}
    >
      {/*head*/}
      <p className={styless.para}>
        Home &gt;
        <b>
          {" "}
          <u>Fees</u>
        </b>
      </p>
      {/*tabs*/}
      <div className={styless.feeDiv1}>
        <div className={styless.feeDiv2}>
          <button
            autoFocus
            className={`${styless.feebtn} ${
              tabType === "Academic" ? styless.feebtnfocus : ""
            }`}
            onClick={Handeltabs}
            value="Academic"
            name="Academic"
          >
            Academic
          </button>
          <button
            className={`${styless.feebtn} ${
              tabType === "Transport" ? styless.feebtnfocus : ""
            }`}
            onClick={Handeltabs}
            value="Transport"
            name="Transport/Hostel"
          >
            Transport/Hostel
          </button>
          <button
            className={`${styless.feebtn} ${
              tabType === "Extra" ? styless.feebtnfocus : ""
            }`}
            onClick={Handeltabs}
            value="Extra"
            name="Extracurricular"
          >
            Extracurricular
          </button>
        </div>
        <br />
        <div className={styless.main}>
          <div className={styless.feelayout}>
            <p className={styless.feeheading}>{tabType}</p>
          </div>
          {/*table*/}
          <div className={styless.feeTablayout}>
            <AcademicFeeTable rows={feesData} /* setRowData={setRowData} */ />
            {/* {showStructure && (
              <FeesStructure
                open={true}
                handleClose={openOrClose}
                data={}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
