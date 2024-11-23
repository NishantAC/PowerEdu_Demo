import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WestIcon from "@mui/icons-material/West";
import SelectUserType from "./SelectUserType";
import SelectBox from "./SelectBox";
import InputParent from "./InputParent";
import "./FillUserInfo.css";
import { Link } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useSelector } from "react-redux";
import SchoolUsersService from "../../../services/schoolusers.service";
import authService from "../../../services/auth.service";
import ConfirmationModal from "./Modal/ConfirmationModal";
import classService from "../../../services/class.service";

function FillUserInfo() {
  const { user } = useSelector((state) => state.user);

  const [userType, setUserType] = useState(null);
  const [rekorId, setRekorId] = useState();

  const [rollNoPlaceholder, setRollNoPlaceholder] = useState();
  const [admissionNoPlaceholder, setAdmissionNoPlaceholder] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [classesDropdown, setClassesDropdown] = useState([]);
  console.log(classesDropdown,"classesdropdown")
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (userType && user?.schoolcode !== undefined) {
      console.log(user,userType,"consoledataprint")
      const body = {
        school_code: user?.schoolcode,
        userType: userType.toLowerCase(),
      };
      authService
        .getUniqueRekorId(body)
        .then((res) => {
          setRekorId(res.id);
        })
        .catch((error) => {
          console.log(error);
        });

      authService
        .getUniqueAdmissionNo(body)
        .then((res) => {
          setAdmissionNoPlaceholder(res.admissionNo);
        })
        .catch((error) => {
          console.log(error);
        });

      if (userType === "Student") {
        classService
          .getDropdownClasses(1)
          .then((res) => {
            setClassesDropdown(res)
            console.log(res,"dropdownclasses")
          });
      }

      if (userType === "Teacher") {
        classService
          .getAvailableClasses({ school_code: 1 })
          .then((res) => {
            console.log(res,"dropdownclasses")
            setClassesDropdown(res.data)});
      }
    }
  }, [user, userType]);

  const [formValues, setFormValues] = useState({
    schoolcode: user?.schoolcode,
    rekorId: rekorId,
    userType: null,
    imageUrl: "",
    image: null,
    admissionNo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    class: "",
    rollNo: "",
    admissionDate: "",
    email: "",
    dob: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    fatherContactNo: "",
    motherContactNo: "",
    guardianContactNo: "",
    addressLine1: "",
    addressLine2: "",
    // teachers and staff
    role: "",
    subject: "",
    primaryContactNumber: "",
    secondaryContactNumber: "",
  });

  useEffect(() => {
    setFormValues({
      ...formValues,
      rekorId: rekorId,
    });
  }, [rekorId]);

  useEffect(() => {
    if (userType && user?.schoolcode !== undefined && formValues.class != "") {
      const body = {
        school_code: user?.schoolcode,
        class_code: formValues.class,
        userType: userType.toLowerCase(),
      };

      if (userType === "Student") {
        authService
          .getUniqueRollNo(body)
          .then((res) => {
            setRollNoPlaceholder(res.rollNo);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [formValues.class, user, userType]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader(); // Create a new instance of FileReader

    reader.onloadend = () => {
      setFormValues({
        ...formValues,
        imageUrl: reader.result,
        image: file,
      });
    };

    if (file) {
      reader.readAsDataURL(file); // Start reading the file as a data URL
    }
  };

  useEffect(() => {
    setFormValues({
      ...formValues,
      userType: userType,
    });
  }, [userType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // useEffect(() => {
  //   console.log(formValues);
  // }, [formValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValues.userType) {
      alert("Please Select User Type");
    }

    if (!formValues.gender) {
      setErrorMsg("Select Gender");
    } else if (formValues.userType === "Teacher" && !formValues.role) {
      setErrorMsg("Select role");
    } else if (formValues.userType === "Teacher" && !formValues.subject) {
      setErrorMsg("Select subject");
    } else {
      const formData = new FormData();
      formData.append("file", formValues.image);
      formData.append("status", "true");
      formData.append("school_code", formValues.schoolcode);
      formData.append("user_id", formValues.rekorId);
      formData.append("admissionno", parseInt(formValues.admissionNo));
      formData.append(
        "class_code",
        userType === "Student" || userType === "Teacher"
          ? formValues.class
          : null
      );
      formData.append(
        "rollno",
        userType === "Student" ? formValues.rollNo : null
      );
      formData.append("userType", formValues.userType.toLowerCase());
      formData.append("firstname", formValues.firstName);
      formData.append("middlename", formValues.middleName);
      formData.append("lastname", formValues.lastName);
      formData.append("gender", formValues.gender);
      formData.append("admissiondate", formValues.admissionDate);
      formData.append("email", formValues.email);
      formData.append("dob", formValues.dob);
      formData.append(
        "fathername",
        userType === "Student" ? formValues.fatherName : null
      );
      formData.append(
        "mothername",
        userType === "Student" ? formValues.motherName : null
      );
      formData.append(
        "guardianname",
        userType === "Student" ? formValues.guardianName : null
      );
      formData.append(
        "fathercontactno",
        userType === "Student" ? parseInt(formValues.fatherContactNo) : null
      );
      formData.append(
        "mothercontactno",
        userType === "Student" ? parseInt(formValues.motherContactNo) : null
      );
      formData.append(
        "guardiancontactno",
        userType === "Student" ? parseInt(formValues.guardianContactNo) : null
      );
      formData.append("address1", formValues.addressLine1);
      formData.append("address2", formValues.addressLine2);
      formData.append(
        "role",
        userType === "Teacher" || userType === "Staff" ? formValues.role : null
      );
      formData.append(
        "subject",
        userType === "Teacher" ? formValues.subject : null
      );
      formData.append(
        "primarycontactnumber",
        userType === "Student"
          ? null
          : parseInt(formValues.primaryContactNumber)
      );
      formData.append(
        "secondarycontactnumber",
        userType === "Student"
          ? null
          : parseInt(formValues.secondaryContactNumber)
      );

      authService
        .register(formData)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            setUserId(res.data.userId);
            setPassword(res.data.password);
            setShowConfirmationModal(true);
          }
        })
        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data.message);
            setErrorMsg(error.response.data.message);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    }
  };

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
        overflow: "auto",
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
            New User
          </div>
        </div>

        {/* right area */}
        <Link to="/home" style={{ textDecoration: "none" }}>
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
        <div className="leftContainer">
          <h1>New User Profile</h1>
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

            <div
              style={{
                width: "132px",
                height: "36px",
                border: "1px dotted #708DFF",
                borderRadius: "8px",
                fontFamily: "Rubik",
                fontSize: "16px",
                fontWeight: "400",
                color: "#708DFF",
                position: "relative",
              }}
            >
              {/* Upload Pic */}
              <label
                htmlFor="uploadImgBtn"
                style={{
                  position: "absolute",
                  top: "-16px",
                  height: "100%",
                  width: "100%",
                  cursor: "pointer",
                  display: "grid",
                  placeContent: "center",
                  color: "#708DFF",
                }}
              >
                Upload Pic
              </label>

              <input
                id="uploadImgBtn"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>

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
                    <SelectBox
                      text="User Type"
                      options={[
                        "Student",
                        "Teacher",
                        "Principal",
                        "Accountant",
                        "Staff",
                      ]}
                      placeHolder="Please select user type"
                      // info={formValues.userType}
                      // setInfo={(selectedUserType) =>
                      //   setFormValues({
                      //     ...formValues,
                      //     userType: selectedUserType,
                      //   })
                      // }
                      info={userType}
                      setInfo={setUserType}
                    />
                  </div>

                  {/* Rekor Id */}
                  {userType && (
                    <div className="rekorId">
                      <InputParent text="Rekor Id">
                        <div
                          className="inputBox"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "160px",
                          }}
                        >
                          {formValues.rekorId}
                        </div>
                      </InputParent>
                    </div>
                  )}
                </div>

                {userType && (
                  <>
                    {/* second row */}
                    <div className="secondRow">
                      <div className="admissionNo">
                        {formValues.userType === "Student" ? (
                          <InputParent text="Admission No">
                            <input
                              name="admissionNo"
                              value={formValues.admissionNo}
                              onChange={handleChange}
                              placeholder={admissionNoPlaceholder}
                              className="inputBox"
                              required
                            />
                          </InputParent>
                        ) : (
                          <InputParent text="Employee Id">
                            <input
                              name="admissionNo"
                              value={formValues.admissionNo}
                              onChange={handleChange}
                              placeholder={admissionNoPlaceholder}
                              className="inputBox"
                              required
                            />
                          </InputParent>
                        )}
                      </div>
                      <div className="firstName">
                        <InputParent text="First Name">
                          <input
                            name="firstName"
                            value={formValues.firstName}
                            onChange={handleChange}
                            className="inputBox"
                            required
                          />
                        </InputParent>
                      </div>
                      <div className="middleName">
                        <InputParent text="Middle Name (optional)">
                          <input
                            name="middleName"
                            value={formValues.middleName}
                            onChange={handleChange}
                            className="inputBox"
                          />
                        </InputParent>
                      </div>
                      <div className="lastName">
                        <InputParent text="Last Name">
                          <input
                            name="lastName"
                            value={formValues.lastName}
                            onChange={handleChange}
                            className="inputBox"
                            required
                          />
                        </InputParent>
                      </div>
                      {(userType === "Student" || userType === "Teacher") && (
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
                      {formValues.userType === "Student" ? (
                        <>
                          <div className="studentClass">
                            <SelectBox
                              text="Class"
                              options={classesDropdown}
                              placeHolder=""
                              info={formValues.class}
                              setInfo={(selectedClass) =>
                                setFormValues({
                                  ...formValues,
                                  class: selectedClass,
                                })
                              }
                            />
                          </div>
                          <div className="studentRollNo">
                            <InputParent text="Roll No">
                              <input
                                name="rollNo"
                                value={formValues.rollNo}
                                onChange={handleChange}
                                placeholder={rollNoPlaceholder}
                                className="inputBox"
                                required
                              />
                            </InputParent>
                          </div>
                          <div className="studentAdmissionDate">
                            <InputParent text="Admission Date">
                              <input
                                type="date"
                                name="admissionDate"
                                value={formValues.admissionDate}
                                onChange={handleChange}
                                className="inputBox"
                                required
                              />
                            </InputParent>
                          </div>
                          <div className="studentEmail">
                            <InputParent text="Email">
                              <input
                                name="email"
                                type="email"
                                value={formValues.email}
                                onChange={handleChange}
                                className="inputBox"
                                required
                              />
                            </InputParent>
                          </div>
                        </>
                      ) : formValues.userType === "Teacher" ? (
                        <>
                          <div className="teacherRole">
                            <SelectBox
                              text="Role"
                              options={["Teacher", "Class Teacher"]}
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

                          {formValues.role === "Class Teacher" && (
                            <div className="teacherClass">
                              <SelectBox
                                text="Class"
                                options={classesDropdown}
                                placeHolder=""
                                info={formValues.class}
                                setInfo={(selectedClass) =>
                                  setFormValues({
                                    ...formValues,
                                    class: selectedClass,
                                  })
                                }
                              />
                            </div>
                          )}

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
                                value={formValues.admissionDate}
                                onChange={handleChange}
                                className="inputBox"
                                required
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
                                required
                              />
                            </InputParent>
                          </div>
                        </>
                      ) : (
                        <>
                          {userType === "Staff" && (
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
                                value={formValues.admissionDate}
                                onChange={handleChange}
                                className="inputBox"
                                required
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
                                required
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
                            value={formValues.dob}
                            onChange={handleChange}
                            className="inputBox"
                            required
                          />
                        </InputParent>
                      </div>

                      {userType === "Student" ? (
                        <>
                          <div className="fatherName">
                            <InputParent text="Father Name">
                              <input
                                name="fatherName"
                                value={formValues.fatherName}
                                onChange={handleChange}
                                className="inputBox"
                                required
                              />
                            </InputParent>
                          </div>
                          <div className="motherName">
                            <InputParent text="mother Name">
                              <input
                                name="motherName"
                                value={formValues.motherName}
                                onChange={handleChange}
                                className="inputBox"
                                required
                              />
                            </InputParent>
                          </div>
                          <div className="guardianName">
                            <InputParent text="Guardian Name (optional)">
                              <input
                                name="guardianName"
                                value={formValues.guardianName}
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
                                name="primaryContactNumber"
                                type="tel"
                                pattern="[0-9]{10}"
                                title="Contact must have 10 digits number"
                                value={formValues.primaryContactNumber}
                                onChange={handleChange}
                                className="inputBox"
                                required
                              />
                            </InputParent>
                          </div>

                          <div className="secondaryContactNumber">
                            <InputParent text="Contact No. (secondary)">
                              <input
                                name="secondaryContactNumber"
                                type="tel"
                                pattern="[0-9]{10}"
                                title="Contact must have 10 digits number"
                                value={formValues.secondaryContactNumber}
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
                    {userType === "Student" && (
                      <div className="fifthRow">
                        <div className="fatherContactNo">
                          <InputParent text="Father Contact No.">
                            <input
                              name="fatherContactNo"
                              type="tel"
                              pattern="[0-9]{10}"
                              title="Contact must have 10 digits number"
                              value={formValues.fatherContactNo}
                              onChange={handleChange}
                              className="inputBox"
                              required
                            />
                          </InputParent>
                        </div>
                        <div className="motherContactNo">
                          <InputParent text="Mother Contact No.">
                            <input
                              name="motherContactNo"
                              type="tel"
                              pattern="[0-9]{10}"
                              title="Contact must have 10 digits number"
                              value={formValues.motherContactNo}
                              onChange={handleChange}
                              className="inputBox"
                              required
                            />
                          </InputParent>
                        </div>
                        <div className="guardianContactNo">
                          <InputParent text="Guardian Contact No.(optional) ">
                            <input
                              name="guardianContactNo"
                              type="tel"
                              pattern="[0-9]{10}"
                              title="Contact must have 10 digits number"
                              value={formValues.guardianContactNo}
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
                          name="addressLine1"
                          value={formValues.addressLine1}
                          onChange={handleChange}
                          className="inputBox"
                          required="true"
                        />
                      </InputParent>
                    </div>

                    {/* sevent row */}
                    <div className="seventhRow">
                      <InputParent text="Address Line 2">
                        <input
                          name="addressLine2"
                          value={formValues.addressLine2}
                          onChange={handleChange}
                          className="inputBox"
                          required="true"
                        />
                      </InputParent>
                    </div>
                  </>
                )}
              </div>
            </>

            {/* Error Msg */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                color: "red",
                textAlign: "center",
              }}
            >
              {errorMsg}
            </div>

            {/* buttons */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  fontFamily: "Rubik",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                <Link to="/home">
                  <button
                    className="adminUserBtn"
                    style={{
                      border: "1px solid #C14D4D",
                      borderRadius: "5px",
                      color: "#C14D4D",
                      backgroundColor: "white",
                    }}
                  >
                    Cancel
                  </button>
                </Link>

                <button
                  className="adminUserBtn"
                  type="submit"
                  disabled={!formValues.userType}
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: `${
                      !formValues.userType ? "#FAFAFA" : "#204DF9"
                    }`,
                    color: `${!formValues.userType ? "#CECECE" : "white"}`,
                  }}
                >
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
         userId={userId}
          password={password} 
        close={() => setShowConfirmationModal(false)} />
      )}
    </div>
  );
}

export default FillUserInfo;
