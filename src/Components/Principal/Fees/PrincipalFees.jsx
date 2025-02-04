import React, { useEffect, useRef, useState } from "react";
import AcademicFees from "./Academic/AcademicFees";
import PendingFees from "./Pending/PendingFees";
import "./PrincipalFees.css";
import styless from "../../Student/Fee/StudentFee.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Fee } from "../../../slices/fee";
import { getDropdownClasses } from "../../../slices/principal";
import { getAcademicYears } from "../../../slices/school";
import AcademicFeesService from "../../../services/academicfees.service";
import TransportFeesService from "../../../services/transportfee.service";
import ExtracurricularFeesService from "../../../services/extracurricularfee.service";

function PrincipalFees() {
  const { user } =
    useSelector((state) => state.user) ??
    JSON.parse(localStorage.getItem("data"));
  const { classes } = useSelector((state) => state.principal);
  const academicYears = useSelector((state) => state.school.academicYears);

  const dispatch = useDispatch();
  const [feesData, setFeesData] = useState([]);
  const [tabType, setTabType] = useState("Academic");
  const [class_code, setClass_code] = useState("");
  const [academicYear, setAcademicYear] = useState("");

  const [pendingData, setPendingData] = useState([]);

  useEffect(() => {
    dispatch(getDropdownClasses({ school_id: user?.school_id }));
    dispatch(getAcademicYears({ code: user?.school_id }));
  }, []);

  /**
   * get all data  - by schl code
   */
  useEffect(() => {
    handleApplyFilter();
  }, [tabType, dispatch]);

  //handel drop down
  const handleApplyFilter = async () => {
    if (!class_code && !academicYear) {
      return;
    }
    if (tabType === "Academic") {
      const allFee = await AcademicFeesService.getAllFees({
        school_code: user?.school_id,
        class_code: class_code,
        year: academicYear,
      });
      setFeesData(allFee);
      const pendingFee = await AcademicFeesService.getPendingFees({
        school_code: user?.school_id,
        class_code: class_code,
        year: academicYear,
      });
      setPendingData(pendingFee);
    } else if (tabType === "Transport") {
      const allFee = await TransportFeesService.getAllFees({
        school_code: user?.school_id,
        class_code: class_code,
        year: academicYear,
      });
      setFeesData(allFee);
      const pendingFee = await TransportFeesService.getPendingFees({
        school_code: user?.school_id,
        class_code: class_code,
        year: academicYear,
      });
      setPendingData(pendingFee);
    } else {
      const allFee = await ExtracurricularFeesService.getAllFees({
        school_code: user?.school_id,
        class_code: class_code,
        year: academicYear,
      });
      setFeesData(allFee);
      const pendingFee = await ExtracurricularFeesService.getPendingFees({
        school_code: user?.school_id,
        class_code: class_code,
        year: academicYear,
      });
      setPendingData(pendingFee);
    }
  };

  //handeltabs
  const Handeltabs = (e) => {
    setTabType(String(e.target.name));
  };

  const resetFilter = () => {
    setClass_code("");
    setAcademicYear("");
  };

  return (
    <div className="prncplfees">
      <p className="para">
        Home &gt;
        <b>
          {" "}
          <u>Fees</u>
        </b>
      </p>
      <br />
      {/*operation*/}
      <div style={{ display: "flex", alignItems: "center" }}>
        <p className="prncphead ">Filters:-</p>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <select
          className="prncselect"
          onChange={(e) => {
            setClass_code(e.target.value);
          }}
          value={class_code}
        >
          <option value="">Class</option>
          {classes?.map((cl, i) => (
            <option key={i} value={cl}>
              {cl}
            </option>
          ))}
        </select>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <select
          className="prncselect"
          onChange={(e) => {
            setAcademicYear(e.target.value);
          }}
          value={academicYear}
        >
          <option value="">Academic Year</option>
          {academicYears?.map((year, i) => (
            <option key={i} value={year}>
              {year}
            </option>
          ))}
        </select>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <div>
          <button
            className="applybtnprncpl"
            onClick={() => {
              handleApplyFilter();
            }}
          >
            Apply
          </button>
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <a
          href={() => {
            return false;
          }}
          onClick={resetFilter}
          className={"anchor"}
        >
          Clear Filters
        </a>
      </div>
      {/*tabs*/}

      <div className="feeDiv1">
        <div className={styless.feeDiv2}>
          <button
            autoFocus
            className={tabType === "Academic" ? "feebtnfocus" : "feebtn"}
            onClick={Handeltabs}
            name="Academic"
          >
            Academic
          </button>
          <button
            className={tabType === "Transport" ? "feebtnfocus" : "feebtn"}
            onClick={Handeltabs}
            name="Transport"
          >
            Transport/Hostel
          </button>
          <button
            className={tabType === "Extra" ? "feebtnfocus" : "feebtn"}
            onClick={Handeltabs}
            name="Extra"
          >
            Extracurricular
          </button>
        </div>
      </div>

      {/*data*/}
      <div>
        <AcademicFees typeName={tabType} data={feesData} />
        <PendingFees data={pendingData} />
      </div>
    </div>
  );
}

export default PrincipalFees;
