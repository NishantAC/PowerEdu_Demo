import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";

function ImageBox({ Id, imgUrl, selectedAlbum, setSelectedAlbum }) {
  return (
    <div
      style={{
        height: "91px",
        width: "180px",
        border: "1px solid #ffffff",
        display: "grid",
        placeContent: "center",
        position: "relative",
      }}
    >
      <img
        style={{
          height: "96px",
          width: "180px",
        }}
        src={imgUrl}
      />
      <div
        style={{
          position: "absolute",
          top: "-18px",
          right: "0px",
          cursor: "pointer",
          backgroundColor: "white",
          borderRadius: "50%",
          height: "17px",
          width: "17px",
        }}
        onClick={() => {
          setSelectedAlbum((prevSelectedAlbum) => ({
            ...prevSelectedAlbum,
            imageUrlArray: prevSelectedAlbum.imageUrlArray.filter(
              (imgObject) => imgObject.imgUrlId !== Id
            ),
          }));
        }}
      >
        <CancelIcon
          style={{
            color: "black",
            backgroundColor: "transparent",
            height: "17px",
            width: "17px",
          }}
        />
      </div>
    </div>
  );
}

export default ImageBox;
