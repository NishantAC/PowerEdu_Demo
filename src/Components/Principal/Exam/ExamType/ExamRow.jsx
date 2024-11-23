import React, { useEffect, useState } from "react";
import "./ExamType.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, deleteExam, updateExam } from "../../../../slices/exam";
import { fetchSyllabusBySubject } from "../../../../slices/syllabus";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CalendarModal from "./Modals/CalendarModal";
import SyllabusModal from "./Modals/SyllabusModal";
import TimeModal from "./Modals/TimeModal";
import { toast } from "react-toastify";

export default function ExamRow({
  sno,
  row,
  subjects,
  examtype,
  setSelectedSubject,
  copyData
}) {
  const [editId, setEditId] = useState(null);
  const [subject, setSubject] = useState(row.subject);
  const [subject_code, setSubject_code] = useState(row.subject.subject_code);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);





  const [chapters, setChapters] = useState(row.syllabus);
  const [examDate, setExamDate] = useState(row.date);
  const [startTiming, setStartTiming] = useState(row.timing.start);
  const [endTiming, setEndTiming] = useState(row.timing.end);
  const [maxMarks, setMaxMarks] = useState(row.max_marks);
  const [passMarks, setPassMarks] = useState(row.passing_marks);

  const [calendar, setCalendar] = useState(false);
  const openClndr = () => setCalendar(true);
  const closeClndr = () => setCalendar(false);

  const [syllabusModal, setSyllabusModal] = useState(false);
  const openSyllabus = () => setSyllabusModal(true);
  const closeSyllabus = () => setSyllabusModal(false);

  const [timevalue, setTimevalue] = useState(row.timing.start);
  const [time, setTime] = useState(false);
  const openTime = () => setTime(true);
  const closeTime = () => setTime(false);

  const [endtimevalue, setEndTimevalue] = useState(row.timing.end);
  const [endtime, setEndTime] = useState(false);
  const openEndTime = () => setEndTime(true) & setTime(false);
  const closeEndTime = () => setEndTime(false);

  const handleEdit = (id) => {
    setEditId(id);
  };

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    setSelectedSubject(subject);
  }, [subject]);

  const handleMaxMarksChange = (e) => {
    setMaxMarks(e.target.value);
  };

  const handlePassMarksChange = (e) => {
    setPassMarks(e.target.value);
  };

  const handleSubjectChange = (value) => {

    setSubject_code(parseInt(value))
  };

  const handleUpdateRow = () => {
    const updatedRow = {
      id: row.id,
      subject_code: subject_code,
      syllabus: chapters,
      date: examDate,
      timing: {
        start: timevalue ? timevalue : startTiming,
        end: endtimevalue ? endtimevalue : endTiming
      },
      max_marks: maxMarks,
      passing_marks: passMarks,
    };
    dispatch(updateExam({ updatedRow, school_code: user?.schoolcode, class_code: examtype.class_code }))

    setEditId(null);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Stop event propagation
    setIsDeleteDialogOpen(true);
  };


  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const confirmDelete = () => {
    setIsDeleteDialogOpen(false);
    dispatch(deleteExam({ id: row.id, school_code: user?.schoolcode, class_code: examtype.class_code })).then((result) => {
      if (result.payload) {
        // Dispatch succeeded, show success message
        toast.success(result.payload.message, { autoClose: 1000, position: "bottom-right" });
        dispatch(clearMessage());
      } else {
        // Dispatch failed, show error message
        toast.error(result.error.message, { autoClose: 1000, position: "bottom-right" });
        dispatch(clearError());
      }
    });;
  };


  return (
    <>
      <TableRow
        key={sno}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        style={{ paddingLeft: "10px", border: "1px solid #CECECE" }}
      >
        <TableCell
          style={{
            border: "1px solid #CECECE",
            paddingTop: "16px",
            paddingBottom: "16px",
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "16px",
            color: "#6A6666",
            textAlign: "left",
          }}
        >
          {sno}

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
            color: "#545454",
            borderBottom: "none",
          }}
        >
          <select
            style={{
              border: "none",
              background: "#ECECEC",
              padding: "5px 10px",
              color: "#7E7E7E",
              borderRadius: "3px",
            }}
            value={subject_code}
            onChange={(e) => handleSubjectChange(e.target.value)}
            disabled={!(row.id === editId)}
          >
            {!(row.id === editId) && (
              <option key={subject.subject_code} value={subject.subject_code}>
                {subject.subject_name}
              </option>
            )}
            {subjects?.map((s) => (
              <option key={s.subject_code} value={s.subject_code}>
                {s.subject_name}
              </option>
            ))}
          </select>
        </TableCell>
        <TableCell
          align="center"
          style={{
            border: "1px solid #CECECE",
            width: "300px",
            paddingTop: "18px",
            paddingBottom: "18px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fonstSize: "15px",
            color: "#545454",
            borderBottom: "none",
          }}
        >
          <div
            style={{
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              width: "300px",
            }}
          >
            {chapters?.map((syl) => (
              <span
                key={syl}
                style={{
                  background: "#ECECEC",
                  padding: "5px 10px",
                  color: "#7E7E7E",
                  borderRadius: "3px",
                  // marginRight: "10px",
                }}
              >
                {`Chapter ${syl}`}
              </span>
            ))}
            <button
              className="syllabusbtn"
              disabled={!(row.id === editId)}
              onClick={() => {
                openSyllabus();
              }}
            >
              +
            </button>
          </div>
          <SyllabusModal selectedChapters={chapters} setSelectedChapters={setChapters} syllabusModal={syllabusModal} closeSyllabus={closeSyllabus} />
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
            color: "#545454",
            borderBottom: "none",
          }}
        >
          <div
            style={{
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              width: "130px",
            }}
          >
            <span
              style={{
                background: "#ECECEC",
                padding: "5px 10px",
                color: "#7E7E7E",
                borderRadius: "3px",
              }}
            >
              {/* dd--mm--yyyy */}
              {moment(examDate).format("l")}
            </span>
            <CalendarTodayOutlinedIcon
              onClick={() => {
                if (row.id === editId) {
                  openClndr();

                }
              }}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                verticalAlign: "middle",
                // marginLeft: "10px",
                color: "#3D628E",
              }}
            />
          </div>
          <CalendarModal calendar={calendar} closeclndr={closeClndr} value={examDate} setValue={setExamDate} />
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
            color: "#545454",
            borderBottom: "none",
          }}
        >
          <div
            style={{
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              width: "145px",
            }}
          >
            <span
              style={{
                background: "#ECECEC",
                padding: "5px 10px",
                color: "#7E7E7E",
                borderRadius: "3px",
              }}
            >
              {/* 11.00-13.00 */}
              {`${!timevalue
                ? moment(startTiming).format("HH:mm")
                : moment(timevalue).format("HH:mm")
                } - ${!endtimevalue
                  ? moment(endTiming).format("HH:mm")
                  : moment(endtimevalue).format("HH:mm")
                }`}

            </span>
            <WatchLaterOutlinedIcon
              onClick={() => {
                if (row.id === editId) {
                  openTime();
                }
              }}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                verticalAlign: "middle",
                // marginLeft: "10px",
              }}
            />
          </div>
          <TimeModal
            time={time}
            endtime={endtime}
            closeTime={closeTime}
            openEndTime={openEndTime}
            closeEndTime={closeEndTime}
            endtimevalue={endtimevalue}
            timevalue={timevalue}
            setEndTimevalue={setEndTimevalue}
            setTimevalue={setTimevalue} />
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
            color: "#545454",
            borderBottom: "none",
          }}
        >
          {row.id === editId ? <input
            type="number"
            value={maxMarks}
            onChange={handleMaxMarksChange}
            style={{
              background: "#ECECEC",
              padding: "5px 5px 5px 10px",
              color: "#7E7E7E",
              borderRadius: "3px",
              border: "none",
              width: "60px",
            }}
            required
          /> : <span
            style={{
              background: "#ECECEC",
              padding: "5px 10px",
              color: "#7E7E7E",
              borderRadius: "3px",
            }}
          >
            {maxMarks}
          </span>}
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
            color: "#545454",
            borderBottom: "none",
          }}
        >
          {row.id === editId ? <input
            type="number"
            value={passMarks}
            onChange={handlePassMarksChange}
            style={{
              background: "#ECECEC",
              padding: "5px 5px 5px 10px",
              color: "#7E7E7E",
              borderRadius: "3px",
              border: "none",
              width: "60px",
            }}
            required
          /> :
            <span
              style={{
                background: "#ECECEC",
                padding: "5px 10px",
                color: "#7E7E7E",
                borderRadius: "3px",
              }}
            >
              {passMarks}
            </span>}
        </TableCell>
        {!copyData && <TableCell
          style={{
            border: "1px solid #CECECE",
            paddingTop: "16px",
            paddingBottom: "16px",
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "16px",
            color: "#6A6666",
            textAlign: "left",
          }}
        >
          {!(row.id == editId) ? (
            <IconButton onClick={() => handleEdit(row.id)}>
              <EditIcon></EditIcon>
            </IconButton>
          ) : (
            <IconButton onClick={() => handleUpdateRow()}>
              <CheckIcon></CheckIcon>
            </IconButton>
          )}
          <IconButton onClick={handleDelete}>
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width={18}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                width={20}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </svg>
          </IconButton>
        </TableCell>}
      </TableRow>
      <Dialog open={isDeleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this exam?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
