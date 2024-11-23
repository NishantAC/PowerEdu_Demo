import React, { useEffect, useState } from 'react';
import AddTodoModal from './AddTodoModal';
import './TodoList.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import TodoService from '../../../../services/todo.service';
import moment from 'moment';

function createData(sno, taskname, date, taskdesc) {
    return {sno, taskname, date, taskdesc };
  }
  
//   const rows = [
//     createData('1','Attend Teacher Meet', '13-8-2021', 'Marking Answer for class test of 7B' ),
//     createData('2','Prepare Exam Schedule', '13-8-2021', 'Marking Answer for class test of 7B' ),
//     createData('3','Announce Event', '13-8-2021', 'Marking Answer for class test of 7B' ),
//     createData('4','Attend Teacher Meet', '13-8-2021', 'Marking Answer for class test of 7B' ),
//     createData('5','Prepare Exam Schedule', '13-8-2021', 'Marking Answer for class test of 7B' ),
//     createData('6','Announce Event', '13-8-2021', 'Marking Answer for class test of 7B' ),
//   ];

function TodoList() {
    const {user} = useSelector(state => state.user)
    const [rows, setRows] = useState([])
    useEffect(() => {
        TodoService.getTodos(user.id).then(res => setRows(res))
    }, [user])
    return (
        <div className="prncpltodo">
            <div className="prncpltodoheader">
                <span style = {{ fontFamily: "sans-serif", fontStyle: "normal", fontWeight: "600", fontSize: "20px"}}>To Do List</span>
                <button>{<AddTodoModal setRows={setRows} />}</button>
            </div>
            <div className="prncpltodo-body">
            {rows.map((row)=>(
                <div key={row.id} style={{backgroundColor:'#FDFDFD', margin:'8px 10px',padding:'10px 5px',borderTop:'1px solid #959595',borderBottom:'1px solid #959595',borderRight:'1px solid #959595', borderLeft:'6px solid #FF6767'}}>
                    <div style={{display:'flex',marginBottom:'-8px'}}>
                        <h5 style={{marginTop:'1px'}}>{row.task_name}</h5>
                        <p style={{marginLeft:'auto',marginTop:'1px',fontSize:'14px'}}>{moment(row.due_date).format('DD-MM-YYYY')}</p>
                        <button style={{padding:'0',border:'none',background:'transparent',height:'8px',width:'15px'}}><MoreVertIcon/></button>
                    </div>
                    <span style={{fontSize:'14px'}}>{row.task_description}</span>
                </div>
            ))}
            </div>
        </div>
    )
}

export default TodoList
