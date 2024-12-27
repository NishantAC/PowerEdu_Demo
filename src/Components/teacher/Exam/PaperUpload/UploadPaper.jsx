import React, { useEffect, useState } from "react";
import "./UploadPaper.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileUpload from "./FileUpload";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchExamTypes } from "../../../../slices/examtype";
import { getCurrentTeacherData } from "../../../../slices/subjectteacher";
import { getAllSubjectsBySchool } from "../../../../slices/subject";
import { addPaper } from "../../../../slices/questionpaper";
import { toast } from 'sonner';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  px: 3,
  py: 2,
};

function UploadPaper() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false) & clearState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { examTypes } = useSelector((state) => state.examtype);
  const { subject } = useSelector((state) => state.subject);
  const { currentteacher } = useSelector((state) => state.subjectteacher);
  // console.log(examTypes);
  useEffect(() => {
    dispatch(fetchExamTypes({ schoolcode: user?.schoolcode }));
    dispatch(getCurrentTeacherData({ userId: user?.id }));
    dispatch(getAllSubjectsBySchool({ schoolcode: user?.schoolcode }));
  }, []);

  const [classid, setClassid] = useState("");
  const [examtype, setExamtype] = useState("");
  const [subjectname, setSubjectname] = useState("");
  const [paper, setPaper] = useState("");
  const [error, setError] = useState("");

  const clearState = () => {
    setClassid("")
    setSubjectname("")
    setExamtype("")
    setPaper("")
  }

  const handleSubmit = () => {
    if (!classid) {
      setError("Please select class");
      return
    }
    if (!subjectname) {
      setError("Please select subject");
      return
    }
    if (!examtype) {
      setError("Please select exam type");
      return
    }
    if (!paper) {
      setError("Please upload question paper");
      return
    }
    dispatch(
      addPaper({
        schoolcode: user?.schoolcode,
        classid,
        examtype,
        subject: subjectname,
        academicyear: "2022-2023",
        paperFile: paper,
        createdby: user?.firstname,
      })
    )
    clearState()
    toast.success("Paper added succesfully", {  position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
    handleClose()
  };

  return (
    <div className="paperupload">
      <button onClick={handleOpen}>
        <FileUploadOutlinedIcon
          style={{ verticalAlign: "middle", marginRight: "8px" }}
        />
        Upload Paper
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex" }}>
            <h3 style={{ marginTop: "0px" }}>Upload Question Papers</h3>
            <button onClick={handleClose} className="crossbtn">
              X
            </button>
          </div>
          <div
            className="uploadmodald22"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label style={{ margin: "auto", marginLeft: "10px" }}>Class</label>
            <FormControl sx={{ m: 1, minWidth: 210 }} size="small">
              <Select
                value={classid}
                onChange={(e) => setClassid(e.target.value)}
              >
                {currentteacher?.classes?.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <label style={{ margin: "auto", marginLeft: "10px" }}>
              Subject
            </label>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <Select
                value={subjectname}
                onChange={(e) => setSubjectname(e.target.value)}
              >
                {subject?.map((s) => (
                  <MenuItem key={s.id} value={s.subjectname}>
                    {s.subjectname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <label>Year</label>
                        <FormControl sx={{ m: 1, minWidth: 200 }} size='small'>
                            <Select>
                                <MenuItem value={2022}>2022</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2020}>2020</MenuItem>
                            </Select>
                        </FormControl> */}
            <label style={{ margin: "auto", marginLeft: "10px" }}>
              Exam Type
            </label>
            <FormControl sx={{ m: 1, mb: 2, minWidth: 200 }} size="small">
              <Select
                value={examtype}
                onChange={(e) => setExamtype(e.target.value)}
              >
                {examTypes?.map((type) => (
                  <MenuItem key={type.id} value={type.title}>
                    {type.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {paper && (
              <p
                style={{
                  margin: "auto",
                  padding: "4px 2px",
                  color: "green",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {paper.name}
              </p>
            )}
            {error && (
              <p
                style={{
                  margin: "auto",
                  padding: "2px",
                  color: "red",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
              >
                {error}
              </p>
            )}
            <FileUpload paper={paper} setPaper={setPaper} />
            <button
              style={{
                background: "  #3CB532",
                margin: "5px",
                padding: "8px 15px",
                color: "white",
                border: "none",
                cursor: "pointer",
                marginBottom: "20px",
              }}
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default UploadPaper;
