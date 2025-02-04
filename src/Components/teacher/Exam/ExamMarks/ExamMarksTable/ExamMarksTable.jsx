import React, { useEffect, useState } from "react";
import "./ExamMarksTable.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MarksTable from "./MarksTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentMarks } from "../../../../../slices/hyexam";
import { fetchExamMarks } from "../../../../../slices/exam";

function ExamMarksTable({ examdetails, examSubject, setExamSubject }) {
    const dispatch = useDispatch()
    const {studentmarks} = useSelector(state => state.exam)
    const { user } = useSelector((state) => state.user);
  const [showTable, setShow] = useState(false);
  const show = () => setShow(true);
  const hide = () => {
    setExamSubject("")
    setShow(false)
  }
//   
  const [selectedExam, setSelectedExam] = useState();
  const [filteredData, setFilteredData] = useState(examdetails);
  const [academicYearFilter, setAcademicYearFilter] = useState("");
  const [examTypeFilter, setExamTypeFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");

  useEffect(() => {
    setFilteredData(examdetails)
  }, [examdetails])

  const handleAcademicYearFilterChange = (event) => {
    setAcademicYearFilter(event.target.value);
  };

  const handleExamTypeFilterChange = (event) => {
    setExamTypeFilter(event.target.value);
  };

  const handleClassFilterChange = (event) => {
    setClassFilter(event.target.value);
  };

  const handleEnterMarks = (exam) => {
    setSelectedExam(exam)
    if(exam){
      setExamSubject(exam.subjectname)
      show()
    }
    dispatch(fetchExamMarks({ school_id: user?.school_id ,examid: exam.id, academicyear: exam.academicyear}))
  }

  const handleFilter = () => {
    const filterData = examdetails.filter((row) => {
        return (
          (academicYearFilter === "" || row.academicyear === academicYearFilter) &&
          (examTypeFilter === "" || row.term === examTypeFilter) &&
          (classFilter === "" || row.class == classFilter)
        );
      });
      setFilteredData(filterData)
  }

  const clearFilters = () => {
    setAcademicYearFilter("")
    setClassFilter("")
    setExamTypeFilter("")
    setFilteredData(examdetails)
  }

  const academicYears = [...new Set(examdetails.map((exam) => exam.academicyear))];
  const classes = [...new Set(examdetails.map((exam) => exam.class))];
  const terms = [...new Set(examdetails.map((exam) => exam.term))];

  return (
    <>
      {showTable ? (
        <>
          <MarksTable hide={hide} studentmarks={studentmarks} exam={selectedExam} />
        </>
      ) : (
        <div open={showTable} onClose={hide}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              rowGap: "8px",
              columnGap: "22px",
              marginTop: "10px",
            }}
          >
            <p
              style={{
                fontFamily: "Rubik",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "20px",
                color: "#000000",
                marginBottom: "auto",
              }}
            >
              Filters:-
            </p>
            <select
              style={{
                borderRadius: "5px",
                fontSize: "17px",
                padding: "4px 10px",
                color: "#414141",
              }}
              value={academicYearFilter} onChange={handleAcademicYearFilterChange}
            >
              <option value="" >
                Academic Year
              </option>
              {academicYears.map(year => <option key={year} >{year}</option>)}
            </select>
            <select
              style={{
                borderRadius: "5px",
                fontSize: "17px",
                padding: "4px 10px",
                color: "#414141",
              }}
              value={examTypeFilter} onChange={handleExamTypeFilterChange}
            >
              <option value="">
                Exam Type
              </option>
              {terms.map(term => <option key={term} >{term}</option>)}
            </select>
            <select
              style={{
                borderRadius: "5px",
                fontSize: "17px",
                padding: "4px 10px",
                color: "#414141",
              }}
              value={classFilter} onChange={handleClassFilterChange}
            >
              <option value="">
                Class
              </option>
              {classes.map(c => <option key={c} >{c}</option>)}
            </select>
            <button
              style={{
                borderRadius: "5px",
                background: "#214DF9",
                padding: "4px 24px",
                color: "#FFFFFF",
                border: "none",
              }}
              onClick={handleFilter}
            >
              Apply
            </button>
            <button onClick={clearFilters} style={{ border: 'none', background: 'none' }}>
              <a style={{ color: '#FF7575', fontSize: '15px', fontWeight: '500', textDecoration: 'underline' }}>
                Clear Filters
              </a>
            </button>
          </div>

          <TableContainer style={{ marginTop: "40px", maxHeight: "400px" }} component={Paper}>
            <Table aria-label="simple table" onClose={hide}>
              <TableHead>
                <TableRow
                   style={{
                    paddingLeft: "10px",
                    background:
                      "linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)",
                    border: "2px solid #A4A4A4",
                    boxSizing: "border-box",
                    borderRadius: "5px",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  <TableCell
                    style={{
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "20px",
                      color: "#545454",
                      borderBottom: "none",
                      textAlign: "left",
                    }}
                  >
                    S no.
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "20px",
                      color: "#545454",
                      borderBottom: "none",
                    }}
                  >
                    Academic Year
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "20px",
                      color: "#545454",
                      borderBottom: "none",
                    }}
                  >
                    Term
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "20px",
                      color: "#545454",
                      borderBottom: "none",
                    }}
                  >
                    Subject
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      paddingTop: "20px",
                      paddingBottom: "20px",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "20px",
                      color: "#545454",
                      borderBottom: "none",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                    background: "#FFFFFF",
                    border: "1px solid #A5A5A5",
                    boxSizing: "border-box",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "5px",
                    overflowY: "auto",
                    maxHeight: "calc(100% - 56px)",
                  }}
              >
                {filteredData.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ paddingLeft: "10px" }}
                  >
                    <TableCell
                      style={{
                        paddingTop: "16px",
                        paddingBottom: "16px",
                        flex: "0.05",
                        fontFamily: "Lato",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "18px",
                        color: "#000000",
                        textAlign: "left",
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        paddingTop: "16px",
                        paddingBottom: "16px",
                        fontFamily: "Lato",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "18px",
                        color: "#000000",
                      }}
                    >
                      {row.academicyear}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        paddingTop: "16px",
                        paddingBottom: "16px",
                        fontFamily: "Lato",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "18px",
                        color: "#000000",
                      }}
                    >
                      {row.term}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        paddingTop: "16px",
                        paddingBottom: "16px",
                        fontFamily: "Lato",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "18px",
                        color: "#000000",
                      }}
                    >
                      {row.subjectname}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        paddingTop: "16px",
                        paddingBottom: "16px",
                        fontFamily: "Lato",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "18px",
                        color: "#000000",
                        margin: "auto",
                      }}
                    >
                      <button
                        type="submit"
                        className="entermarksbtn"
                        onClick={() => handleEnterMarks(row)}
                      >
                        Enter Marks
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
}

export default ExamMarksTable;
