import React, { useEffect, useState } from 'react';
import '../TeacherAssignment.css'
import './upload.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from "react-hook-form";
import { REQUIRED_FIELD_ERROR } from '../../../../common/constant';
import AssignmentService from '../../../../services/assignment.service';
import { toast } from 'sonner';
import { whiteSpaceValidation } from '../../../../Utils/CommonValidation';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    px: 3,
    py: 1,
    overflowY: 'scroll'
};

function UploadAssign(props) {

    const [initialData, setInitialData] = useState(null);

    const { user } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setInitial().then(() => {  // set class and subject data then open upload model
            setOpen(true);
        });
    }

    const handleClose = () => {
        setOpen(false);
        setClasses([]);
        setSubjects([]);
    }
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);


    const initialForm = { description: "", class_code: "", school_code: "", assigndate: "", duedate: "", file: "" }

    const { handleSubmit, register, reset, setValue, setError, formState: { errors }, formState } = useForm({
        defaultValues: initialForm
    });

    const validation = (e) => {
        whiteSpaceValidation(setValue, setError, e.target);
    }

    /**
     * get classname and subjects
    */

    const setInitial = async () => {
        const data = await AssignmentService.getInitialData({ userId: user.id });
        const clname = Object.keys(data);
        setInitialData(data);
        setClasses(clname);
    }

    /**
     * set subject state according to class
    */
    const onClassChange = (e) => {
        const className = e.target.value;
        
        if (className) {
            
            const subname = Object.entries(initialData[className]).map(([key, value]) => ({ [key]: value }));
            // 
            setSubjects(subname);
        } else {
            setSubjects([]);
        }
    }


    const onSubmit = (data) => {
        const formData = new FormData();
        const json = {
            "description": data?.description, "duration": { "assigndate": data?.assigndate, "duedate": data?.duedate }
            , "subject_code": data?.subject_code
        };
        formData.append("assDetails", JSON.stringify(json));
        formData.append("file", data?.file[0]);
        formData.append("school_code", user?.school_id);
        formData.append("class_code", data.class_code);
        formData.append("userid", user.id);
        AssignmentService.saveAssignment(formData).then((res) => {
            if (res.message) {
                toast.success(res.message);
                reset(initialForm);
                props?.initialData();
                handleClose();
            }
        }).catch((err) => {
            console.error("Problem in UploadAssign :: saveAssignment() => ", err);
        })
    }

    return (
        <>
            {/* <button className={(props?.body) ? 'assignviewbtn' : 'addassignbtn'} onClick={handleOpen}> {(props?.body) ? "View" : (<><AddIcon style={{ verticalAlign: 'middle', marginRight: '5px', fontSize: '14px' }} />Add New Assignment</>)} </button> */}
            <button className='Taddassignbtn' onClick={handleOpen}> <AddIcon style={{ fontSize: "1.1rem" }} />Add New Assignment</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='mainbox'>

                    <div style={{ display: 'flex' }}>
                        <h3 className='head'>Upload Assignment</h3>
                        <button onClick={handleClose} className="crsbtn">X</button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "10px" }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <label className='lbltext' >Class</label><br />
                                <select className='indrp' {...register("class_code", { required: true, onChange: validation })} onChange={onClassChange} >
                                    <option value="">Class</option>
                                    {
                                        classes?.map((c) => <option key={c} value={c}>{c}</option>)
                                    }
                                </select>
                                {errors?.class_code && <span className="error-color">{REQUIRED_FIELD_ERROR}</span>}
                            </div>

                            <div>
                                <label className='lbltext' >Subject</label><br />
                                <select className='indrp' {...register("subject_code", { required: true, onChange: validation })}>
                                    <option value="" >Subject</option>
                                    {
                                        subjects?.map((s) => {
                                            const subjectCode = Object.keys(s)[0]; // Get the key of the object
                                            const subname = s[subjectCode]; // Get the value using the key
                                            return <option key={subjectCode} value={subjectCode}>{subname}</option>
                                        })
                                    }
                                </select>
                                {errors?.school_code && <span className="error-color">{REQUIRED_FIELD_ERROR}</span>}
                            </div>
                        </div>

                        <br />
                        <label className='lbltext'>Assignment Description(Optional)</label><br />
                        <textarea style={{ width: "100%", height: "100px" }} className='insidetext'{...register("description")} ></textarea>
                        {errors?.description && <span className="error-color">{REQUIRED_FIELD_ERROR}</span>}
                        <br />

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div >
                                <label className='lbltext' htmlFor='assigndate'>Assigned Date</label>
                                <br />
                                <input className='insidetext' type='date' {...register("assigndate", { required: true, onChange: validation })} />
                                {errors?.assigndate && <span className="error-color">{REQUIRED_FIELD_ERROR}</span>}
                            </div>
                            <div >
                                <label className='lbltext'>Due Date</label>
                                <br />
                                <input className='insidetext' type='date' {...register("duedate", { required: true, onChange: validation })} />
                                {errors?.duedate && <span className="error-color">{REQUIRED_FIELD_ERROR}</span>}
                            </div>
                        </div>
                        <br />
                        <label className='lbltext'>File</label>
                        <br />
                        <input className='insidetext' type="file" accept='.pdf'{...register("file", { required: true, onChange: validation })} style={{ background: '#9f8fff', width: '80%', margin: 'auto', color: 'white', border: 'none', padding: '8px', cursor: 'pointer' }} />
                        <br />
                        {errors?.file && <span className="error-color">{REQUIRED_FIELD_ERROR}</span>}
                        <br />
                        <br />
                        <div style={{ textAlign: "center", marginLeft: "-100px" }} >
                           {/*  <input type="submit" value="Upload paper" className='upldp' disabled={!formState.isValid} style={{ cursor: !formState.isValid && 'not-allowed' }} /> */}
                            <button type='submit' className='upldp' disabled={!formState.isValid} style={{ cursor: !formState.isValid && 'not-allowed' }}>Upload paper</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default UploadAssign
