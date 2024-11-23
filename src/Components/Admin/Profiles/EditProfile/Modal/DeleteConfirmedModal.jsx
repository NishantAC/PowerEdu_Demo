import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import BackupIcon from "@mui/icons-material/Backup";
import { Link } from "react-router-dom";
import "./DeleteConfirmationModal.css";

function DeleteConfirmedModal() {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
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
          Request Delete Account
        </div>

        <div
          className="text"
          style={{
            backgroundColor: "white",
            flex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"center",
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
            Your request has been sent
          </p>

          <p
            style={{
              fontWeight: "500",
            }}
          >
            We will notify you once it has been done
          </p>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmedModal;
