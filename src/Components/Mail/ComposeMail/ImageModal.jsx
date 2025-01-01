import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function ImageModal({ file, index, handleAttachmentClick, state }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <li key={index} onClick={handleOpen} >{file.name}</li>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "50%",
                        height: "70%",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center",flexDirection:"column-reverse",gap:"50px" }}>
                        <Typography variant="h6" component="h2">
                            {file.name}
                        </Typography>
                        <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default ImageModal;
