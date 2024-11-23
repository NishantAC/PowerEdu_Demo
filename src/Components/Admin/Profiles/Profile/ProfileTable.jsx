import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// const { allStudents, total } = useSelector((state) => state.student);

function ProfileTable({
  profileType,
  allUsers,
  page,
  limit,
  total,
  onPageChange,
  

}) {
  // Console logging for debugging purpose
  console.log("Profile Type:", profileType, "All Users:", allUsers);

  console.log(allUsers,profileType,allUsers[profileType],"sjgfsagdhgasdgksagdsakgdksagd"); // Check if users data is populated

  // Function to get the correct name for the "Class" or "Department" column based on the profile type
  const getClassOrDepartment = (profile) => {
    if (profileType === "students" || profileType === "teachers") {
      return profile.class; // Assuming 'class' is the correct key for both students and teachers
    } else {
      return profile.department; // Assuming 'department' is the correct key for other staff
    }
  };

  // Function to get the correct ID for the "Admission No." or "Employee Id" column based on the profile type
  const getAdmissionOrEmployeeId = (profile) => {
    if (profileType === "students") {
      return profile.admissionno; // Assuming 'admissionno' is the key for students
    } else {
      return profile.employeeid; // Assuming 'employeeid' is the key for other staff
    }
  };

  return (
    <div>
      <TableContainer component={Paper} style={{ maxHeight: "400px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                position: "sticky",
                top: "-5px",
                background: "white",
                border: "2px solid #A4A4A4",
                boxSizing: "border-box",
                borderRadius: "5px",
              }}
            >
               <TableCell
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#545454",
                }}
              >
                Rekor Id
              </TableCell>
              <TableCell
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#545454",
                }}
              >
                {profileType === "students" ? "Roll no." : "S No."}
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#545454",
                }}
              >
                {profileType === "students" ? "Student" : "Employee"} Name
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#545454",
                }}
              >
                {profileType === "students" || profileType === "teachers"
                  ? "Class"
                  : "Department"}
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#545454",
                }}
              >
                {profileType === "students" ? "Admission No." : "Employee Id"}
              </TableCell>
              {/* <TableCell
                align="left"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#545454",
                }}
              >
                D.O.B
              </TableCell> */}
              <TableCell
                align="left"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#545454",
                }}
              >
                Contact No.
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#545454",
                }}
              >
                Email
              </TableCell>
              <TableCell
                align="left"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#545454",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            style={{
              background: "#FFFFFF",
              border: "1px solid #A5A5A5",
              boxSizing: "border-box",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "5px",
            }}
          >
            
            {allUsers[profileType]?.map((profile, index) => (
              <TableRow
                key={profile.user_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={{ paddingLeft: "10px" }}
              >
                 <TableCell
                  style={{
                    fontFamily: "Lato",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#000000",
                    textAlign: "left",
                  }}
                >
                  {profile.rekorid}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Lato",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#000000",
                    textAlign: "left",
                  }}
                >
                  {profileType === "students" ? profile.rollno : index + 1}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontFamily: "Lato",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#000000",
                  }}
                >
                  {profile.name}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontFamily: "Lato",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#000000",
                  }}
                >
                  {getClassOrDepartment(profile)}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontFamily: "Lato",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#000000",
                  }}
                >
                  {getAdmissionOrEmployeeId(profile)}
                </TableCell>
                {/* <TableCell
                  align="left"
                  style={{
                    fontFamily: "Lato",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#000000",
                  }}
                >
                  {profile.dob}
                </TableCell> */}
                <TableCell
                  align="left"
                  style={{
                    fontFamily: "Lato",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#000000",
                  }}
                >
                  {profile.contact}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontFamily: "Lato",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#000000",
                  }}
                >
                  {profile.email}
                </TableCell>
                <TableCell align="left">
                  <Link
                    to={{
                      pathname: "/admin/edit-profile",
                      userId: profile.user_id,
                      userType: profileType,
                    }}
                  >
                    <button
                      className="editProfileBtn"
                      type="submit"
                      style={{
                        fontFamily: "Rubik",
                        fontSize: "18px",
                        fontWeight: "500",
                        color: "white",
                        backgroundColor: "#9F8FFF",
                        width: "133px",
                        height: "42px",
                        display: "grid",
                        placeContent: "center",
                        border: "none",
                        outline: "none",
                      }}
                    >
                      Edit Profile
                    </button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} alignItems="center" marginTop={2}>
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={onPageChange}
          color="primary"
        />
      </Stack>
      <div style={{ textAlign: "center", marginTop: "10px", fontFamily: "Poppins", fontSize: "16px", color: "#545454", fontWeight:"bold"}}>
        {`You are on page ${page}`}
      </div>
    </div>
  );
}

export default ProfileTable;
