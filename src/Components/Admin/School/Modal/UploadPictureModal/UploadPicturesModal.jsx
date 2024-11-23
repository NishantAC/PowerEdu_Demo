import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import "./UploadPicturesModal.css";
import { date } from "yup/lib/locale";
import Select from "./Select";
import UploadInstruction from "./UploadInstruction";
import UploadPreview from "./UploadPreview";
import "./UploadPicturesModal.css";

function UploadPicturesModal({ folders, setFolders, onClick }) {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

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
          width: "461px",
          height: selectedAlbum ? "400px" : "269px",
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
            Upload Pictures
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
            height: "800px",
            padding: "0px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "start",
            position: "relative",
            gap: "30px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "start",
            }}
          >
            <div
              style={{
                fontFamily: "Poppins",
                fontWeight: "500",
                fontSize: "14px",
                color: "#494949",
                marginTop: "30px",
              }}
            >
              Select Album
            </div>
            <div
              style={{
                width: "95%",
                height: "45px",
                border: "1px solid rgb(0,0,0,0.2)",
                outline: "none",
              }}
            >
              <Select
                folders={folders}
                info={selectedAlbum}
                setInfo={setSelectedAlbum}
                placeHolder=""
              />
            </div>
          </div>

          {selectedAlbum ? (
            selectedAlbum.imageUrlArray.length > 0 ? (
              <UploadPreview
                id={selectedAlbum.id}
                selectedAlbum={selectedAlbum}
                setSelectedAlbum={setSelectedAlbum}
                setFolders={setFolders}
                close={onClick}
              />
            ) : (
              <UploadInstruction setSelectedAlbum={setSelectedAlbum} />
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadPicturesModal;
