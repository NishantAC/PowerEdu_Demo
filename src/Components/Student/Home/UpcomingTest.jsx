import React, { useEffect, useState } from 'react';
import ClassTestService from '../../../services/classtest.service';
import './UpcomingTest.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { bgcolor } from '@mui/system';

const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          width: '80%',
          maxHeight: 435,
        },
      },
    },
  },
});

const CloseButton = styled(Button)({
  position: 'absolute',
  top: 5,
  right: 5,
});

export default function UpcomingTest({ currentUser }) {
  const [open, setOpen] = React.useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const handleClickOpen = (test) => {
    setSelectedTest(test);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [test, setTest] = useState([]);

  useEffect(() => {
    const { classid: class_id } = currentUser;
    if (class_id) {
      ClassTestService.getUpcomingTest({ class_id: class_id })
        .then((res) => {
          setTest(res);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser]);

  return (
    <ThemeProvider theme={theme}>
      <div className="upcoming">
        <div className="upcomingdiv">
          <div className="upcdd1">
            <span>Upcoming Test</span>
          </div>
          <div className="upcdd2">
            {test?.map((t) => (
              <div key={t.id} className="upcdd2div" onClick={() => handleClickOpen(t)}>
                <div className="headingdiv">

                <h4 >
                  {t?.testdesc}
                </h4>
                <h6 style={{ float: 'right' }}>
                  {moment(t?.examdate).format('DD-MM-YYYY')}
                </h6>
                </div>
                <p>{t?.syllabus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <h4>
            {selectedTest?.testdesc}
            <h6>
              
            </h6>
          </h4>
        </DialogTitle>
        <CloseButton onClick={handleClose}><CloseIcon color='action'/></CloseButton>
        <DialogContent className="DialogContent">
          <DialogContentText>
            <p>{selectedTest?.syllabus}</p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
