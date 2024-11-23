import React, { useState, useRef } from 'react';
import './AssignTable.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckStatus from './CheckStatus';
import UploadAssign from '../UploadAssign/UploadAssign';
import AssignmentService from '../../../../services/assignment.service';
import DeleteModal from './DeleteModal';
import '../TeacherAssignment.css'
import Upload from '../UploadAssign/Upload';
import { minWidth } from '@mui/system';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function AssignTable(props) {

    const school_code = useSelector((state) => state.user.user?.schoolcode);

    const [open, setOpen] = React.useState(false);
    const [checkbox, setCheckbox] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);
    const assignmentId = useRef(null);

    const handleClose = () => {
        resetCheckStatus();
    }

    const openCheckStatus = async (class_code, status, id) => {

        if (status === "pending" || status === null) {
            return;
        }
        const updatedUsers = [];
        let checkedLength = 0;
        const data = await AssignmentService.getStudentsForEachAssignment({ school_code, class_code });
        data?.forEach((u) => {
            if (ifSubmitted(status, u.userid) === true) {
                updatedUsers.push({ ...u, checked: true });
                checkedLength += 1;
            } else {
                updatedUsers.push({ ...u, checked: false });
            }
        });
        if (checkedLength === updatedUsers.length) {
            // setAllSubmitted(true);
            setCheckedAll(true)
        }
        assignmentId.current = id;
        setCheckbox(updatedUsers);
        setOpen(true);
    }

    //check if user submitted the assignment
    const ifSubmitted = (status, userId) => {
        if (status?.[userId] === "Submitted") {
            return true;
        } else {
            return false;
        }
    }

    const checkAll = (users) => {
        const updatedUsers = [];
        users.forEach((u) => {
            updatedUsers.push({ ...u, checked: !checkedAll });
        });
        setCheckbox(updatedUsers);
        setCheckedAll(!checkedAll);
    }

    const checkOne = (e) => {
        const newCheckbox = [];
        checkbox.forEach((ch) => {
            if (Number(ch.userid) === Number(e.target.value)) {
                newCheckbox.push({ ...ch, checked: !ch.checked });
            } else {
                newCheckbox.push(ch);
            }
        });
        setCheckedAll(false);
        setCheckbox(newCheckbox);
    }

    const updStdAssStatus = () => {
        let status = {};
        checkbox.forEach((ch) => {
            if (ch.checked) {
                status[ch.userid] = "Submitted";
            } else {
                status[ch.userid] = "Not Submitted"
            }
        });
        console.table(status)
        const body = { "assignmentId": assignmentId.current, status: status };
        AssignmentService.updateAssignmentStatus(body).then((res) => {
            resetCheckStatus();
            toast.success(res.message);
            props?.initialData();
        }).catch(err => console.error("Problem in AssignTable :: updateAssignmentStatus() => ", err));
    }

    const resetCheckStatus = () => {
        setCheckbox([]);
        setCheckedAll(false);
        assignmentId.current = null;
        setOpen(false);
    }

    //check if all submitted
    const checkIfAllSubmitted = ({ class_code, status, id }) => {
        let All = true;

        if (status === "pending" || status === null) {
            All = false;
        }

        if (status && typeof status === 'object') {
            const statusValues = Object.values(status);
            if (statusValues.includes("Not Submitted")) {
                All = false;
            }
        }

        if (All) {
            return <button className="status1">Submitted</button>;
        } else {
            return (
                <button onClick={() => { openCheckStatus(class_code, status, id) }} className="status2">
                    Check Status
                </button>
            );
        }
    };

    return (
        <>
            <TableContainer className='TCont'>
                <Table aria-label="customized table">
                    <TableHead className='Trow'>
                        <TableRow >
                            <TableCell className='TtabCell'>S no.</TableCell>
                            <TableCell className='TtabCell'>Subject</TableCell>
                            <TableCell className='TtabCell'>Assignment Info</TableCell>
                            <TableCell className='TtabCell'>Assigned Date</TableCell>
                            <TableCell className='TtabCell'>Submit Date</TableCell>
                            <TableCell className='TtabCell'>Status</TableCell>
                            <TableCell className='TtabCell'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='Tbody'>
                        {
                            props?.data?.map((d, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className='Trow2'
                                >
                                    <TableCell className='TtabCell2'>
                                        {index + 1 + "."}
                                    </TableCell>
                                    <TableCell align="left" className='TtabCell2'>{d?.subject.subject_name}</TableCell>
                                    <TableCell align="left" className='TtabCell2'>{d?.description}</TableCell>
                                    <TableCell align="left" className='TtabCell2'>{d?.duration.assigndate}</TableCell>
                                    <TableCell align="left" className='TtabCell2'>{d?.duration.duedate}</TableCell>
                                    <TableCell align="left" className='TtabCell2'>
                                        {/* {
                                                { users: d?.users, status: row.status, assignmentId: row.id */}
                                        {checkIfAllSubmitted({ class_code: d.class_code, status: d.status, id: d.id })}
                                    </TableCell>
                                    <TableCell align="left" className='TtabCell2'>
                                        <div className="actionbtns">
                                            <Upload Tdata={d} />
                                            <DeleteModal initialData={props.initialData} id={d.id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {open &&
                <CheckStatus checkbox={checkbox} open={open} checkedAll={checkedAll}
                    handleClose={handleClose} checkAll={checkAll} checkOne={checkOne} updStdAssStatus={updStdAssStatus} />}
        </>
    )
}

export default AssignTable
