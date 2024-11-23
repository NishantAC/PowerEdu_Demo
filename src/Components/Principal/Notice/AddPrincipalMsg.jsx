import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { whiteSpaceValidation } from '../../../Utils/CommonValidation';
import { REQUIRED_FIELD_ERROR } from '../../../common/constant';
import { toast } from 'react-toastify';
import styles from './PrincipleNotice.module.css';
import principalService from '../../../services/principal.service';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
};

function AddPrincipalMsg({ fetchPrincipalMsg, getPhoto, user, messageId = null }) {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { handleSubmit, register, formState: { errors, isValid, isDirty }, setError, setValue, reset } = useForm({
    mode: 'onChange', // Real-time validation
  });

  // Open modal and check if in edit mode
  const handleOpen = () => {
    if (messageId) {
      setIsEditMode(true);
      fetchMessageDetails(); // Load the message to edit
    } else {
      setIsEditMode(false);
    }
    setOpen(true);
  };

  // Close modal and reset form
  const handleClose = () => {
    setOpen(false);
    reset();  // Reset form fields
  };

  // Fetch existing message details when editing
  const fetchMessageDetails = () => {
    principalService.getPrincipalMessage({ user_id: user?.id, id: messageId })
      .then((res) => {
        if (res) {
          setValue('title', res.title);
          setValue('description', res.description);
        }
      })
      .catch((err) => console.error("Error fetching message:", err));
  };

  // Validate white spaces in input
  const validation = (e) => {
    whiteSpaceValidation(setValue, setError, e.target);
  };

  // Create or update principal message
  const createOrUpdatePrincipalMsg = (data) => {
    const formData = new FormData();
    formData.append('title', data?.title);
    formData.append('description', data?.description);
    formData.append("user_id", user.id);

    if (isEditMode) {
      // Update the message
      principalService.editPrincipalMsg(user.id, messageId, formData)
        .then(() => {
          fetchPrincipalMsg();  // Refresh the principal message list
          getPhoto();  // Optionally refresh principal photo
          toast("Message updated successfully");
          handleClose();
        })
        .catch((err) => {
          console.error('Problem updating message:', err);
          toast(err?.message || 'Something went wrong!');
        });
    } else {
      // Create a new message
      principalService.createPrincipalMsg(formData)
        .then(() => {
          fetchPrincipalMsg();  // Refresh the principal message list
          getPhoto();  // Optionally refresh principal photo
          toast("Message added successfully");
          handleClose();
        })
        .catch((err) => {
          console.error('Problem in creating message:', err);
          toast(err?.message || 'Something went wrong!');
        });
    }
  };

  return (
    <div>
      <button onClick={handleOpen}>{isEditMode ? "Edit" : "Add New"}</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.box}>
          <div className={styles.boxdiv}>
            <h3 className={styles.boxdivh3}>{isEditMode ? "Edit Principal Message" : "Add Principal Message"}</h3>
            <button onClick={handleClose} className={styles.crossbtn}>X</button>
          </div>
          <form onSubmit={handleSubmit(createOrUpdatePrincipalMsg)}>
            <div style={{ width: '80%', margin: 'auto' }}>
              <label className={styles.lable}>Title</label><br />
              <input
                type="text"
                id="title"
                {...register('title', { required: true, onChange: validation })}
                className={styles.forminput}
              />
              {errors?.title && (
                <span className={styles.errorcolor}>{REQUIRED_FIELD_ERROR}</span>
              )}
              <br />
              <label className={styles.lable}>Message</label><br />
              <textarea
                id="description"
                {...register('description', { required: true, onChange: validation })}
                className={styles.formtextarea}
              />
              {errors?.description && (
                <span className={styles.errorcolor}>{REQUIRED_FIELD_ERROR}</span>
              )}
              <br />
              <div className={styles.formbtn}>
                <button
                  type="submit"
                  className={styles.savebtn}
                  disabled={!isValid || !isDirty} // Disable button if form is not valid or untouched
                >
                  {isEditMode ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddPrincipalMsg;
