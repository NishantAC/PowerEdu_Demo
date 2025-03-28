import { Box, Modal } from '@mui/material';
import ExcelJS from 'exceljs';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: 300
};


function DownloadSheet({open, handleClose, tableData}) {

    const downloadExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Sheet1');
        let sheetData = tableData;
        let includeHeaders = false;
    
        // Check if the tableData is empty
        if (tableData.length === 0) {
            // Set the headers manually when tableData is empty
            sheetData = [
                { user_id: "", rollno: "", studentname: "", marks_obtained: "", grade: "" }
            ];
            includeHeaders = true;
        }
    
        // Add headers if required
        if (includeHeaders) {
            sheet.columns = [
                { header: 'User ID', key: 'user_id' },
                { header: 'Roll No', key: 'rollno' },
                { header: 'Student Name', key: 'studentname' },
                { header: 'Marks Obtained', key: 'marks_obtained' },
                { header: 'Grade', key: 'grade' }
            ];
        }
    
        sheet.addRows(sheetData);
    
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'marks.xlsx';
        link.click();
        handleClose();
    };
      
      const downloadCSV = () => {
        const data = tableData.length === 0 ? [{ rollno: "", studentname: "", totalmarks: "", marks_obtained: "", grade: "" }] : tableData;
        
        const csvData = XLSX.utils.sheet_to_csv(XLSX.utils.json_to_sheet(data));
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'marks.csv'); 
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        handleClose();
      };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
              <div style={{ display: 'flex' }}>
                  <h5 style={{ marginTop: '0px' }}>Download</h5>
                  <button onClick={handleClose} className="crossbtn">X</button>
              </div>
              <p style={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: '18px', color: '#494949', textAlign: 'center', marginTop: '20px' }}>
                  Download Sheet
              </p>
              <br />
              <Box display={'flex'} justifyContent='space-evenly' >
                  <button onClick={downloadExcel} style={{border:'none', background:'transparent'}}><img style={{height:'90px', width:'90px'}} src="https://i.ibb.co/6nc250h/excel.png" alt="excel" border="0"/></button>
                  <button onClick={downloadCSV} style={{border:'none', background:'transparent'}}><img style={{height:'90px', width:'90px'}} src="https://i.ibb.co/QkCBtXY/csv.png" alt="csv" border="0"/></button>
              </Box>
            </Box>
        </Modal>
    )
}

export default DownloadSheet;