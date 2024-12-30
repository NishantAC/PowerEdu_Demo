import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from '../TeacherSubject.module.css';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useSelector } from 'react-redux';
import LinkService from '../../../../services/link.service';
import { toast } from 'sonner';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 390,
    // height: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

function LinkBtn({ chapterDesc, setChapterLinks, chapterLinks, getAssignedSubjects, classDropdownValue }) {
    const user = useSelector((state) => state.auth.user)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setData] = React.useState({
        description: "",
        url: ""
    });

    const onhandelLink = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        
    }

    const saveLink = () => {
        LinkService.createLink({ data, chapter_id: chapterDesc.chapter_id, chapter_number: chapterDesc.chapter_number }).then((res) => {
            // console.table(res)
            getAssignedSubjects(classDropdownValue)
            setChapterLinks([...chapterLinks,res?.data.data])        
            setData({});
            toast(res?.data?.message);
            handleClose();
        }).catch(err => {
            console.error("Problem in AddNoteModal :: saveNote() => ", err);
            toast(err?.message || "Something went wrong.!");
        });
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
                        <h3 className={styles.boxdivh3}>Enter URL</h3>
                        <button onClick={handleClose} className={styles.crossbtn}>X</button>
                    </div>

                    <div className={styles.Linkdiv}>

                        <div className={styles.Linkdivd1}>
                            <p>Url</p>
                            <input type='text' name='url' onChange={onhandelLink} />

                            <p>Description</p>
                            <input type='text' name='description' onChange={onhandelLink} />

                            <button className={styles.Linkdivbtn} onClick={saveLink}>Upload Link</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default LinkBtn;
