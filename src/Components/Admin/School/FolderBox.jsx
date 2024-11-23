import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import FolderIcon from '@mui/icons-material/Folder';

function FolderBox({
  Id,
  text,
  setFolders,
  setShowDeleteConfirmationModal,
  setDeleteFolderId,
  isEditGalleryEnabled,
  setEditGallaryEnabled,
  onClick,
}) {
  const [folderText, setFolderText] = useState(text);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100px",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={onClick} //for selecting the folder
    >
      <div>
        <FolderIcon style={{ height: "100px", width:"100px", color:"skyblue" }}/>
      </div>
      <input
        readOnly={!isEditGalleryEnabled}
        value={folderText}
        onChange={(e) => setFolderText(e.target.value)}
        onBlur={() => {
          setFolders((prevFolders) => {
            return prevFolders.map((folder) => {
              if (folder.id === Id) {
                return { ...folder, text: folderText };
              }
              return folder;
            });
          });
        }}
        style={{
          fontFamily: "Roboto",
          fontSize: "14px",
          fontWeight: "500",
          textAlign: "center",
          border: "none",
          outline: "none",
        }}
      />
      {isEditGalleryEnabled && (
        <div
          style={{
            position: "absolute",
            top: "-10px",
            right: "0px",
            cursor: "pointer",
          }}
          onClick={() => {
            // setEditGallaryEnabled(false);
            setShowDeleteConfirmationModal(true);
            setDeleteFolderId(Id);
          }}
        >
          <CancelIcon
            style={{
              color: "red",
              backgroundColor: "white",
              height: "17px",
              width: "17px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default FolderBox;
