import React, { useEffect, useState } from "react";
import UserFeeDetailsTable from "./UserFeeDetailsTable";
import StudentService from "../../../services/student.service";

const UserFeeDetailsModal = ({ selectedStudentId }) => {
  const [studentDetails, setStudentDetails] = useState();
  useEffect(() => {
    StudentService.getStudentFeeDetails({ user_id: selectedStudentId })
      .then((res) => {
        setStudentDetails(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getAcademicYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (currentMonth > 6) return currentYear;
    else return currentYear - 1;
  };

  const totalAmountPending = () => {
    let total = 0;
    studentDetails?.studentAcademicFeeData.map((row, index) => {
      total += row?.fee?.amount - row?.paid_amount;
    });
    studentDetails?.studentTransportFeeData.map((row, index) => {
      total += row?.fee?.amount - row?.paid_amount;
    });
    studentDetails?.studentExtracurricularFeeData.map((row, index) => {
      total += row?.fee?.amount - row?.paid_amount;
    });
    return total;
  };

  return (
    <div style={{ width: "100%", border: "1px solid black" }}>
      <div
        style={{
          padding: "10px 20px",
          width: "100%",
          borderBottom: "1px solid black",
          color: "rgba(0,0,0,0.65)",
          fontWeight: "700",
        }}
      >
        Fees Breakup
      </div>
      <div
        style={{
          padding: "5px 20px",
          width: "100%",
          borderBottom: "1px solid black",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ fontWeight: "600", color: "rgb(84,84,84)" }}>
            Name:-
          </div>
          <div>
            {studentDetails?.studentBioData?.details?.firstname}{" "}
            {studentDetails?.studentBioData?.details?.middlename}{" "}
            {studentDetails?.studentBioData?.details?.lastname}
          </div>
        </div>

        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ fontWeight: "600", color: "rgb(84,84,84)" }}>
            Class:-
          </div>
          <div>
            {studentDetails?.studentBioData?.class_code[getAcademicYear()]}
          </div>
        </div>

        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ fontWeight: "600", color: "rgb(84,84,84)" }}>
            Admission No:-
          </div>
          <div>{studentDetails?.studentBioData?.user_id}</div>
        </div>

        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ fontWeight: "600", color: "rgb(84,84,84)" }}>
            Roll No:-
          </div>
          <div>{studentDetails?.studentBioData?.rollno[getAcademicYear()]}</div>
        </div>

        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ fontWeight: "600", color: "rgb(84,84,84)" }}>
            Father Name:-
          </div>
          <div>{studentDetails?.studentBioData?.details?.fathername}</div>
        </div>

        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ fontWeight: "600", color: "rgb(84,84,84)" }}>
            Contact No:-
          </div>
          <div>{studentDetails?.studentBioData?.details?.fatherContact}</div>
        </div>
      </div>
      <div
        style={{
          padding: "5px 20px",
          width: "100%",
          borderBottom: "1px solid black",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ fontWeight: "600", color: "rgb(84,84,84)" }}>
            Mother Name:-
          </div>
          <div>{studentDetails?.studentBioData?.details?.mothername}</div>
        </div>

        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ fontWeight: "600", color: "rgb(84,84,84)" }}>
            Contact No:-
          </div>
          <div>{studentDetails?.studentBioData?.details?.motherContact}</div>
        </div>

        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ fontWeight: "600", color: "rgb(84,84,84)" }}>
            Address:-
          </div>
          <div>
            {studentDetails?.studentBioData?.details?.address1},{" "}
            {studentDetails?.studentBioData?.details?.address2}
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "5px 20px",
          width: "100%",
          borderBottom: "1px solid black",
        }}
      >
        <div style={{ display: "flex", gap: "5px" }}>
          <div style={{ fontWeight: "600", color: "rgb(84,84,84)" }}>
            Transport Route:-
          </div>
          <div>Route 6</div>
        </div>
      </div>
      <UserFeeDetailsTable studentDetails={studentDetails} />
      <div
        style={{
          padding: "10px 20px",
          width: "100%",
          color: "rgba(0,0,0,0.65)",
          fontWeight: "700",
        }}
      >
        Total Amount To Be Paid : {totalAmountPending()}
      </div>
    </div>
  );
};

export default UserFeeDetailsModal;
