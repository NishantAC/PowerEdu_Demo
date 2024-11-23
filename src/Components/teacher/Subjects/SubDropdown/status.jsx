import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import styles from '../TeacherSubject.module.css';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useDispatch, useSelector } from 'react-redux';
import SubjectService from '../../../../services/subject.service';
import { toast } from 'react-toastify';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.css-ahj2mt-MuiTypography-root': {
      fontSize: '18px',
      fontWeight: '500',
      fontFamily: 'Lato',
      fontStyle: "normal",
      lineHeight: "22px",
      color: "#000000",
    }
  }),
);
function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
  /**
   * The value of the component.
   */
  value: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

//start
function Status({ classDropdownValue, chapter, getAssignedSubjects }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(chapter.status);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useSelector((state) => state.auth.user)
  // console.log(user)

  //handel radioChange
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  //update the status of chapter by class id
  const HandelStatus = () => {
    SubjectService.updateStatus(chapter.chapter_id, value, chapter.chapter_number).then((res) => {
      // props?.fetchNotices(props?.classIds);
      getAssignedSubjects(classDropdownValue);
      toast(res?.data?.message);
      handleClose();
    }).catch(err => {
      console.error("Problem in status :: updateStatus() => ", err);
      toast(err?.message || "Something went wrong.!");
    });
  }

  return (
    <div>
      <button onClick={handleOpen} className={styles.addnoticebtn}>
        <AddIcon style={{ verticalAlign: 'middle' }} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={styles.box}>
          <div className={styles.boxdiv}>
            <h3 className={styles.boxdivh3}>Update Status</h3>
            <button onClick={handleClose} className={styles.crossbtn}>X</button>
          </div>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <MyFormControlLabel value="To be Started" label="To be Started" control={<Radio style={{ color: value === "To be Started" && "#0D42CB" }} />} labelPlacement="start" className={styles.selectItem} />
            <MyFormControlLabel value="Ongoing" label="Ongoing" control={<Radio style={{ color: value === "Ongoing" && "#0D42CB" }} />} labelPlacement="start" className={styles.selectItem} />
            <MyFormControlLabel value="Completed" label="Completed" control={<Radio style={{ color: value === "Completed" && "#0D42CB" }} />} labelPlacement="start" className={styles.selectItem} />
          </RadioGroup>
          <button
            onClick={(e) => {
              HandelStatus(e)
            }}
            className={styles.save}>
            Save
          </button>

        </Box>
      </Modal>
    </div>
  )
}

export default Status;
