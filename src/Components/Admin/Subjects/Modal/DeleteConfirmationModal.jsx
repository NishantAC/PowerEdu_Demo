import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import BackupIcon from "@mui/icons-material/Backup";
import { Link } from "react-router-dom";
import "./DeleteConfirmationModal.css";
import { useSelector } from "react-redux";
import SubjectService from "../../../../services/subject.service";

function DeleteConfirmationModal({ itemToDelete, onClick }) {
  const { user } = useSelector((state) => state.user);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        background: "rgba(83, 83, 83,0.35)",
        zIndex: "10",
        display: "grid",
        placeContent: "center",
      }}
    >
      <div
        className="content-box"
        style={{
          border: "2px solid #FFFFFF",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* heading box */}
        <div
          style={{
            width: "100%",
            height: "54px",
            backgroundColor: "#FBFBFB",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 3%",
          }}
        >
          <div
            className="heading"
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              color: "#494949",
            }}
          >
            Delete Subject
          </div>
          <div
            className="cross-circle"
            style={{
              borderRadius: "50px",
              backgroundColor: "red",
              color: "white",
              display: "grid",
              placeContent: "center",
              cursor: "pointer",
            }}
            onClick={onClick}
          >
            <CloseIcon />
          </div>
        </div>

        {/* buttons container */}
        <div
          style={{
            backgroundColor: "white",
            flex: "1",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <p
            className="text"
            style={{
              fontFamily: "Poppins",
              fontWeight: "500",
            }}
          >
            Confirm Subject Delete Request ?
          </p>
          <div style={{ display: "flex", gap: "30px" }}>
            <Link to="/admin/Subjects">
              <button
                style={{
                  fontFamily: "Rubik",
                  fontSize: "18px",
                  fontWeight: "500",
                  border: "none",
                  backgroundColor: "rgba(216,97,103,0.1)",
                }}
              >
                Cancel
              </button>
            </Link>
            <Link to="/admin/Subjects">
              <button
                style={{
                  fontFamily: "Rubik",
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "white",
                  backgroundColor: "#D86167",
                  border: "none",
                }}
                onClick={() => {
                  if (
                    itemToDelete.class_code &&
                    itemToDelete.subject_code &&
                    user
                  ) {
                    const body = {
                      school_code: user?.schoolcode,
                      class_code: itemToDelete.class_code,
                      subject_code: itemToDelete.subject_code,
                    };

                    SubjectService.deleteSubjectsOfClasses(body).then(() => {
                      
                    });
                  }
                }}
              >
                Confirm
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
