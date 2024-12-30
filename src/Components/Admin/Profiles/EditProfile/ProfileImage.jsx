import React from "react";


const ProfileImage = ({ formValues, setShowDeleteConfirmationModal, themeProperties }) => {
  return (
    <>
      <h1>
        {formValues.profiletype === "students"
          ? "Student"
          : formValues.profiletype === "teachers"
          ? "Teacher"
          : formValues.profiletype === "principal"
          ? "Principal"
          : formValues.profiletype === "accountant"
          ? "Accountant"
          : formValues.profiletype === "staff"
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
    </>
  );
};

export default ProfileImage;
