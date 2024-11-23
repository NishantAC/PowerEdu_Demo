import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from '../TeacherSubject.module.css';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from 'react-hook-form';
import { whiteSpaceValidation } from '../../../../Utils/CommonValidation';
import { REQUIRED_FIELD_ERROR } from '../../../../common/constant';
import { useSelector } from 'react-redux';
import NoteService from '../../../../services/note.service';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};


//start
function NotesBtn({ id,chapterDesc, setChapterNotes, chapterNotes, getAssignedSubjects, classDropdownValue }) {
  const user = useSelector((state) => state.auth.user)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setFile();
  };
  // console.table(chapterId);
  // const fileInput = React.useRef();

  //to get file name
  const [file, setFile] = React.useState();
  const fileInputRef = React.useRef();

  const { handleSubmit, register, setError, setValue, formState: { errors }, reset, formState } = useForm();

  const validation = (e) => {
    whiteSpaceValidation(setValue, setError, e.target);
  }

  const fileValidation = (e) => {
    const name = e.target.files[0].name;
    // Allowing file type
    var allowedExtensions = /\.(pdf|doc|docx|ppt|pptx)$/i;
    if (!allowedExtensions.exec(name)) {
      setError('file', { type: 'custom', message: 'Invalid file type.!' });
    } else {
      setValue("file", e.target.files);
      // console.warn(e.target.files)
      setFile(e.target.files[0].name);
    }
  }

  //handel save note 
  const saveNote = (data) => {
    const formData = new FormData();
    if (data.file) {
      formData.append("notes", data?.file[0]);
    }
    delete data?.file;
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    })

    // user.userid ,chapterId,
    //notedesc, chapterId, createdby
    if (chapterDesc.chapter_id && user?.schoolcode) {
      formData.append("chapter_id", chapterDesc.chapter_id);
      formData.append("chapter_number", chapterDesc.chapter_number);
      formData.append("schoolcode", user?.schoolcode);
      formData.append("id", id);


      NoteService.createNote(formData).then((res) => {
        // console.table(res)
        getAssignedSubjects(classDropdownValue)
        setChapterNotes([res?.data.chapternote,...chapterNotes])
        reset();
        fileInputRef.current.current = null;
        toast(res?.data?.message);
        handleClose();
      }).catch(err => {
        console.error("Problem in AddNoteModal :: saveNote() => ", err);
        toast(err?.message || "Something went wrong.!");
      });
    }
    else {
      toast("Something went wrong.!");
    }
  }

  return (
    <div>
      <div className={styles.CAdd} onClick={handleOpen}>
        <AddIcon className={styles.CAddIcon} />
        <button className={styles.chapterdescaddbtn}>
          Add
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.boxdiv} style={{ margin: 0, padding: 0 }}>
            <h3 className={styles.boxdivh3}>Add Notes</h3>
            <button onClick={handleClose} className={styles.crossbtn}>X</button>
          </div>

          <form onSubmit={handleSubmit(saveNote)}>
            <div className={styles.Notesdiv}>
              <p className={styles.p}>Title</p>
              <input style={{ marginTop: "1px" }} type="text" id="title" {...register("description", { required: true, onChange: validation })} />
              {errors?.description && <><br /> <span style={{ color: "red" }}>{REQUIRED_FIELD_ERROR}</span></>}
              <br />
              <CloudUploadIcon style={{ fontSize: '50px' }} />
              <p className={styles.NotesdivP1}>
                <span style={{ color: '#1EA6C6', cursor: 'pointer' }} onClick={() => fileInputRef.current.click()}>
                  Select
                  <input
                    type="file"
                    accept='.doc, .docx, .pdf, .ppt, .pptx'
                    name="file"
                    {...register('file', { required: true, onChange: fileValidation })}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                </span> File from you device
              </p>
              <p className={styles.NotesdivP2}>File should be in .doc or .xlsx format</p>
              <p style={{ margin: 0, color: "#1EA6c6" }} >{file}</p>
              <button type="submit" className={styles.Linkdivbtn} disabled={!formState.isValid} style={{ width: '200px', cursor: !formState.isValid && 'not-allowed' }}>Upload Notes</button>
            </div>
            {/* <button style={{ width: '200px' }} >Upload Notes</button> */}
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default NotesBtn;
