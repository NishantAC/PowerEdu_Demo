import React, { useEffect, useState } from 'react';
import './ToDo.css';
import ToDoModal from './ToDoModal';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TodoService from '../../../services/todo.service';
import { useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


function ToDo() {
  const [editInfo, setEditInfo] = useState();
  const [view, setView] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetEditAndView();
  }

  const userId = useSelector((state) => state.user.user?.id);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClose = () => setAnchorEl(null);
  const handleClick = (event, row) => {
    setEditInfo(row); // Set the selected row for editing
    setAnchorEl(event.currentTarget);
  };
  const [task, setTask] = useState([]);

  // 

  const handleEditClick = () => {
    handleOpen()
    handleMenuClose()
  }

  const handleViewClick = () => {
    setView(true);
    handleOpen()
    handleMenuClose()
  }

  const handleDelete = () => {
    handleMenuClose();
    TodoService.deleteTodo(editInfo.id).then((res) => {
      setTask(task.filter((f) => f.id !== editInfo.id));
      resetEditAndView();
    })
  }

  const fetchTasks = () => {
    TodoService.getTodos(userId).then(res => {
      setTask(res);
    })
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const resetEditAndView = () => {
    setEditInfo(null)
    setView(false)
  }

  return (
    <div className="todo">
      <div style={{ backgroundColor: "#F9F9F9", height: "50px", alignItems: "center", width: "100%", position: "sticky", top: 0, zIndex: 1 }}>
        <div className="todoheader">
          <span style={{ fontFamily: "sans-serif", fontStyle: "normal", fontWeight: "600", fontSize: "20px" }}>To Do List</span>
          <button onClick={resetEditAndView}><p onClick={handleOpen} style={{ margin: '0px' }}>+</p></button>
          <ToDoModal open={open} setTask={setTask} task={task} edit={editInfo} handleOpen={handleOpen} handleClose={handleClose} view={view} />
        </div>
      </div>
      <div className="todo-body" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        {task.map((row) => (
          <div key={row.id} style={{ backgroundColor: '#FDFDFD', margin: '8px 10px', padding: '10px 5px', borderTop: '1px solid #959595', borderBottom: '1px solid #959595', borderRight: '1px solid #959595', borderLeft: '6px solid #FF6767' }}>
            <div style={{ display: 'flex', marginBottom: '-8px' }}>
              <h5 style={{ marginTop: '1px' }}>{row.task_name}</h5>
              <p style={{ marginLeft: 'auto', marginTop: '1px', fontSize: '14px' }}>{row.date}</p>
              <button style={{ padding: '0', border: 'none', background: 'transparent', height: '8px', width: '15px' }} onClick={(event) => handleClick(event, row)}><MoreVertIcon /></button>
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}>
                <MenuItem ><span onClick={handleViewClick}><VisibilityOutlinedIcon />View</span></MenuItem>
                <MenuItem><span onClick={handleEditClick}><EditOutlinedIcon />Edit</span></MenuItem>
                <MenuItem ><span onClick={handleDelete}><DeleteForeverOutlinedIcon />Delete</span></MenuItem>

              </Menu>
            </div>
            <span style={{ fontSize: '14px' }}>{row.task_description}</span>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default ToDo;
