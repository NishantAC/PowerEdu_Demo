import React, { useEffect, useMemo, useState } from 'react';
import '../TeacherHomework.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import HomeWorkService from '../../../../services/homework.service';
import { REQUIRED_FIELD_ERROR } from '../../../../common/constant';
import { whiteSpaceValidation } from '../../../../Utils/CommonValidation';
import { toast } from 'sonner';
import AssignmentService from '../../../../services/assignment.service';

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
    py: 1
};

function UploadHomework(props) {

    const [initialData, setInitialData] = useState(null);

    const { user } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
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


    const initialForm = { homework_desc: "", class_code: "", subject_code: "", homework_date: "", file: "" }
    const { handleSubmit, register, setValue, setError, reset, formState: { errors }, formState } = useForm({
        defaultValues: initialForm
    });

    const validation = (e) => {
        whiteSpaceValidation(setValue, setError, e.target);
    }

    const setInitial = async () => {
        // re-using the function from assignment service
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
            "homework_desc": data?.homework_desc, "homework_date": data?.homework_date
            , "subject_code": data?.subject_code
        };
        formData.append("hwDetails", JSON.stringify(json));
        formData.append("file", data?.file[0]);
        formData.append("school_code", user?.schoolcode);
        formData.append("class_code", data.class_code);
        formData.append("userid", user.id);

        HomeWorkService.saveHomework(formData).then((res) => {
            
            if (res.message) {
                toast.success(res.message);
                reset(initialForm);
                props?.initialData();
                handleClose();
            }
        }).catch((err) => {
            console.error("Problem in UploadHomework :: saveHomework() => ", err);
        })
    }
    return (
        <div>
            <button className='Taddassignbtn' onClick={handleOpen}> <AddIcon style={{ fontSize: "1.1rem" }} />Add New Homework</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className='mainbox'>
                    <div style={{ display: 'flex' }}>
                        <h3 className='head'>Upload Homework</h3>
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
                                {errors?.subject_code && <span className="error-color">{REQUIRED_FIELD_ERROR}</span>}
                            </div>
                        </div>

                        <br />
                        <div>
                            <label className='lbltext'>Homework Description(Optional)</label><br />
                            <textarea style={{ width: "100%", height: "100px" }} className='insidetext' {...register("homework_desc")} ></textarea>
                        </div>
                        <br />

                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '45%' }}>
                                <label className='lbltext'>Assigned Date</label>
                                <br />

                                <input className='insidetext' type='date' {...register("homework_date", { required: true, onChange: validation })} />
                                {errors?.homework_date && <span className="error-color">{REQUIRED_FIELD_ERROR}</span>}
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
                            {/* <input type="submit" value="Upload" className='upldp' disabled={!formState.isValid} style={{ cursor: !formState.isValid && 'not-allowed' }} /> */}
                            <button type='submit' className='upldp' disabled={!formState.isValid} style={{ cursor: !formState.isValid && 'not-allowed' }} >Upload</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div >
    )
}

export default UploadHomework
