import { useState } from 'react';
import { Modal, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { addExamType } from '../../../../slices/examtype';
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: 'background.paper',
  //   border: '2px solid #000',
  boxShadow: 24,
  px: 4,
  py: 2
};

function AddNewExamForm({ classid }) {
  const [examName, setExamName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { value } = event.target;
    setExamName(value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!classid) {
      toast.error('Please select the class first', { autoClose: 1000, position: 'bottom-right' })
      return
    }
    // dispatch(addExamType({schoolcode: user?.schoolcode, classid, title: examName}))
    // setExamName('');
    setShowConfirmation(true);
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setExamName('');
  };

  const handleConfirmSave = () => {
    dispatch(addExamType({ school_code: user?.schoolcode, class_code: classid, title: examName }))
    setExamName('');
    setShowConfirmation(false);
  };

  const handleCloseConfirmation = () => {
    // Close the confirmation dialog
    setShowConfirmation(false);
  };


  return (
    <>
      <button className="add-new-exam-tile" onClick={handleOpenModal}>
        <span className="plus-symbol">+</span>
        <span className="title">Add New Exam</span>
      </button>

      <Dialog open={showConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <p>{`Saving New Exam for Class ${classid}`}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Modal open={showModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h5 style={{ marginTop: '10px' }}>Add New Exam</h5>
            <button onClick={handleCloseModal} className="crossbtn">X</button>
          </div>
          <form onSubmit={handleSave}>
            <p style={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: '18px', color: '#494949', textAlign: 'center', marginTop: '20px' }}>
              Exam Name
            </p>
            <input
              type="text"
              value={examName}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #A4A4A4' }}
            />
            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                fullWidth
                color="success"
                type='submit'
                disabled={!examName}
              >
                Add Exam
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default AddNewExamForm;
