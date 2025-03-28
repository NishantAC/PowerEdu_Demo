import React, { useRef, useState } from 'react';
import styles from './TeacherNotice.module.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { whiteSpaceValidation } from '../../../Utils/CommonValidation';
import { REQUIRED_FIELD_ERROR } from '../../../common/constant';
import ClassNoticeService from "../../../services/classnotice.service";
import { toast } from 'sonner';

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

function AddNoticeModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { handleSubmit, register, setError, setValue, formState: { errors }, reset, formState } = useForm();
    const [file, setFile] = useState();
    const fileInputRef = useRef();

    const validation = (e) => {
        whiteSpaceValidation(setValue, setError, e.target);
    }

    const fileValidation = (e) => {
        const name = e.target.files[0].name;
        var allowedExtensions = /(\.pdf)$/i;
        if (!allowedExtensions.exec(name)) {
            setError('file', { type: 'custom', message: 'Invalid file type.!' });
        } else {
            setValue("file", e.target.files);
            console.warn()
            setFile(e.target.files[0].name);
        }
    }

    const saveClassNotice = (data) => {
        const formData = new FormData();
        
        if (data.file) {
            formData.append("file", data?.file[0]);
        }
        delete data?.file;
        //school_code, class_code, title, createdby, description 
        formData.append("school_code", props?.user?.school_id);
        formData.append("createdBy", props?.user?.id);
        formData.append("class_code", data?.classcode);
        formData.append("title", data?.title);
        formData.append("description", data?.description);

        
        for (const entry of formData.entries()) {
            
        }
        ClassNoticeService.registerClassNotice(formData).then((res) => {
            reset();
            fileInputRef.current.current = null;
            if(data?.classcode === ''){
                props?.fetchAllNotices();
            }else{
                props?.fetchClassNotices(data?.classcode);
            }
            toast(res?.message);
            handleClose();
        }).catch(err => {
            console.error("Problem in AddNoticeModal :: registerSchoolNotice() => ", err);
            toast(err?.message || "Something went wrong.!");
        });

    }

    return (
        <div>
            <button onClick={handleOpen} className={styles.addnoticebtn}><AddIcon className={styles.addicon} /> Add New Notice</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={styles.box}>
                    <div className={styles.boxdiv}>
                        <h3 className={styles.boxdivh3}>Add new notice</h3>
                        <button onClick={handleClose} className={styles.crossbtn}>X</button>
                    </div>
                    <form onSubmit={handleSubmit(saveClassNotice)}>
                        <div style={{ width: '80%', margin: 'auto' }}>

                            <label className={styles.lable}>Title</label><br />
                            <input type="text" id="title" {...register("title", { required: true, onChange: validation })} className={styles.forminput} />
                            {errors?.title && <span className={styles.errorcolor}>{REQUIRED_FIELD_ERROR}</span>}
                            <br />
                            <label className={styles.lable}>Notice Description</label><br />
                            <textarea type="text" id="details" {...register("description", { required: true, onChange: validation })} className={styles.formtextarea} />
                            {errors?.details && <span className={styles.errorcolor}>{REQUIRED_FIELD_ERROR}</span>}
                            <br />

                            <label className={styles.lable}>Class (optional)</label><br />
                            <select id="schoolclassId" {...register("classcode")} className={styles.formselect}>
                                <option value="" >All</option>
                                {
                                    props?.user?.classes?.map((cl, index) => <option key={index} value={cl}>{cl}</option>)
                                }
                            </select>
                            <br />

                            <input
                                type="file"
                                accept=".pdf"
                                name="file"
                                {...register('file', { onChange: fileValidation })}
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                            />
                            <button type="button" onClick={() => fileInputRef.current.click()} className={styles.upload}>
                                Upload
                            </button>
                            <p>{file}</p>
                            <div className={styles.formbtn}  >
                                <button type="submit" className={styles.savebtn} disabled={!formState.isValid} style={{ cursor: !formState.isValid && 'not-allowed' }}>Save</button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default AddNoticeModal
