import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WestIcon from "@mui/icons-material/West";
import SelectBox from "./SelectBox";
import { Link, useLocation } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import "./EditProfile1.css";
import InputParent from "./InputParent";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";
import DeleteConfirmedModal from "./Modal/DeleteConfirmedModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentDetails,
  updateStudentDetails,
} from "../../../../slices/student";
import {
  fetchOtherManagementMemebrDetails,
  fetchTeacherDetails,
  updateOtherManagementMemebrDetails,
  updateTeacherDetails,
} from "../../../../slices/admin";
import { Box, Tab, Tabs } from "@mui/material";





function EditProfile1({userId, userType}) {
  console.log(userId,userType,"propsssssssssssssss")
  const location = useLocation();
  // const { userId, userType } = location;
  const { student, loading } = useSelector((state) => state.student);
  const { teacher, otherManagementMember } = useSelector(
    (state) => state.admin
  );

  


  const dispatch = useDispatch();
  useEffect(() => {
    if (userType === "students") {
      dispatch(
        fetchStudentDetails({
          user_id: userId,
        })
      );
    } else {
      dispatch(
        fetchTeacherDetails({
          user_id: userId,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (userType === "students") {
      dispatch(
        fetchStudentDetails({
          user_id: userId,
        })
      );
    } else if (userType === "teachers") {
      dispatch(
        fetchTeacherDetails({
          user_id: userId,
        })
      );
    } else {
      dispatch(
        fetchOtherManagementMemebrDetails({
          user_id: userId,
        })
      );
    }
  }, [userId]);

  const user =
    userType === "students" &&
    !(Object.keys(student).length === 0 && student.constructor === Object)
      ? student
      : userType === "teachers" &&
        !(Object.keys(teacher).length === 0 && teacher.constructor === Object)
      ? teacher
      : !(
          Object.keys(otherManagementMember).length === 0 &&
          otherManagementMember.constructor === Object
        )
      ? otherManagementMember
      : "";

  const [formValues, setFormValues] = useState(user);
  console.log(formValues,"FORMAVLAALALALLA")

  useEffect(() => {
    setFormValues(user);
  }, [user]);

  // useEffect(() => {
  //   console.log("formvalues:", formValues);
  // }, [formValues]);

  const [subject, setSubject] = useState(formValues.subject);
  useEffect(() => {
    setFormValues({
      ...formValues,
      subject: subject,
    });
  }, [subject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (e.target.type === "date") {
      newValue = value ? value.split("-").reverse().join("-") : null;
    } else if (
      name == "admissionno" ||
      name == "fatherContact" ||
      name == "motherContact" ||
      name == "guardianContact"
    ) {
      newValue = parseInt(value);
    }
    setFormValues({
      ...formValues,
      [name]: newValue,
    });
    // console.log(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    if (userType === "students") {
      dispatch(updateStudentDetails(formValues));
    } else if (userType === "students") {
      dispatch(updateTeacherDetails(formValues));
    } else {
      dispatch(updateOtherManagementMemebrDetails(formValues));
    }
  };

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  // useEffect(() => {
  //   console.log("loading", loading);
  // }, [loading]);

  return (
    <div
      className="containerBox"
      style={{
        position: "absolute",
        height: "calc(100vh - 100px)",
        zIndex: "10",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        overflow: `${showDeleteConfirmationModal ? "hidden" : "scroll"}`,
      }}
    >
       
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "20px",
        }}
      >
        {/* left area */}
        <div
          style={{ color: "#4D4D4D", display: "flex", alignItems: "center" }}
        >
          <div
            style={{
              fontFamily: "Roboto",
              fontSize: "18px",
              fontWeight: "400",
            }}
          >
            Home
          </div>
          <KeyboardArrowRightIcon />
          <div
            style={{
              fontFamily: "Roboto",
              fontSize: "18px",
              fontWeight: "700",
              textDecoration: "underline",
            }}
          >
            {userType === "students"
              ? "Student"
              : userType === "teachers"
              ? "Teacher"
              : userType === "principal"
              ? "Principal"
              : userType === "accountant"
              ? "Accountant"
              : userType === "staff"
              ? "Staff"
              : ""}{" "}
            Profile
          </div>
        </div>

        {/* right area */}
        {/* <Link to="./students-profile" style={{ textDecoration: "none" }}> */}
          <Link to={`/${userType}-profile`} style={{ textDecoration: "none" }}>

          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <WestIcon style={{ color: "#5F5F5F" }} />
            <div
              style={{
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "24px",
                letterSpacing: "4%",
                color: "#414141",
              }}
            >
              Back
            </div>
          </div>
        </Link>
      </nav>
      <div className="contentBox">
        {/* Left Side */}
        {/* <div className="leftContainer">
          <h1>
            {userType === "students"
              ? "Student"
              : userType === "teachers"
              ? "Teacher"
              : userType === "principal"
              ? "Principal"
              : userType === "accountant"
              ? "Accountant"
              : userType === "staff"
              ? "Staff"
              : ""}{" "}
            Profile
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
            }}
          >
            {formValues.imageUrl ? (
              <div
                style={{
                  height: "132px",
                  width: "132px",
                  borderRadius: "50%",
                  backgroundImage: `url(${formValues.imageUrl})`,
                  backgroundSize: "cover",
                }}
              ></div>
            ) : (
              <div
                style={{
                  height: "132px",
                  width: "132px",
                  borderRadius: "50%",
                  backgroundColor: "#F5F5F5",
                  display: "grid",
                  placeContent: "center",
                  fontFamily: "Rubik",
                  fontWeight: "500",
                  fontSize: "48px",
                  color: "#959595",
                }}
              >
                A
              </div>
            )}

            <button
              className="adminEditBtn"
              onClick={() => setShowDeleteConfirmationModal(true)}
              style={{
                width: "200px",
                height: "45px",
                borderRadius: "5px",
                backgroundColor: "#D10707",
                fontFamily: "Rubik",
                fontSize: "16px",
                fontWeight: "400",
                color: "white",
                display: "grid",
                placeContent: "center",
                border: "none",
                outline: "none",
                userSelect: "none",
              }}
            >
              Request Delete Account
            </button>
          </div>
        </div> */}

        {/* Right Side */}
        <div
          className="rightContainer"
          style={{
            height: "100%",
            padding: "20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "relative",
            paddingBottom: "70px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <>
              {/* Right Side */}
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* first row */}
                <div className="firstRow">
                  {/* User option Box */}
                  <div className="userType">
                    <InputParent text="User Type">
                      {/* <input
                        name="userType"
                        value={userType}
                        className="inputBox"
                      /> */}
                      {/* <div className="inputBox">{userType}</div> */}
                      <div
                        className="inputBox"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "160px",
                        }}
                      >
                        {formValues.userType &&
                          formValues.userType.charAt(0).toUpperCase() +
                            formValues.userType.slice(1)}
                      </div>
                    </InputParent>
                  </div>

                  <div className="rekorId">
                    <InputParent text="Rekor Id">
                      <input
                        name="user_id"
                        value={formValues.user_id}
                        onChange={handleChange}
                        className="inputBox"
                      />
                    </InputParent>
                  </div>
                </div>

                {/* second row */}
                <div className="secondRow">
                  <div className="admissionNo">
                    {userType === "students" ? (
                      <InputParent text="Admission No">
                        <input
                          name="admissionno"
                          value={formValues.admissionno}
                          onChange={handleChange}
                          className="inputBox"
                        />
                      </InputParent>
                    ) : (
                      <InputParent text="Employee Id">
                        <input
                          name="admissionno"
                          value={formValues.admissionno}
                          onChange={handleChange}
                          className="inputBox"
                        />
                      </InputParent>
                    )}
                  </div>
                  <div className="firstName">
                    <InputParent text="First Name">
                      <input
                        name="firstname"
                        value={formValues.firstname}
                        onChange={handleChange}
                        className="inputBox"
                      />
                    </InputParent>
                  </div>
                  <div className="middleName">
                    <InputParent text="Middle Name">
                      <input
                        name="middlename"
                        value={formValues.middlename}
                        onChange={handleChange}
                        className="inputBox"
                      />
                    </InputParent>
                  </div>
                  <div className="lastName">
                    <InputParent text="Last Name">
                      <input
                        name="lastname"
                        value={formValues.lastname}
                        onChange={handleChange}
                        className="inputBox"
                      />
                    </InputParent>
                  </div>
                  {(userType === "students" || userType === "teachers") && (
                    <div className="gender">
                      <SelectBox
                        text="Gender"
                        options={["Male", "Female", "Others"]}
                        placeHolder=""
                        info={formValues.gender}
                        setInfo={(selectedGender) =>
                          setFormValues({
                            ...formValues,
                            gender: selectedGender,
                          })
                        }
                      />
                    </div>
                  )}
                </div>

                {/* third row */}
                <div className="thirdRow">
                  {userType === "students" ? (
                    <>
                      <div className="studentClass">
                        <InputParent text="Class">
                          <input
                            name="class"
                            value={formValues.class}
                            className="inputBox"
                          />
                        </InputParent>
                      </div>
                      <div className="studentRollNo">
                        <InputParent text="Roll No">
                          <input
                            name="rollno"
                            value={formValues.rollno}
                            className="inputBox"
                          />
                        </InputParent>
                      </div>
                      <div className="studentAdmissionDate">
                        <InputParent text="Admission Date">
                          <input
                            type="date"
                            name="admissionDate"
                            value={
                              formValues && formValues.admissionDate
                                ? new Date(
                                    formValues.admissionDate
                                      .split("-")
                                      .reverse()
                                      .join("-")
                                  )
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                            }
                            onChange={handleChange}
                            className="inputBox"
                          />
                        </InputParent>
                      </div>
                      <div className="studentEmail">
                        <InputParent text="Email">
                          <input
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            className="inputBox"
                          />
                        </InputParent>
                      </div>
                    </>
                  ) : userType === "teachers" ? (
                    <>
                      <div className="teacherRole">
                        <SelectBox
                          text="Role"
                          options={["Teacher", "Class Teacher"]}
                          placeHolder=""
                          info={formValues.role}
                          setInfo={(selectedRole) =>
                            setFormValues({ ...formValues, role: selectedRole })
                          }
                        />
                      </div>

                      <div className="teacherClass">
                        <InputParent text="Class">
                          <input
                            name="class"
                            value={formValues.class}
                            onChange={handleChange}
                            className="inputBox"
                          />
                        </InputParent>
                      </div>
                      <div className="teacherSubject">
                        <SelectBox
                          text="Subject"
                          options={[
                            "Science",
                            "English",
                            "Hindi",
                            "Mathematics",
                          ]}
                          placeHolder=""
                          info={formValues.subject}
                          setInfo={(selectedSubject) =>
                            setFormValues({
                              ...formValues,
                              subject: selectedSubject,
                            })
                          }
                        />
                      </div>
                      <div className="teacherAdmissionDate">
                        <InputParent text="Admission Date">
                          <input
                            type="date"
                            name="admissionDate"
                            // value={
                            //   formValues && formValues.admissionDate
                            //     ? new Date(
                            //         formValues.admissionDate
                            //           .split("-")
                            //           .reverse()
                            //           .join("-")
                            //       )
                            //         .toISOString()
                            //         .split("T")[0]
                            //     : ""
                            // }
                            // onChange={handleChange}
                            className="inputBox"
                          />
                        </InputParent>
                      </div>
                      <div className="teacherEmail">
                        <InputParent text="Email">
                          <input
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            className="inputBox"
                          />
                        </InputParent>
                      </div>
                    </>
                  ) : (
                    <>
                      {userType === "staff" && (
                        <div className="staffRole">
                          <SelectBox
                            text="Role"
                            options={["Driver", "Janitor"]}
                            placeHolder=""
                            info={formValues.role}
                            setInfo={(selectedRole) =>
                              setFormValues({
                                ...formValues,
                                role: selectedRole,
                              })
                            }
                          />
                        </div>
                      )}

                      <div className="staffAdmissionDate">
                        <InputParent text="Admission Date">
                          <input
                            type="date"
                            name="admissionDate"
                            value={
                              formValues &&
                              formValues.admissionDate &&
                              new Date(
                                formValues.admissionDate
                                  .split("-")
                                  .reverse()
                                  .join("-")
                              )
                                .toISOString()
                                .split("T")[0]
                            }
                            onChange={handleChange}
                            className="inputBox"
                          />
                        </InputParent>
                      </div>
                      <div className="staffEmail">
                        <InputParent text="Email">
                          <input
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            className="inputBox"
                          />
                        </InputParent>
                      </div>
                      <div className="gender">
                        <SelectBox
                          text="Gender"
                          options={["Male", "Female", "Others"]}
                          placeHolder=""
                          info={formValues.gender}
                          setInfo={(selectedGender) =>
                            setFormValues({
                              ...formValues,
                              gender: selectedGender,
                            })
                          }
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* fourth row */}
                <div className="fourthRow">
                  <div className="dob">
                    <InputParent text="D.O.B">
                      <input
                        type="date"
                        name="dob"
                        value={
                          formValues && formValues.dob
                          // new Date(
                          //   formValues.dob
                          //     // ?.split("-")
                          //     // ?.reverse()
                          //     // ?.join("-")
                          // )
                          //   ?.toISOString()
                          //   ?.split("T")[0]
                        }
                        onChange={handleChange}
                        className="inputBox"
                      />
                    </InputParent>
                  </div>

                  {userType === "students" ? (
                    <>
                      <div className="fatherName">
                        <InputParent text="Father Name">
                          <input
                            name="fathername"
                            value={formValues.fathername}
                            onChange={handleChange}
                            className="inputBox"
                          />
                        </InputParent>
                      </div>
                      <div className="motherName">
                        <InputParent text="mother Name">
                          <input
                            name="mothername"
                            value={formValues.mothername}
                            onChange={handleChange}
                            className="inputBox"
                          />
                        </InputParent>
                      </div>
                      <div className="guardianName">
                        <InputParent text="Guardian Name (optional)">
                          <input
                            name="guardianname"
                            value={formValues.guardianname}
                            onChange={handleChange}
                            className="inputBox"
                          />
                        </InputParent>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="primaryContactNo">
                        <InputParent text="Contact No. (primary)">
                          <input
                            name="contact"
                            type="tel"
                            pattern="[0-9]{10}"
                            title="Contact must have 10 digits number"
                            value={formValues.contact}
                            onChange={handleChange}
                            className="inputBox"
                            required
                          />
                        </InputParent>
                      </div>

                      <div className="secondaryContactNo">
                        <InputParent text="Contact No. (secondary)">
                          <input
                            name="altcontact"
                            type="tel"
                            pattern="[0-9]{10}"
                            title="Contact must have 10 digits number"
                            value={formValues.altcontact}
                            onChange={handleChange}
                            className="inputBox"
                            required
                          />
                        </InputParent>
                      </div>
                    </>
                  )}
                </div>

                {/* fifth row */}
                {userType == "student" && (
                  <div className="fifthRow">
                    <div className="fatherContactNo">
                      <InputParent text="Father Contact No.">
                        <input
                          name="fatherContact"
                          value={formValues.fatherContact}
                          onChange={handleChange}
                          className="inputBox"
                        />
                      </InputParent>
                    </div>

                    <div className="motherContactNo">
                      <InputParent text="mother Contact No.">
                        <input
                          name="motherContact"
                          value={formValues.motherContact}
                          onChange={handleChange}
                          className="inputBox"
                        />
                      </InputParent>
                    </div>
                    <div className="guardianContactNo">
                      <InputParent text="Guardian Contact No.">
                        <input
                          name="guardianContact"
                          value={formValues.guardianContact}
                          onChange={handleChange}
                          className="inputBox"
                        />
                      </InputParent>
                    </div>
                  </div>
                )}

                {/* sixth row */}
                <div className="sixthRow">
                  <InputParent text="Address Line 1">
                    <input
                      name="address1"
                      value={formValues.address1}
                      onChange={handleChange}
                      className="inputBox"
                    />
                  </InputParent>
                </div>
                {/* sevent row */}
                <div className="seventhRow">
                  <InputParent text="Address Line 2">
                    <input
                      name="address2"
                      value={formValues.address2}
                      onChange={handleChange}
                      className="inputBox"
                    />
                  </InputParent>
                </div>
              </div>
            </>

            {/* buttons */}
            <div
              style={{
                position: "absolute",
                bottom: "0px",
                right: "20px",
              }}
            >
              <div className="btnContainer">
                <Link to="/home">
                  <button
                    className="adminEditBtn"
                    style={{
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#309D1E",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      userSelect: "none",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Rubik",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      Cancel
                    </div>
                    <div>
                      <EditOutlinedIcon />
                    </div>
                  </button>
                </Link>

                <button
                  className="adminEditBtn"
                  type="submit"
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#214DF9",
                    color: "white",
                    fontFamily: "Rubik",
                    fontSize: "18px",
                    fontWeight: "500",
                    userSelect: "none",
                  }}
                >
                  Save & Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showDeleteConfirmationModal && (
        // <DeleteConfirmationModal
        //   onClick={() => setShowDeleteConfirmationModal(false)}
        // />
        <DeleteConfirmedModal />
      )}
    </div>
  );
}

export default EditProfile1;
