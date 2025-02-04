import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { whiteSpaceValidation } from '../../../Utils/CommonValidation';
import { REQUIRED_FIELD_ERROR } from '../../../common/constant';
import { toast } from 'sonner';
import styles from './PrincipleNotice.module.css'
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
    // px: 2,
    // py: 2
};


function EditNotice({ fetchPrincipalMsg, getPhoto, initialData, school_id }) {

    //modal 
    const [open, setOpen] = useState(false);
    const handleOpen = () => { reset(); setOpen(true); };
    const handleClose = () => { reset(); setOpen(false); }

    //image 
    const fileInputRef = useRef();
    const [file, setFile] = useState();

    // 

    // useEffect(() => {

    // }, [initialData])


    //form
    const {
        handleSubmit,                   //for handeling submition
        register,                       //it holds data
        formState: { errors, isValid },
        setError,                       //manually set error on specific field
        setValue,                       //setvalue of form field
        reset,                          //reset form to initial state
        formState,                      //current state of form
    } = useForm();


    //validate
    const validation = (e) => {
        whiteSpaceValidation(setValue, setError, e.target);
    };

    const fileValidation = (e) => {
        const file = e.target.files[0];
        // 
        if (file) {
            setValue('file', file);
            setFile(file.name);
        } else {
            setValue('file', undefined);
            setFile(undefined);
        }
    };

    //edit function
    const editPrincipleNotice = (data) => {
        const formData = new FormData();
        formData.append('title', data?.title);
        formData.append('description', data?.description);
        
        //calling service
        principalService.editPrincipleNotice({ id: initialData.id, body: formData })
            .then((res) => {
                reset();
                setFile(null);
                fetchPrincipalMsg();
                getPhoto();
                toast(res?.data);
                handleClose();
            })
            .catch((err) => {
                console.error('Problem in editPrincipleNotice:', err);
                toast(err?.message || 'Something went wrong!');
            });
    };

    return (

        <div>
            {/*on click show modal*/}
            <button onClick={handleOpen} >Edit</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={styles.box} >
                    {/*head*/}
                    <div className={styles.boxdiv}>
                        <h3 className={styles.boxdivh3}>Edit notice</h3>
                        <button onClick={handleClose} className={styles.crossbtn}>
                            X
                        </button>
                    </div>
                    {/*react form*/}
                    <form onSubmit={handleSubmit(editPrincipleNotice)}>
                        <div style={{ width: '80%', margin: 'auto' }}>
                            <label className={styles.lable}>Title</label>
                            <br />
                            <input
                                defaultValue={initialData.title}
                                type="text"
                                id="title"
                                {...register('title', { required: true, onChange: validation })}
                                className={styles.forminput}

                            />
                            {errors?.title && (
                                <span className={styles.errorcolor}>{REQUIRED_FIELD_ERROR}</span>
                            )}
                            <br />

                            <label className={styles.lable}>Message</label>
                            <br />
                            <textarea
                                defaultValue={initialData.description}
                                type="text"
                                id="description"
                                {...register('description', { required: true, onChange: validation })}
                                className={styles.formtextarea}

                            />
                            {errors?.description && (
                                <span className={styles.errorcolor}>{REQUIRED_FIELD_ERROR}</span>
                            )}
                            <br />

                            {/*img*/}
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
                                    // Disable save button when the form is not passed all validation rule or not modified
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
export default EditNotice
