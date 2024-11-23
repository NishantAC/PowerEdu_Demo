import React from "react";
import ImageBox from "./ImageBox";
import { nanoid } from "@reduxjs/toolkit";

function UploadPreview({
  id,
  selectedAlbum,
  setSelectedAlbum,
  setFolders,
  close,
}) {
  const handleAddMore = (event) => {
    const files = event.target.files;
    const newUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imgUrlId = nanoid();
        newUrls.push({
          imgUrlId: imgUrlId,
          imgUrl: e.target.result,
        });
        if (newUrls.length === files.length) {
          setSelectedAlbum((prevSelectedAlbum) => ({
            ...prevSelectedAlbum,
            imageUrlArray: [...prevSelectedAlbum.imageUrlArray, ...newUrls],
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) => {
        if (folder.id === id) {
          return { ...folder, imageUrlArray: selectedAlbum.imageUrlArray };
        }
        return folder;
      })
    );
    close();
  };

  return (
    <div
      style={{
        width: "100%",
        // height: "40%",
        flex: "1",
        marginBottom: "20px",
        // display: "flex",
        // justifyContent: "center",
        // flexWrap: "wrap",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        rowGap: "20px",
        padding: "10px",
        overflowY: "scroll",
      }}
    >
      {selectedAlbum.imageUrlArray.map((imgObj, index) => (
        <ImageBox
          key={imgObj.imgUrlId}
          Id={imgObj.imgUrlId}
          imgUrl={imgObj.imgUrl}
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
        />
      ))}

      <div
        style={{
          zIndex: "10",
          position: "absolute",
          width: "81%",
          bottom: "30px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <div>
          <label
            htmlFor="uploadImgBtn"
            style={{
              cursor: "pointer",
              display: "grid",
              placeContent: "center",
              color: "#3CB532",
              border: "1px solid #3CB532",
              outline: "none",
              backgroundColor: "white",
              height: "46px",
              width: "127px",
              fontFamily: "Roboto",
              fontWeight: "500",
              fontSize: "14px",
              borderRadius: "4px",
              boxShadow: "0 1px 5px 0 rgba(33, 33, 33, 0.48)",
            }}
          >
            + Add More
          </label>
          <input
            id="uploadImgBtn"
            type="file"
            accept="image/*"
            multiple
            onChange={handleAddMore}
            style={{ display: "none" }}
          />
        </div>
        <button
          style={{
            backgroundColor: "#3CB532",
            outline: "none",
            color: "white",
            height: "46px",
            width: "127px",
            fontFamily: "Roboto",
            fontWeight: "500",
            fontSize: "14px",
            border: "none",
            borderRadius: "4px",
            boxShadow: "0 1px 5px 0 rgba(33, 33, 33, 0.48)",
          }}
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadPreview;
