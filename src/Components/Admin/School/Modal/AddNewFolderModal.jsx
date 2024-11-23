import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import "./AddNewFolderModal.css";
import { date } from "yup/lib/locale";

function AddNewFolderModal({ onClick, folders, setFolders }) {
  const [inputValue, setInputValue] = useState("");

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
            Add Folder
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
            padding: "0px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "start",
            position: "relative",
          }}
        >
          <div
            htmlFor="addFolder"
            style={{
              fontFamily: "Poppins",
              fontWeight: "500",
              fontSize: "14px",
              color: "#494949",
              marginTop: "30px",
            }}
          >
            Enter Name
          </div>
          <input
            id="addFolder"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: "100%", marginRight: "20px" }}
          />

          <button
            style={{
              position: "absolute",
              bottom: "20px",
              right: "30px",
              backgroundColor: "blue",
              width: "100px",
              height: "30px",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
            onClick={() => {
              setFolders([
                ...folders,
                { id: date, text: inputValue, imageUrlArray: [] },
              ]);
              onClick();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewFolderModal;
