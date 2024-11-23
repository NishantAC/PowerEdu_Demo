import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import BackupIcon from "@mui/icons-material/Backup";
import { Link } from "react-router-dom";
import "./ConfirmationModal.css";

const ConfirmationModal = ({  close, userId, password  }) => {
  return (
    <div
      className="containerBox"
      style={{
        position: "fixed",
        height: "100%",
        width:"100%",
        left:0,
        top:0,
        background: "rgba(83, 83, 83,0.35)",
        zIndex: "20",
        display: "grid",
        placeContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        className="content-box"
        style={{
          border: "2px solid #FFFFFF",
          backgroundColor: "#FBFBFB",
          display: "flex",
          flexDirection: "column",
          gap: "0px",
        }}
      >
        {/* heading box */}
        <div
          className="heading"
          style={{
            width: "100%",
            height: "54px",
            backgroundColor: "#FBFBFB",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 3%",
            fontFamily: "Poppins",
            fontWeight: "600",
            color: "#494949",
          }}
        >
          Added New User
        </div>

        <div
          className="text"
          style={{
            backgroundColor: "white",
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "20px",
            fontFamily: "Poppins",
            color: "#494949",
          }}
        >
          <p
            style={{
              fontWeight: "700",
            }}
          >
            New user has been added
          </p>
          <div>
            <p style={{ margin: "10px 0" }}>
              <strong>User ID:</strong> {userId}
            </p>
            <p style={{ margin: "10px 0" }}>
              <strong>Password:</strong> {password}
            </p>
          </div>

          <Link to="/home">
            <button
              onClick={close}
              style={{
                fontWeight: "500",
                border: "none",
                outline: "none",
                backgroundColor: "#204DF9",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
