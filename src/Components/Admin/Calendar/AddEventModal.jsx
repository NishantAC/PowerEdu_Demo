import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDropdownClasses } from "../../../slices/principal";
import { Box, Modal } from "@mui/material";
import CalendarServices from "../../../services/calendar.service";
import { toast } from "sonner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  px: 3,
  py: 1,
  overflowY: "scroll",
};

const AddEventModal = ({ setOpen, open,holiday, getEvents, editData,setEditData,setHoliday }) => {
  const { classes } = useSelector((state) => state.principal);
  const { user: currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();


  // Define state for form fields
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    selectedClass: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if(editData){
    setFormData({
        eventName: editData.title,
        description: editData.extendedProps.description,
        selectedClass: editData.class_code,
        startDate: editData.start,
        endDate: editData.end,
    })
}
  },[editData])

  const handleClose = () => {
    setOpen(false); 
    setFormData({
        eventName: "",
        description: "",
        selectedClass: "",
        startDate: "",
        endDate: "",
    });
    setEditData(null);
    setHoliday(null);
}

  useEffect(() => {
    dispatch(getDropdownClasses({ schoolcode: currentUser.schoolcode }));
  }, []);

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        event_name: formData.eventName,
        event_desc: formData.description,
        start_date: formData.startDate,
        end_date: formData.endDate,
        event_type: formData.selectedClass ? "class" : "school",
        class_code: formData.selectedClass,
        school_code: currentUser.schoolcode,
        isHoliday: holiday
    };

    if (editData) {
        CalendarServices.editEvent(editData.id, data)
            .then(res => {
                getEvents();
                handleClose();
                toast.success(res.data.message, {
                    autoClose: 1000,
                    position: "bottom-right",
                });
            })
            .catch(error => {
                console.error("Error editing event:", error);
                // Handle error (e.g., show error message)
                toast.error("Error editing event. Please try again later.", {
                    autoClose: 3000,
                    position: "bottom-right",
                });
            });
    } else {
        CalendarServices.addEvent(data)
            .then(res => {
                getEvents();
                handleClose();
                toast.success(res.data.message, {
                    autoClose: 1000,
                    position: "bottom-right",
                });
            })
            .catch(error => {
                console.error("Error adding event:", error);
                // Handle error (e.g., show error message)
                toast.error("Error adding event. Please try again later.", {
                    autoClose: 3000,
                    position: "bottom-right",
                });
            });
    }
};


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="mainbox">
          <div style={{ display: "flex" }}>
            <h3 className="head">Add Event</h3>
            <button onClick={handleClose} className="crsbtn">
              X
            </button>
          </div>
          <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
            <label className="lbltext">Event Name</label>
            <br />
            <textarea
              style={{ width: "100%", height: "70px" }}
              className="insidetext"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
            ></textarea>
            <br />
            <br />
            <label className="lbltext">Description</label>
            <br />
            <textarea
              style={{ width: "100%", height: "100px" }}
              className="insidetext"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <label className="lbltext">Class</label>
                <br />
                <select
                  className="caldendarClassDropdown"
                  name="selectedClass"
                  value={formData.selectedClass}
                  onChange={handleChange}
                >
                  <option value="">Class</option>
                  {classes?.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="lbltext" htmlFor="assigndate">
                  Start Date
                </label>
                <br />
                <input
                  className="insidetext"
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="lbltext">End Date</label>
                <br />
                <input
                  className="insidetext"
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <br />
            <br />
            <br />
            <div style={{ textAlign: "center", marginLeft: "-100px" }}>
              <button type="submit" className="upldp">
                Add Event
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddEventModal;
