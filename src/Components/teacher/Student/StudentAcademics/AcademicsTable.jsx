import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: 250
};

function AcademicsTable({data}) {
    const [ record , setRecord] = useState({})
    const [ isPopupOpen , setIsPopupOpen] = useState(false)

    const handleViewMarks = (academic) => {
        setRecord(academic)
        setIsPopupOpen(true)
    }

    return (
        <div>
            <div style={{overflowX:'hidden',overflowY:'auto',height:'385px'}}>
                <TableContainer component={Paper} >
                    <Table aria-label="simple table" >
                        <TableHead>
                            <TableRow style={{padding: '10px 14px',height:'70px', border:'2px solid #A4A4A4', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)'}}>
                                <TableCell style={{fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', textAlign:'left',paddingTop:'10px',paddingBottom:'5px' }}>S.No.</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px',  color: '#545454', borderBottom: 'none',paddingTop:'10px',paddingBottom:'5px' }}>Academic Year</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px',  color: '#545454', borderBottom: 'none',paddingTop:'10px',paddingBottom:'5px' }}>Class</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px',  color: '#545454', borderBottom: 'none',paddingTop:'10px',paddingBottom:'5px' }}>Exam Type</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px',  color: '#545454', borderBottom: 'none',paddingTop:'10px',paddingBottom:'5px' }}>Subject</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px',  color: '#545454', borderBottom: 'none',paddingTop:'10px',paddingBottom:'5px' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{border:'1px solid #A5A5A5',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius:'5px',overflowY:'auto'}}>
                            {data.map((academic, index) => (
                                <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={{padding:'0px 14px'}}
                                >
                                <TableCell style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000', textAlign:'left',paddingTop:'22px' }}>
                                    {++index}
                                </TableCell>
                                <TableCell align="left" style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000'}}>{academic.acedemicYear}</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000'}}>{academic.class}</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000'}}>{academic.examType}</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000'}}>{academic.subject}</TableCell>
                                <TableCell align="left" style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', color: '#000000',paddingTop:'0px',paddingBottom:'0px'}}>
                                    <button onClick={() => handleViewMarks(academic)} style={{backgroundColor:'#9F8FFF',color:'white',border:'none',padding:'8px 12px'}}>View Marks</button>
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    isPopupOpen &&
                    <Box sx={style}>
                    <div class="d-flex pb-3">
                        <div onClick={() => setIsPopupOpen(false)} class="ml-auto cursor-pointer">
                            <CancelIcon style={{ fontSize: 30, color: '#ff2934' }} />
                        </div>
                    </div>
                    <TableContainer component={Paper} >
                        <Table aria-label="simple table" >
                            <TableHead>
                                <TableRow style={{padding: '10px 14px',height:'70px', border:'2px solid #A4A4A4', background: 'linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)'}}>
                                    <TableCell style={{fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', textAlign:'left',paddingTop:'10px',paddingBottom:'5px' }}>Total Marks</TableCell>
                                    <TableCell align="left" style={{fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px',  color: '#545454', borderBottom: 'none',paddingTop:'10px',paddingBottom:'5px' }}>Obtained Marks</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{border:'1px solid #A5A5A5',boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',borderRadius:'5px',overflowY:'auto'}}>
                                <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={{padding:'0px 14px'}}
                                >
                                <TableCell style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000', textAlign:'left',paddingTop:'22px' }}>
                                    {record.total_marks}
                                </TableCell>
                                <TableCell align="left" style={{fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000'}}>{record.marks_obtained ? record.marks_obtained : 'NA'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                }
                
            </div>
        </div>
    )
}

export default AcademicsTable
