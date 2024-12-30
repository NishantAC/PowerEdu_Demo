import React,{useEffect, useState} from 'react';
import './Calendar.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styles from './ToDoModal.module.css'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import TodoService from '../../../services/todo.service';
import { useSelector } from 'react-redux';


function ToDoModal({ setTask, task, edit, handleOpen, handleClose, open, view }) {    
    const user_id = useSelector((state) => state.user.user.id);

    const [openClndr, setOpenclndr] = useState(false);
    const openclndr = () => setOpenclndr(true);
    const closeclndr = () => setOpenclndr(false)
    const [task_name, setTaskName] = useState('');
    const [task_description, setTask_description] = useState('');
    const [priority, setPriority] = useState('');
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (edit) {
            setTaskName(edit.task_name || '');
            setTask_description(edit.task_description || '');
            setPriority(edit.priority || '');
            setDate(edit.date ? new Date(edit.date) : new Date());
        }
    }, [edit]);

    const resetTodoForm = () => {
        setTaskName('');
        setTask_description('');
        setPriority('');
        setDate(new Date());
    }
    
    
    const createTodo = async () => {
        const res = await TodoService.createTodo({ task_name, task_description, priority, date, user_id });
        setTask([...task, res]);
        closeclndr();      
        resetTodoForm();
        handleClose();
    }

    const editTodo = async () => {
        const updatedTask = {
            id: edit.id,
            task_name,
            task_description,
            priority,
            date,
            user_id,
        };

        try {
            // Send the update request to the server using TodoService or your API handler
            const res = await TodoService.updateTodo(updatedTask);

            if (res && res.updatedTodo) {
                // Update the task in the 'task' array using the received updated todo from the server
                setTask(task =>
                    task.map(t =>
                        t.id === edit.id ? res.updatedTodo : t
                    )
                );
                closeclndr();
                handleClose()
                resetTodoForm()
            } else {
                // Handle error or show a message if update was not successful
                handleClose()

                resetTodoForm()
            }
        } catch (error) {
            // Handle the error if the API request fails
            console.error('Error updating task:', error);
            resetTodoForm();
            handleClose()

            // Optionally, display an error message to the user
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.boxstyle}>
                    <div style={{display:'flex',padding:'0'}}>
                        <h4>To Do List</h4>
                        <button className={styles.modalbutton} onClick={handleClose}>X</button>
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <label className={styles.label}>Task Name</label>
                        <input disabled={view} type="text" className={styles.input1} value={task_name} onChange={(e)=>setTaskName(e.target.value)} />
                        <label className={styles.label}>Task Description</label>
                        <textarea disabled={view} type="text" className={styles.input2} value={task_description} onChange={(e) => setTask_description(e.target.value)} />
                    </div>
                    <div style={{widht:'100%',margin:'auto',display:'flex'}}>
                        <button disabled={view} className={styles.prioritybtn} onClick={() => setPriority("high")} >High</button>
                        <button disabled={view} className={styles.prioritybtn} onClick={() => setPriority("medium")}>Medium</button>
                        <button disabled={view} className={styles.prioritybtn} onClick={() => setPriority("low")}>Low</button>
                    </div>
                    <div style={{width:'70%',margin:'auto',marginTop:'30px'}}>
                        {!view && <button type="submit" className={styles.addbtn} onClick={openclndr}>Add to Calendar</button>}
                    </div>
                    
                </Box>
            </Modal>
            <Modal
        open={openClndr}
        onClose={closeclndr}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box className="boxstyle">
            <div style={{display:'flex',padding:'0'}}>
                <h4 style={{color: 'rgba(0, 0, 0, 0.55)',margin:'auto',width:'100%',textAlign:'center'}}>Calendar</h4>
                <button className={styles.modalbutton} onClick={closeclndr}>X</button>
            </div>
            <div>
            {/* <Calendar onChange={onChange} value={value} /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker className={styles.clndr}
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    value={date}
                    onChange={(newValue) => {
                    setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            </div>
                    <div style={{ width: '70%', margin: 'auto', marginTop: '30px' }}>
                        <button type="submit" className={styles.addbtn} onClick={edit ? editTodo : createTodo}>Save</button>
            </div>
        </Box>
    </Modal>
        </div>
    )
}

export default ToDoModal
