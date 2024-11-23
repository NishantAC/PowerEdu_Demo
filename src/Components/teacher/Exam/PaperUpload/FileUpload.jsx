import React from 'react';
import './UploadPaper.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 315,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 2,
};

function FileUpload({ paper, setPaper }) {
  const [open, setOpen] = React.useState(false);
  const [fileName, setFileName] = React.useState(''); // Added state for filename

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setPaper(selectedFile);

    if (selectedFile) {
      setFileName(selectedFile.name);
    } else {
      setFileName('');
    }
  };

  const uploadPrompt = !paper ? (
    <div style={{ textAlign: 'center', color: 'red' }}>Please upload a file.</div>
  ) : null;

  return (
    <div className="uploadfile">
      <button style={{ margin: '5px', width: '97%' }} onClick={handleOpen}>
        Upload Paper
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ border: '1px dashed #C5C5C5', textAlign: 'center' }}>
            <CloudUploadRoundedIcon
              style={{ height: '80px', width: '80px', color: '#00a3cc' }}
            />
            <br />
            <label>
              <input
                type="file"
                className="fileinput"
                onChange={handleFileChange}
                accept=".pdf"
                title=" "
              />
              <span style={{ color: '#00a3cc', cursor: 'pointer' }}>
                Select
              </span>{' '}
              file from your device
            </label>
            <br />
            <br />
            {uploadPrompt}
            {fileName && <span>{fileName}</span>}
            <br />
            <span style={{ fontSize: '12px' }}>File should be in .pdf format</span>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default FileUpload;
