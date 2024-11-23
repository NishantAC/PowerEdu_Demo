import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { whiteSpaceValidation } from '../../../Utils/CommonValidation';
import { REQUIRED_FIELD_ERROR } from '../../../common/constant';
import { toast } from 'react-toastify';
import styles from './AdminNotice.module.css'
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

function AddPrincipalMsg({ fetchPrincipalMsg, getPhoto, user }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fileInputRef = useRef();
    const [file, setFile] = useState();

    const { handleSubmit, register, formState: { errors, isValid }, setError, setValue, reset, formState } = useForm();

    const validation = (e) => {
        whiteSpaceValidation(setValue, setError, e.target);
    };

    const fileValidation = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue('file', file);
            setFile(file.name);
        } else {
            setValue('file', undefined);
            setFile(undefined);
        }
    };

    const createPrincipalMsg = (data) => {
        const formData = new FormData();
        formData.append('title', data?.title);
        formData.append('description', data?.description);
        formData.append("user_id",user.id);

        principalService.createPrincipalMsg(formData)
            .then((res) => {
                reset();
                setFile(null);
                fetchPrincipalMsg();
                getPhoto();
                toast(res?.data);
                handleClose();
            })
            .catch((err) => {
                console.error('Problem in createPrincipalMsg:', err);
                toast(err?.message || 'Something went wrong!');
            });
    };

    return (
        <div>
            <button onClick={handleOpen}>Add New</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={styles.box}>
                    <div className={styles.boxdiv}>
                        <h3 className={styles.boxdivh3}>Add Principal Message</h3>
                        <button onClick={handleClose} className={styles.crossbtn}>X</button>
                    </div>
                    <form onSubmit={handleSubmit(createPrincipalMsg)}>
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
                                type="text"
                                id="description"
                                {...register('description', { required: true, onChange: validation })}
                                className={styles.formtextarea}
                            />
                            {errors?.description && (
                                <span className={styles.errorcolor}>{REQUIRED_FIELD_ERROR}</span>
                            )}
                            <br />
                            <input
                                type="file"
                                accept="image/png,image/jpeg"
                                name="file"
                                {...register('file', { onChange: fileValidation })}
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                className={styles.upload}
                                disabled={!formState.isValid || !formState.isDirty}
                                style={{ cursor: (!formState.isValid || !formState.isDirty) && 'not-allowed' }}
                            >
                                Upload
                            </button>
                            <p>{file}</p>
                            <div className={styles.formbtn}>
                                <button
                                    type="submit"
                                    className={styles.savebtn}
                                    disabled={!formState.isValid || !formState.isDirty}
                                    style={{ cursor: (!formState.isValid || !formState.isDirty) && 'not-allowed' }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default AddPrincipalMsg;
