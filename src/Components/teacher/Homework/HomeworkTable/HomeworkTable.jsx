import React, { memo, useState } from 'react';
import './HomeworkTable.css'
import '../TeacherHomework.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UploadHomework from '../UploadHomework/UploadHomework';
import DeleteModal from './DeleteModal';
import View from '../View';

function createData(sno, subject, assigninfo, assigndate, submitdate, status, action) {
    return { sno, subject, assigninfo, assigndate, submitdate, status, action };
}

const rows = [
    createData('1.', 'Science', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', '13-8-2021', '23-8-2021', 'Uploaded'),
    createData('2.', 'Science', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', '13-8-2021', '23-8-2021', 'Uploaded'),
    createData('3.', 'Science', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ', '13-8-2021', '23-8-2021', 'Uploaded'),
];
function HomeworkTable(props) {

    const [modalOpen, setModalOpen] = useState(false);
    const handleModalClose = () => setModalOpen(false);

    return (
        <>
            <TableContainer className='TCont'>
                <Table aria-label="customized table">
                    <TableHead className='Trow'>
                        <TableRow >
                            <TableCell className='TtabCell'>S no.</TableCell>
                            <TableCell className='TtabCell'>Subject</TableCell>
                            <TableCell className='TtabCell'>Homework Info</TableCell>
                            <TableCell className='TtabCell'>Assigned Date</TableCell>
                            {/* <TableCell className='TtabCell'>Status</TableCell> */}
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
                                    <TableCell align="left" className='TtabCell2'>{d?.homework_desc}</TableCell>
                                    <TableCell align="left" className='TtabCell2'>{d?.homework_date}</TableCell>
                                    {/* <TableCell align="left" className='TtabCell2'>
                                        {checkIfAllSubmitted({ data: d.students, status: d.status, id: d.id })}
                                    </TableCell> */}
                                    <TableCell align="left" className='TtabCell2'>
                                        <div className="actionbtns">
                                            <View Tdata={d} />
                                            <DeleteModal id={d.id} initialData={props.initialData} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {/* {open &&
                <CheckStatus checkbox={checkbox} open={open} checkedAll={checkedAll}
                    handleClose={handleClose} checkAll={checkAll} checkOne={checkOne} updStdAssStatus={updStdAssStatus} />} */}
        </>



        // <div>
        //     <TableContainer component={Paper}>
        //         <Table aria-label="simple table" >
        //             <TableHead>
        //                 <TableRow style={{ paddingLeft: '10px', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)', border: '2px solid #A4A4A4', boxSizing: 'border-box', borderRadius: '5px' }}>
        //                     <TableCell style={{ paddingTop: '20px', paddingBottom: '20px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', textAlign: 'left', width: '6%' }}>S no.</TableCell>
        //                     <TableCell align="left" style={{ paddingTop: '20px', paddingBottom: '20px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none' }}>Subject</TableCell>
        //                     <TableCell align="left" style={{ paddingTop: '20px', paddingBottom: '20px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none' }}>Homework Info</TableCell>
        //                     <TableCell align="left" style={{ paddingTop: '20px', paddingBottom: '20px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none' }}>Assigned Date</TableCell>
        //                     <TableCell align="left" style={{ paddingTop: '20px', paddingBottom: '20px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none' }}>Action</TableCell>
        //                 </TableRow>
        //             </TableHead>
        //             {console.log(props)}
        //             <TableBody style={{ background: '#FFFFFF', border: '1px solid #A5A5A5', boxSizing: 'border-box', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: '5px' }}>
        //                 {
        //                     props?.data?.map((ass, index) => (
        //                         <TableRow
        //                             key={index}
        //                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        //                             style={{ paddingLeft: '10px' }}
        //                         >
        //                             <TableCell style={{ paddingTop: '16px', paddingBottom: '16px', flex: '0.05', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '18px', color: '#000000', textAlign: 'left' }}>
        //                                 {(index + 1) + "."}
        //                             </TableCell>
        //                             <TableCell align="left" style={{ paddingTop: '16px', paddingBottom: '16px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '18px', color: '#000000' }}>{ass?.subjectname}</TableCell>

        //                             {ass.class_homeworks?.map((row) =>
        //                             (<>
        //                                 <TableCell align="left" style={{ paddingTop: '16px', paddingBottom: '16px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '18px', color: '#000000' }}>{row?.homework_desc}</TableCell>
        //                                 <TableCell align="left" style={{ paddingTop: '16px', paddingBottom: '16px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '18px', color: '#000000' }}>{row?.homework_date
        //                                 }</TableCell>
        //                                 <TableCell align="left" style={{ paddingTop: '16px', paddingBottom: '16px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '18px', color: '#000000', margin: 'auto', width: '17%' }}>
        //                                     <div className="actionbtns">
        //                                         {/* <UploadHomework body={{ ...row, "className": d.classname, "subjectName": ass.subjectname }} /> */}
        //                                         <button className="assigndeletebtn" onClick={() => setModalOpen(true)}>Delete</button>
        //                                         <DeleteModal open={modalOpen} handleModalClose={handleModalClose} deleteHomework={props.deleteHomework} id={row.id} />
        //                                     </div>
        //                                 </TableCell>
        //                             </>))}
        //                         </TableRow>
        //                     ))}
        //             </TableBody>
        //         </Table>
        //     </TableContainer>
        // </div>
    )
}

export default memo(HomeworkTable);

