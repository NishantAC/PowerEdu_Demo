import { Select } from "@mui/material";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

function ImageBox({
  Id,
  imageUrl,
  selectionBox,
  selectedImages,
  setSelectedImages,
}) {
  const isImageSelected = selectedImages.includes(Id);

  return (
    <div
      style={{
        height: "200px",
        width: "390px",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <img
        style={{
          height: "200px",
          width: "390px",
          borderRadius: "10px",
        }}
        src={imageUrl}
      />
      {selectionBox !== "hidden" && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            width: "20px",
            height: "20px",
            border: isImageSelected ? "" : "2px solid #ffffff",
            borderRadius: "4px",
            background: "transparent",
            display: "grid",
            placeContent: "center",
          }}
          onClick={() => {
            setSelectedImages((prevSelectedImages) => {
              if (
                prevSelectedImages.length === 0 ||
                !prevSelectedImages.includes(Id)
              ) {
                return [...prevSelectedImages, Id];
              } else {
                return prevSelectedImages.filter((imageId) => imageId !== Id);
              }
            });
          }}
        >
          {isImageSelected && (
            <CheckOutlinedIcon
              style={{
                color: "white",
                width: "20px",
                height: "20px",
                backgroundColor: "#214DF9",
                border: "2px solid #214DF9",
                borderRadius: "4px",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ImageBox;
