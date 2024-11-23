import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownload";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 315,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 2,
};

function DownloadFile({paperfile}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <button
        style={{
          background: "#9F8FFF",
          padding: "8px 15px",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        <a
          style={{ color: "white", textDecoration: "none" }}
          // href="//target.pdf"
          href={paperfile}
          target="_blank"
        >
          Download
        </a>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ border: "1px dashed #C5C5C5", textAlign: "center" }}>
            <CloudDownloadRoundedIcon
              style={{ height: "80px", width: "80px", color: "#00a3cc" }}
            />
            <br />
            <label>
              <span style={{ color: "#00a3cc" }}>Download</span> will begin
              shortly
            </label>
            <br />
            <br />
            <span style={{ fontSize: "12px" }}>
              File should be in .doc or .xlsx format
            </span>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default DownloadFile;
