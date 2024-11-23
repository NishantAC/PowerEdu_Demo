import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import BackupIcon from "@mui/icons-material/Backup";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";
import axios from "axios";

function DownloadConfirmationModal({ close, selectedAlbum, selectedImages }) {
  const navigate = useNavigate();

  const downloadSelectedImages = () => {
    const selectedImageUrls = selectedAlbum.imageUrlArray
      .filter((image) => selectedImages.includes(image.id))
      .map((image) => image.url);

    const zip = new JSZip();

    const promises = selectedImageUrls.map((url) =>
      axios.get(url, { responseType: "arraybuffer" })
    );

    Promise.all(promises)
      .then((responses) => {
        responses.forEach((response, index) => {
          const filename = `image-${index + 1}.jpg`; // You can customize the filename if needed
          zip.file(filename, response.data);
        });

        return zip.generateAsync({ type: "blob" });
      })
      .then((content) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = `${selectedAlbum.text}.zip`;
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading images:", error);
      });
  };

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
            Download
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
            Confirm Download Selection ?
          </p>
          <div style={{ display: "flex", gap: "30px" }}>
            <button
              style={{
                fontFamily: "Rubik",
                fontSize: "18px",
                fontWeight: "500",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "rgba(216,97,103,0.1)",
              }}
              onClick={() => navigate("/admin/school")}
            >
              Cancel
            </button>
            <button
              style={{
                fontFamily: "Rubik",
                fontSize: "18px",
                fontWeight: "500",
                color: "white",
                backgroundColor: "#214DF9",
                borderRadius: "5px",
                border: "none",
              }}
              onClick={() => {
                downloadSelectedImages();
                close();
              }}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DownloadConfirmationModal;