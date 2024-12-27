import React, { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./Event.css"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CalendarServices from "../../../services/calendar.service";
import { toast } from "sonner";

const Event = ({ event, handleEdit, getEvents}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedDate = `${month} ${formattedDay}, ${year}`;
        return formattedDate;
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleConfirmDelete = () => {
        setOpenDeleteDialog(false);
        CalendarServices.deleteEvent(event.id).then(res => {
                getEvents();
                toast.success(res.data.message, {
                    autoClose: 1000,
                    position: "bottom-right",
                });
            })
            .catch(error => {
                console.error("Error deleting event:", error);
                // Handle error (e.g., show error message)
                toast.error("Error deleting event. Please try again later.", {
                    autoClose: 3000,
                    position: "bottom-right",
                });
            });
    };

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
        handleClose(); // Close the menu when opening the delete dialog
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    return (
        <div style={{ borderBottom: "1px solid #0000001A", maxWidth: "437px", maxHeight: "61px" }}>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <p style={{ fontSize: "0.8rem", marginBottom: '8px', color: 'rgba(0, 0, 0, 0.5)', display: 'inline-block' }}>{formatDate(event?.start)}</p>
                <IconButton onClick={handleMenuClick}>
                <MoreVertIcon sx={{ fontSize: 'small' }} />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => {
                        handleClose();
                        handleEdit(event); // Pass the event to the handleEdit function
                    }}>Edit</MenuItem>
                    <MenuItem onClick={handleOpenDeleteDialog}>Delete</MenuItem>
                </Menu>
            </div>
            <div className="eventName">
                <h6 style={{ marginTop: '0' }}>{event?.title}</h6>
                <p>{event?.class_code}</p>
            </div>
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this event?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Event;
