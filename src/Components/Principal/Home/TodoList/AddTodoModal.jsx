import React,{useState} from 'react';
import '../../../teacher/Home/Calendar.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './AddTodoModal.module.css'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useSelector } from 'react-redux';
import CalendarModal from '../Calendar/CalendarModal';
import TodoService from '../../../../services/todo.service';

function AddTodoModal({setRows}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {user} = useSelector(state => state.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')
    const [value, setValue] = useState(new Date());
    const [openClndr, setOpenclndr] = useState(false);
    const openclndr = () => setOpenclndr(true) & handleClose();
    const closeclndr = () => setOpenclndr(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const todoData = {
          task_name: title,
          task_description: description,
          due_date: value,
          priority: priority, // Ensure priority is passed correctly as a string
          added_by: user.id
        };
        TodoService.createTodo(todoData).then(res => {
          setRows(prev => [...prev, res]);
          closeclndr();
        }).catch(err => 
            console.error(err)
        );
      };

    return (
        <div>
            <p onClick={handleOpen} style={{margin:'0px'}}>+</p>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.boxstyle}>
                    <div style={{display:'flex',padding:'0',alignItems: 'center',justifyContent:'space-between'}}>
                        <h4>To Do List</h4>
                        <button className={styles.modalbutton} onClick={handleClose}>X</button>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <label className={styles.label}>Task Name</label>
                        <input type="text" className={styles.input1} value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <label className={styles.label}>Task Description</label>
                        <textarea type="text" className={styles.input2} value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div style={{widht:'100%',display:'flex'}}>
                        <button className={styles.prioritybtn} onClick={() => setPriority('high')}>High</button>
                        <button className={styles.prioritybtn} onClick={() => setPriority('medium')}>Medium</button>
                        <button className={styles.prioritybtn} onClick={() => setPriority('low')}>Low</button>
                    </div>
                    <div style={{width:'70%',margin:'auto'}}>
                        <button type="submit" className={styles.addbtn} onClick={openclndr}>Add to Calendar</button>
                    </div>
                    </div>
                </Box>
            </Modal>
            <CalendarModal open={openClndr} onClose={closeclndr} value={value} onChange={setValue} onSave={handleSubmit} />
        </div>
    )
}

export default AddTodoModal
