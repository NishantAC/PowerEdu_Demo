import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WestIcon from "@mui/icons-material/West";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentDetails } from "../../../slices/student";

import "./ViewProfile.css";
import {
  fetchOtherManagementMemebrDetails,
  fetchTeacherDetails,
} from "../../../slices/admin";

function ViewProfile() {
  const location = useLocation();
  const { userId, userType } = location.state || {}; // default to empty object if location.state is undefined
  const dispatch = useDispatch();

  const { student, teacher, otherManagementMember, loading } = useSelector(
    (state) => ({
      student: state.student.student,
      teacher: state.admin.teacher,
      otherManagementMember: state.admin.otherManagementMember,
      loading: state.student.loading,
    })
  );

  useEffect(() => {
    if (userType === "students") {
      dispatch(fetchStudentDetails({ user_id: userId }));
    } else if (userType === "teachers") {
      dispatch(fetchTeacherDetails({ user_id: userId }));
    } else if (userType) {
      dispatch(fetchOtherManagementMemebrDetails({ user_id: userId }));
    }
  }, [dispatch, userId, userType]);

  const profileData =
    userType === "students"
      ? student
      : userType === "teachers"
      ? teacher
      : otherManagementMember || {};

  if (!userType || !userId) {
    return <p>Error: User type or ID not provided.</p>;
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="containerBox">
      {/* Breadcrumb Navigation */}
      <nav className="topNav">
        <div className="breadcrumb">
          <div className="breadcrumbText">Home</div>
          <KeyboardArrowRightIcon />
          <div className="breadcrumbText underline">
            {userType?.charAt(0).toUpperCase() + userType.slice(1)} Profile
          </div>
        </div>
        <Link to={`/${userType}-profile`} className="backButton">
          <WestIcon style={{ color: "#5F5F5F" }} />
          <div className="backButtonText">Back</div>
        </Link>
      </nav>

      {/* Profile Content */}
      <div className="contentBox">
        {/* Left Side - Profile Image */}
        <div className="leftContainer">
          <h1>
            {userType?.charAt(0).toUpperCase() + userType.slice(1)} Profile
          </h1>
          <div className="profileImageContainer">
            {profileData.imageUrl ? (
              <div
                style={{
                  height: "132px",
                  width: "132px",
                  borderRadius: "50%",
                  backgroundImage: `url(${profileData.imageUrl})`,
                  backgroundSize: "cover",
                }}
              ></div>
            ) : (
              <div className="profilePlaceholder">A</div>
            )}
          </div>
        </div>

        {/* Right Side - Profile Details */}
        <div className="rightContainer">
          <div className="profileDetails">
            <div className="profileRow">
              <span className="field-label">User Type:</span>
              <span className="field-value">{userType}</span>
            </div>

            <div className="profileRow">
              <span className="field-label">Rekor Id:</span>
              <span className="field-value">
                {profileData.user_id || "N/A"}
              </span>
            </div>

            <div className="profileRow">
              <span className="field-label">Admission No:</span>
              <span className="field-value">
                {profileData.admissionno || "N/A"}
              </span>
            </div>

            <div className="profileRow">
              <span className="field-label">First Name:</span>
              <span className="field-value">
                {profileData.firstname || "N/A"}
              </span>
            </div>

            <div className="profileRow">
              <span className="field-label">Middle Name:</span>
              <span className="field-value">
                {profileData.middlename || "N/A"}
              </span>
            </div>

            <div className="profileRow">
              <span className="field-label">Last Name:</span>
              <span className="field-value">
                {profileData.lastname || "N/A"}
              </span>
            </div>

            <div className="profileRow">
              <span className="field-label">Class:</span>
              <span className="field-value">{profileData.class || "N/A"}</span>
            </div>

            <div className="profileRow">
              <span className="field-label">Roll No:</span>
              <span className="field-value">{profileData.rollno || "N/A"}</span>
            </div>

            <div className="profileRow">
              <span className="field-label">Email:</span>
              <span className="field-value">{profileData.email || "N/A"}</span>
            </div>

            <div className="profileRow">
              <span className="field-label">Father's Name:</span>
              <span className="field-value">
                {profileData.fathername || "N/A"}
              </span>
            </div>

            <div className="profileRow">
              <span className="field-label">Mother's Name:</span>
              <span className="field-value">
                {profileData.mothername || "N/A"}
              </span>
            </div>

            <div className="profileRow">
              <span className="field-label">Guardian's Name:</span>
              <span className="field-value">
                {profileData.guardianname || "N/A"}
              </span>
            </div>

            <div className="profileRow">
              <span className="field-label">Address Line 1:</span>
              <span className="field-value">
                {profileData.address1 || "N/A"}
              </span>
            </div>

            <div className="profileRow">
              <span className="field-label">Address Line 2:</span>
              <span className="field-value">
                {profileData.address2 || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
