import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import BackupIcon from "@mui/icons-material/Backup";
import { Link } from "react-router-dom";
import "./ClassesUpdateConfirmationModal.css";
import classService from "../../../../../services/class.service";

function ClassesUpdateConfirmationModal({ updatedClasses, setClasses, close }) {
  console.log(updatedClasses,"updateclasses")
  return (
    <div
      style={{
        position: "fixed",
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
            Update
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
            onClick={close}
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
            Confirm Updating Classes ?
          </p>
          <div style={{ display: "flex", gap: "30px" }}>
            <Link to="/admin/school">
              <button
                style={{
                  fontFamily: "Rubik",
                  fontSize: "18px",
                  fontWeight: "500",
                  border: "none",
                  backgroundColor: "rgba(216,97,103,0.1)",
                  borderRadius: "5px",
                }}
              >
                Cancel
              </button>
            </Link>
            {/* <Link>
        </Link> */}
            <button
              style={{
                fontFamily: "Rubik",
                fontSize: "18px",
                fontWeight: "500",
                color: "white",
                backgroundColor: "#D86167",
                border: "none",
                borderRadius: "5px",
              }}
              onClick={() => {
                classService
                  .updateClasses(1, updatedClasses)
                  .then(() => setClasses(updatedClasses));
                close();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassesUpdateConfirmationModal;
