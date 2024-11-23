import React, { useEffect, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ImageBox from "./ImageBox";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import DownloadConfirmationModal from "./DownloadConfirmationModal";

const Album = ({ Id, selectedAlbum, setFolders }) => {
  const [selectionBox, setSelectionBox] = useState("hidden");
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDeleteConfirmationModalVisible, setDelecteConfirmationModalVisible] =
    useState(false);

  const [
    isDownloadConfirmationModalVisible,
    setDownloadConfirmationModalVisible,
  ] = useState(false);

  return (
    <div style={{ marginTop: "30px" }}>
      <h1
        style={{
          width: "100%",
          fontFamily: "Poppins",
          fontSize: "25px",
          fontWeight: "600",
        }}
      >
        {selectedAlbum.text}
      </h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          gap: "10px",
          alignItems: "center",
        }}
      >
        {(selectionBox === "hidden" ||
          (selectionBox === "download" && selectedImages.length > 0)) &&
          selectedAlbum.imageUrlArray.length > 0 && (
            <button
              style={{
                height: "46px",
                width: "197px",
                color: "#214DF9",
                backgroundColor: "white",
                border: "1px solid #214DF9",
                borderRadius: "4px",
                fontFamily: "Rubik",
                fontSize: "18px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setSelectionBox("download");
                if (selectedImages.length > 0)
                  setDownloadConfirmationModalVisible(true);
              }}
            >
              <ArrowDownwardIcon />
              Download Pictures
            </button>
          )}

        {(selectionBox === "hidden" ||
          (selectionBox === "delete" && selectedImages.length > 0)) &&
          selectedAlbum.imageUrlArray.length > 0 && (
            <button
              style={{
                height: "46px",
                width: "99px",
                color: "#CB4C53",
                backgroundColor: "white",
                border: "1px solid #CB4C53",
                borderRadius: "4px",
                fontFamily: "Rubik",
                fontSize: "18px",
                fontWeight: "500",
              }}
              onClick={() => {
                setSelectionBox("delete");
                if (selectedImages.length > 0)
                  setDelecteConfirmationModalVisible(true);
              }}
            >
              Delete
            </button>
          )}

        {(selectionBox === "delete" || selectionBox === "download") && (
          <button
            style={{
              height: "46px",
              width: "120px",
              color: "#929292",
              backgroundColor: "white",
              border: "1px solid #929292",
              borderRadius: "4px",
              fontFamily: "Rubik",
              fontSize: "18px",
              fontWeight: "500",
            }}
            onClick={() => {
              setSelectionBox("hidden");
              setSelectedImages([]);
            }}
          >
            Cancel
          </button>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          rowGap: "30px",
          columnGap: "43px",
          marginTop: "20px",
        }}
      >
        {selectedAlbum?.imageUrlArray.map((imageObj, index) => (
          <ImageBox
            key={imageObj.imgUrlId}
            Id={imageObj.imgUrlId}
            imageUrl={imageObj.imgUrl}
            selectionBox={selectionBox}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
          />
        ))}
      </div>

      {isDownloadConfirmationModalVisible && (
        <DownloadConfirmationModal
          close={() => {
            setDownloadConfirmationModalVisible(false);
            setSelectionBox("hidden");
            setSelectedImages([]);
          }}
          selectedAlbum={selectedAlbum}
          selectedImages={selectedImages}
        />
      )}

      {isDeleteConfirmationModalVisible && (
        <DeleteConfirmationModal
          close={() => {
            setDelecteConfirmationModalVisible(false);
            setSelectionBox("hidden");
            setSelectedImages([]);
          }}
          selectedImages={selectedImages}
          setFolders={setFolders}
          Id={Id}
          // setImages={setImages}
        />
      )}
    </div>
  );
};

export default Album;
