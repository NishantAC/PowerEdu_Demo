import React, { useEffect, useState } from "react";
import "./ExamType.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import moment from "moment";
import { useSelector } from "react-redux";

export default function AddNewExamRow({
  sno,
  row,
  subjects,
  examtype,
  selectedSubjectId,
  setSelectedSubject,
  setSelectedSubjectId,
  openSyllabus,
  openTime,
  openClndr,
  starttime,
  endtime,
  dateValue,
  maxMarks,
  passMarks,
  setMaxMarks,
  setPassMarks,
  chapters,
  setChapters
}) {
  const handleMaxMarksChange = (e) => {
    setMaxMarks(e.target.value);
  };

  const handlePassMarksChange = (e) => {
    setPassMarks(e.target.value);
  };

  // 
  return (
    <TableRow
      // key={row.sno}
      // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
          value={selectedSubjectId}
          onChange={(e) => {
            setSelectedSubjectId(parseInt(e.target.value));
          }}
        >
          <option value=''>Select Subject</option>
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
            margin: 'auto',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            width: "300px",
          }}
        >
          {chapters?.map((chap) => (
            <span
              style={{
                background: "#ECECEC",
                padding: "5px 10px",
                color: "#7E7E7E",
                borderRadius: "3px",
                // marginRight: "10px",
              }}
            >
              {`Chapter ${chap}`}
            </span>
          ))}
          <button className="syllabusbtn" onClick={openSyllabus}>
            +
          </button>{" "}
        </div>
      </TableCell>
      <TableCell
        align="center"
        style={{
          border: "1px solid #CECECE",
          padding: "18px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fonstSize: "15px",
          color: "#545454",
          borderBottom: "none",
        }}
      >
        <div
          style={{
            margin: 'auto',
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
            {!dateValue ? "dd--mm--yyyy" : moment(dateValue).format("l")}
          </span>
          <CalendarTodayOutlinedIcon
            onClick={openClndr}
            style={{
              cursor: "pointer",
              fontSize: "20px",
              verticalAlign: "middle",
              // marginLeft: "10px",
              color: "#3D628E",
            }}
          />
        </div>
      </TableCell>
      <TableCell
        align="center"
        style={{
          border: "1px solid #CECECE",
          padding: "18px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fonstSize: "15px",
          color: "#545454",
          borderBottom: "none",
        }}
      >
        <div
          style={{
            margin: 'auto',
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
            {`${!starttime
              ? "00:00"
              : moment(starttime).format("HH:mm")
              } - ${!endtime ? "00:00" : moment(endtime).format("HH:mm")
              }`}
          </span>
          <WatchLaterOutlinedIcon
            onClick={openTime}
            style={{
              cursor: "pointer",
              fontSize: "20px",
              verticalAlign: "middle",
              // marginLeft: "10px",
            }}
          />
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
          color: "#545454",
          borderBottom: "none",
        }}
      >
        <input
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
        />
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
        <input
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
          max={maxMarks}
          required
        />
      </TableCell>
    </TableRow>
  );
}
