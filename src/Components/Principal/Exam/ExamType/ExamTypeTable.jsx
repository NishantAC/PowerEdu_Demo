import React, { useEffect, useState } from "react";
import "./ExamType.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "../../../teacher/Home/ToDoModal.module.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { Button, Checkbox, IconButton, TextField } from "@mui/material";
import ExamRow from "./ExamRow";
import { useDispatch, useSelector } from "react-redux";
import { addExam, fetchExams } from "../../../../slices/exam";
import { getAllSubjectsBySchool } from "../../../../slices/subject";
import AddNewExamRow from "./AddNewExamRow";
import { fetchSyllabusBySubject } from "../../../../slices/syllabus";
import moment from "moment";
import { toast } from "sonner";
import { clearMessage } from "../../../../slices/examtype";

function ExamTypeTable({ examtype, activeKey, copyData }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { dropdownClassSubjects } = useSelector((state) => state.subject);
  const Chapters = Array.from({ length: 20 }, (_, index) => index + 1); // chapters for syllabus modal


  const [tableData, setTableData] = useState(examtype.exams || []);
  useEffect(() => {
    setTableData(examtype.exams || []);
  }, [examtype]);

  const handleUpdate = (rowIndex, columnName, value) => {
    const updatedTableData = [...tableData];
    const updatedRow = { ...updatedTableData[rowIndex], [columnName]: value };
    updatedTableData[rowIndex] = updatedRow;
    setTableData(updatedTableData);
  };


  const [newRow, setNewRow] = useState(false);

  const [dateValue, setDateValue] = useState(new Date());
  const [calendar, setCalendar] = useState(false);
  const openClndr = () => setCalendar(true);
  const closeClndr = () => setCalendar(false);

  const [timevalue, setTimevalue] = useState(new Date());
  const [time, setTime] = useState(false);
  const openTime = () => setTime(true);
  const closeTime = () => setTime(false);

  const [endtimevalue, setEndTimevalue] = useState(new Date());
  const [endtime, setEndTime] = useState(false);
  const openEndTime = () => setEndTime(true) & setTime(false);
  const closeEndTime = () => setEndTime(false);

  const [syllabusModal, setSyllabusModal] = useState(false);
  const openSyllabus = () => setSyllabusModal(true);
  const closeSyllabus = () => setSyllabusModal(false);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [maxMarks, setMaxMarks] = useState("");
  const [passMarks, setPassMarks] = useState("");

  const handleSubmit = () => {
    // console.log({
    //   selectedSubject,
    //   selectedChapters,
    //   dateValue,
    //   timevalue,
    //   endtimevalue,
    //   maxMarks,
    //   passMarks,
    // });

    dispatch(
      addExam({
        school_code: examtype.school_code,
        class_code: examtype.class_code,
        examtypeid: examtype.id,
        subject_code: selectedSubjectId,
        syllabus: selectedChapters,
        date: dateValue,
        timing: { start: timevalue, end: endtimevalue },

        max_marks: maxMarks,
        passing_marks: passMarks,
      })
    ).then((result) => {
      if (result.payload) {
        // Dispatch succeeded, show success message
        toast.success(result.payload.message, {
          autoClose: 1000,
          position: "bottom-right",
        });
        dispatch(clearMessage());
      } else {
        // Dispatch failed, show error message
        toast.error(result.error.message, {
          autoClose: 1000,
          position: "bottom-right",
        });
        dispatch(clearError());
      }
    });
    clearState();
  };


  const clearState = () => {
    setNewRow(false);
    setSelectedChapters([]);
    setSelectedSubject("");
    setMaxMarks("");
    setPassMarks("");
  };

  const [editableColumns, setEditableColumns] = useState([]);

  const handleEditColumn = (columnName) => {
    if (editableColumns.includes(columnName)) {
      setEditableColumns(editableColumns.filter((col) => col !== columnName));
    } else {
      setEditableColumns([...editableColumns, columnName]);
    }
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        style={{ height: "300px", overflowX: "auto" }}
      >
        <Table stickyHeader sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                paddingLeft: "10px",
                background: "#3D628E",
                // border: "0px solid #CECECE",
                boxSizing: "border-box",
                borderRadius: "5px",
              }}
            >
              <TableCell
                align="start"
                style={{
                  border: "1px solid #CECECE",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fonstSize: "15px",
                  color: "white",
                  backgroundColor: "#3D628E",
                }}
              // width={40}
              >
                <div style={{ width: '40px', }}>
                  S No.
                </div>
              </TableCell>
              <TableCell
                align="center"
                style={{
                  border: "1px solid #CECECE",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fonstSize: "15px",
                  color: "white",
                  backgroundColor: "#3D628E",
                }}
              // width={90}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Subject Name
                  {/* <EditIcon
                  sx={{width: '16px'}}
                  color={editableColumns?.includes('subject') ? "info" : "default"}
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleEditColumn("subject")}
                /> */}
                </div>
              </TableCell>
              <TableCell
                align="center"
                style={{
                  border: "1px solid #CECECE",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fonstSize: "15px",
                  color: "white",
                  backgroundColor: "#3D628E",
                }}
              // width={150}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Syllabus
                  {/* <EditIcon
                  sx={{width: '16px'}}
                  color={editableColumns?.includes('syllabus') ? "info" : "default"}
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleEditColumn("syllabus")}
                /> */}
                </div>
              </TableCell>
              <TableCell
                align="center"
                style={{
                  border: "1px solid #CECECE",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fonstSize: "15px",
                  color: "white",
                  backgroundColor: "#3D628E",
                }}
              // width={120}
              >

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Exam Date
                  {/* <EditIcon
                  sx={{width: '16px'}}
                  color={editableColumns?.includes('examdate') ? "info" : "default"}
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleEditColumn("examdate")}
                /> */}
                </div>
              </TableCell>
              <TableCell
                align="center"
                style={{
                  border: "1px solid #CECECE",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fonstSize: "15px",
                  color: "white",
                  backgroundColor: "#3D628E",
                }}
              // width={90}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Exam Timing
                  {/* <EditIcon
                  sx={{width: '16px'}}
                  color={editableColumns?.includes('examtiming') ? "info" : "default"}
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleEditColumn("examtiming")}
                /> */}
                </div>
              </TableCell>
              <TableCell
                align="center"
                style={{
                  border: "1px solid #CECECE",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fonstSize: "15px",
                  color: "white",
                  backgroundColor: "#3D628E",
                }}
              // width={40}
              >
                <div style={{ width: '105px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Max Marks
                  {/* <EditIcon
                  sx={{width: '16px'}}
                  color={editableColumns?.includes('maxmarks') ? "info" : "default"}
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleEditColumn("maxmarks")}
                /> */}
                </div>
              </TableCell>
              <TableCell
                align="center"
                style={{
                  border: "1px solid #CECECE",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fonstSize: "15px",
                  color: "white",
                  backgroundColor: "#3D628E",
                }}
              // width={40}
              >
                <div style={{ width: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Pass Marks
                  {/* <EditIcon
                  sx={{width: '16px'}}
                  color={editableColumns?.includes('passmarks') ? "info" : "default"}
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleEditColumn("passmarks")}
                /> */}
                </div>
              </TableCell>
              {!copyData && <TableCell
                align="center"
                style={{
                  border: "1px solid #CECECE",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fonstSize: "15px",
                  color: "white",
                  backgroundColor: "#3D628E",
                }}
              // width={40}
              >
                <div style={{ width: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Action
                  {/* <EditIcon
                  sx={{width: '16px'}}
                  color={editableColumns?.includes('passmarks') ? "info" : "default"}
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => handleEditColumn("passmarks")}
                /> */}
                </div>
              </TableCell>}
            </TableRow>
          </TableHead>
          <TableBody
            style={{
              background: "#FFFFFF",
              border: "0.1rem solid #CECECE",
              boxSizing: "border-box",
              borderRadius: "5px",
            }}
          >
            {tableData?.map((row, index) => (
              <ExamRow
                copyData={copyData}
                key={index}
                sno={index + 1}
                subjects={dropdownClassSubjects}
                row={row}
                examtype={examtype}
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                selectedChapters={selectedChapters}
                setSelectedChapters={setSelectedChapters}
                openTime={openTime}
              />
            ))}
            {newRow && (
              <AddNewExamRow
                sno={tableData.length + 1}
                subjects={dropdownClassSubjects}
                examtype={examtype}
                openSyllabus={openSyllabus}
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                setSelectedSubjectId={setSelectedSubjectId}
                openTime={openTime}
                calendar={calendar}
                openClndr={openClndr}
                starttime={timevalue}
                endtime={endtimevalue}
                dateValue={dateValue}
                maxMarks={maxMarks}
                setMaxMarks={setMaxMarks}
                passMarks={passMarks}
                setPassMarks={setPassMarks}
                chapters={selectedChapters}
                setChapters={setSelectedChapters}
              />
            )}
          </TableBody>
        </Table>
        {!copyData && <div>
          {!newRow ? (
            <button
              className="add-new-exam-tile"
              style={{ marginTop: "0px", marginBottom: "5px", justifyContent: "center" }}
              onClick={() => setNewRow(true)}
            >
              <span className="plus-symbol">+</span>
              <span className="title">Add New Row</span>
            </button>
          ) : (
            <div
              style={{
                marginTop: "10px",
                marginBottom: "5px",
                display: "flex",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              {" "}
              <Button variant="outlined" onClick={clearState}>
                cancel
              </Button>{" "}
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={
                  !selectedSubjectId ||
                  !selectedChapters ||
                  !dateValue ||
                  !timevalue ||
                  !endtimevalue ||
                  !maxMarks ||
                  !passMarks
                }
              >
                save
              </Button>{" "}
            </div>
          )}
        </div>}
      </TableContainer>

      {/* Calendar modal */}
      <Modal
        open={calendar}
        onClose={closeClndr}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="boxstyle" style={{ width: "max-content" }}>
          <div style={{ display: "flex", padding: "0" }}>
            <h4
              style={{
                color: "rgba(0, 0, 0, 0.55)",
                margin: "auto",
                width: "100%",
                textAlign: "center",
              }}
            >
              Calendar
            </h4>
            <button className={styles.modalbutton} onClick={closeClndr}>
              X
            </button>
          </div>
          <div className="clndr-container">
            {/* <Calendar onChange={onChange} value={value} /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                className={styles.clndr}
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                }}
              />
            </LocalizationProvider>
          </div>
          <div style={{ width: "70%", margin: "auto", marginTop: "30px" }}>
            <button
              type="submit"
              className={styles.addbtn}
              onClick={closeClndr}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
      {/* start time modal */}
      <Modal
        open={time}
        onClose={closeTime}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="timeboxstyle">
          <div style={{ display: "flex", padding: "0" }}>
            <h4
              style={{
                color: "rgba(0, 0, 0, 0.55)",
                margin: "auto",
                width: "100%",
                textAlign: "center",
              }}
            >
              Clock
            </h4>
            <button className={styles.modalbutton} onClick={closeTime}>
              X
            </button>
          </div>
          <div>
            {/* <Calendar onChange={onChange} value={value} /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticTimePicker
                ampm
                orientation="landscape"
                openTo="minutes"
                value={timevalue}
                onChange={(newValue) => {
                  setTimevalue(newValue);
                }}
                toolbarTitle="Start Time"
                renderInput={(params) => (
                  <TextField {...params} className={styles.textField} />
                )}
              />
            </LocalizationProvider>
          </div>
          <div style={{ width: "70%", marginTop: "30px" }}>
            <button type="submit" className="timesavebtn" onClick={openEndTime}>
              Save
            </button>
          </div>
        </Box>
      </Modal>
      {/* end time modal */}
      <Modal
        open={endtime}
        onClose={closeEndTime}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="timeboxstyle">
          <div style={{ display: "flex", padding: "0" }}>
            <h4
              style={{
                color: "rgba(0, 0, 0, 0.55)",
                margin: "auto",
                width: "100%",
                textAlign: "center",
              }}
            >
              Clock
            </h4>
            <button className={styles.modalbutton} onClick={closeEndTime}>
              X
            </button>
          </div>
          <div>
            {/* <Calendar onChange={onChange} value={value} /> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticTimePicker
                ampm
                orientation="landscape"
                openTo="minutes"
                value={endtimevalue}
                onChange={(newValue) => {
                  setEndTimevalue(newValue);
                }}
                toolbarTitle="End Time"
                renderInput={(params) => (
                  <TextField {...params} className={styles.textField} />
                )}
              />
            </LocalizationProvider>
          </div>
          <div style={{ width: "70%", marginTop: "30px" }}>
            <button
              type="submit"
              className="timesavebtn"
              onClick={closeEndTime}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>

      {/* add syllabusModal modal */}
      <Modal
        open={syllabusModal}
        onClose={closeSyllabus}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="syllabusboxstyle">
          <div style={{ display: "flex", padding: "0" }}>
            <h4
              style={{
                color: "rgba(0, 0, 0, 0.55)",
                margin: "auto",
                marginLeft: "20px",
                width: "100%",
                fontSize: "20px",
              }}
            >
              Syllabus
            </h4>
            <button
              className={styles.modalbutton}
              onClick={closeSyllabus}
              style={{ marginRight: "18px", marginBottom: "16px" }}
            >
              X
            </button>
          </div>
          <div className='scrollableDiv' style={{ overflowY: 'auto', maxHeight: '60vh' }}>            {Chapters?.map((chap) => (
            <div key={chap} style={{ margin: "0 20px" }}>
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "500",
                }}
              >
                {`Chapter ${chap}`}
                {/* <input
                    type="check"
                    style={{ marginTop: "5px", float: "right" }}
                  /> */}
                <Checkbox
                  checked={selectedChapters.includes(chap)}
                  onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      setSelectedChapters((prevChapters) => [
                        ...prevChapters,
                        chap,
                      ]);
                    } else {
                      setSelectedChapters((prevChapters) =>
                        prevChapters.filter(
                          (chapterId) => chapterId !== chap
                        )
                      );
                    }
                  }}
                />
              </p>
            </div>
          ))}
          </div>
          <div style={{ width: "70%", marginTop: "30px" }}>
            <button
              type="submit"
              onClick={closeSyllabus}
              style={{
                background: "#3CB532",
                width: "100%",
                margin: "auto",
                color: "white",
                border: "none",
                padding: "8px",
                position: "absolute",
              }}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ExamTypeTable;
