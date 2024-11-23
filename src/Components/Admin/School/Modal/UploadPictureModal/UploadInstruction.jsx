import React, { useEffect, useState } from "react";
import UploadIconSvg from "./UploadIconSvg";
import { display } from "@mui/system";
import { nanoid } from "@reduxjs/toolkit";

function UploadInstruction({ setSelectedAlbum }) {
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const urls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imgUrlId = nanoid(); 
        urls.push({
          imgUrlId: imgUrlId,
          imgUrl: e.target.result,
        });
        if (urls.length === files.length) {
          setSelectedAlbum((prevSelectedAlbum) => ({
            ...prevSelectedAlbum,
            imageUrlArray: urls,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        flex: "1",
        marginBottom: "20px",
        border: "1px dashed #C5C5C5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <div>
        <label
          htmlFor="uploadImgBtn"
          style={{
            height: "100%",
            width: "100%",
            cursor: "pointer",
            display: "grid",
            placeContent: "center",
          }}
        >
          <UploadIconSvg />
        </label>
        <input
          id="uploadImgBtn"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </div>

      <h1
        style={{
          fontFamily: "Roboto",
          fontSize: "18px",
          fontWeight: "500",
          letterSpacing: "4%",
          color: "#707070",
        }}
      >
        <span style={{ color: "#1EA6C6" }}>Select </span>
        file from your device
      </h1>
      <p
        style={{
          marginTop: "5px",
          fontFamily: "Roboto",
          fontSize: "12px",
          fontWeight: "300",
          letterSpacing: "4%",
          color: "#242424",
        }}
      >
        File should be in png or jpeg format
      </p>
    </div>
  );
}

export default UploadInstruction;
