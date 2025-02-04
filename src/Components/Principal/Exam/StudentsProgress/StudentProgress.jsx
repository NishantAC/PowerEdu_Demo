import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDropdownClasses } from "../../../../slices/principal";
import {
  getStudentProgressData,
  getStudentProgressDataById,
} from "../../../../slices/exam";
import { fetchDropdownExamTypes } from "../../../../slices/examtype";
import { toast } from "sonner";
import styles from "../../../teacher/Subjects/TeacherSubject.module.css";
import ExamMarkService from "../../../../services/exammark.service";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: 250,
  zIndex: 1000,
};

const StudentProgress = () => {
  const { dropDownExamTypes } = useSelector((state) => state.examtype);
  const { studentProgressData } = useSelector((state) => state.exam);
  const [tableData, setTableData] = useState([]);

  const [passedStudents, setPassedStudents] = useState([]);
  const [classFilter, setClassFilter] = useState("");
  const [examTypes, setExamTypes] = useState(dropDownExamTypes);
  const [Subjects, setSubjects] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [academicYear, setAcademicYear] = useState("");
  const [query, setQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [record, setRecord] = useState({});
  const [search, setSearch] = useState(false);

  const [examType, setExamType] = useState("");
  const [subject, setSubject] = useState("");

  const { classes } = useSelector((state) => state.principal);

  const { user: currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function extractUniqueYears(examTypes) {
    // Initialize an empty array to store all year values
    const years = [];

    // Iterate over each exam type
    examTypes.forEach((examType) => {
      // Iterate over each exam within the exam type
      examType.exams.forEach((exam) => {
        // Add the year value to the years array if it's not already present
        if (!years.includes(exam.year)) {
          years.push(exam.year);
        }
      });
    });

    // Return the array of unique year values
    return years;
  }
  const handlePassChange = (id, passingMarks, obtainedmarks) => {
    if (!isStudentPassed(id) && obtainedmarks < passingMarks) {
      const passedStudent = { id, marks_obtained: passingMarks };

      setPassedStudents((prevPassedStudents) => [
        ...prevPassedStudents,
        passedStudent,
      ]);
    }
  };

  

  const handlePass = () => {
    ExamMarkService.passStudents(passedStudents)
      .then((res) => {
        if (search) {
          dispatch(getStudentProgressDataById(query)).then((result) => {
            toast.success(res.message, {
              autoClose: 1000,
              position: "bottom-right",
            });
            setTableData(result.payload);
          });
        } else {
          dispatch(
            getStudentProgressData({
              school_code: currentUser.school_id,
              class_code: classFilter,
              examtypeid: examType,
              subject_code: subject,
              year: academicYear,
            })
          ).then((result) => {
            toast.success(res.message, {
              autoClose: 1000,
              position: "bottom-right",
            });
            setTableData(result.payload);
          });
        }

        setSearch(false);
        setPassedStudents([]);
      })
      .catch((err) => {
        toast.error(err.message, {
          autoClose: 1000,
          position: "bottom-right",
        });
      });
  };

  useEffect(() => {
    setExamTypes(dropDownExamTypes);
    setAcademicYears(extractUniqueYears(dropDownExamTypes));
  }, [dropDownExamTypes]);

  useEffect(() => {
    const subject = examTypes.find((exam) => exam.id === examType);
    setSubjects(subject?.exams);
  }, [examType]);

  useEffect(() => {
    dispatch(getDropdownClasses({ school_id: currentUser.school_id }));
  }, [classFilter]);
  const handleApplyFilter = () => {
    dispatch(
      getStudentProgressData({
        school_code: currentUser.school_id,
        class_code: classFilter,
        examtypeid: examType,
        subject_code: subject,
        year: academicYear,
      })
    )
      .then((result) => {
        // This code will execute after the fetchDropdownExamTypes action is completed
        if (result.payload.length === 0) {
          result.payload = [];
          toast.error(`No Marks Available for Selected filter`, {
            autoClose: 1000,
            position: "bottom-right",
          });
        } else {
          setTableData(result.payload);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the action
        console.error("An error occurred:", error);
      });
  };
  const clearFilters = () => {
    setClassFilter("");
    setExamType("");
    setSubject("");
    setAcademicYear("");
    setQuery("");
    setTableData([]);
    setPassedStudents([]);
  };

  const handleClassChange = (value) => {
    setClassFilter(value);
    setSubjects([]);

    // Dispatch the action and wait for it to complete
    dispatch(
      fetchDropdownExamTypes({
        school_code: currentUser.school_id,
        class_code: value,
      })
    )
      .then((result) => {
        // This code will execute after the fetchDropdownExamTypes action is completed
        if (result.payload.length === 0) {
          toast.error(`No Exams Available for Class ${value}`, {
            autoClose: 1000,
            position: "bottom-right",
          });
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the action
        console.error("An error occurred:", error);
      });
  };

  const handleExamChange = (value) => {
    setExamType(parseInt(value));
    const subject = examTypes.find((exam) => exam.id === examType);
    setSubjects(subject?.exams);
  };

  const isStudentPassed = (studentId) => {
    // Check if any object in passedStudents array has id equal to studentId
    return passedStudents.some((student) => student.id === studentId);
  };

  const passAll = () => {
    tableData.forEach((student) => {
      handlePassChange(
        student.id,
        student.exam.passing_marks,
        student.marks_obtained
      );
    });
  };

  const handleSearch = () => {
    if (!query) {
      toast.error(`Content Can not be Empty`, {
        autoClose: 1000,
        position: "bottom-right",
      });
      return;
    }
    dispatch(getStudentProgressDataById(query))
      .then((result) => {
        // This code will execute after the fetchDropdownExamTypes action is completed
        if (result.payload.length === 0) {
          result.payload = [];
          toast.error(`No Marks Available for This Student`, {
            autoClose: 1000,
            position: "bottom-right",
          });
        } else {
          setTableData(result.payload);
          setSearch(true);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the action
        console.error("An error occurred:", error);
      });
  };
  
  const handleViewMarks = (academic) => {
    
    setRecord(academic);
    setIsPopupOpen(true);
  };

  const isAllPassed = () => {
    if (tableData?.length === 0) {
      return true;
    }

    // Check if all students have marks greater than or equal to passing marks
    return tableData?.every(
      (student) => student.marks_obtained >= student.exam.passing_marks
    );
  };

  return (
    <>
      <div className="prncplstdnt">
        <div>
          <p
            style={{
              fontfamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "18px",
              lineHeight: "21px",
              color: "#4D4D4D",
            }}
          >
            Home &gt;
            <b>
              {" "}
              <u>Student's Progress</u>
            </b>
          </p>
        </div>
        <h3 style={{ marginTop: "40px" }}>Student's Progress</h3>
        <br />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <p
              style={{
                fontFamily: "Rubik",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "20px",
                color: "#000000",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              Filters:-
            </p>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <select
              style={{
                borderRadius: "5px",
                fontSize: "17px",
                padding: "6px 10px",
                color: "#414141",
              }}
              value={classFilter}
              onChange={(e) => handleClassChange(e.target.value)}
            >
              <option value="">Class</option>
              {classes?.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <select
              disabled={examTypes.length === 0}
              style={{
                borderRadius: "5px",
                fontSize: "17px",
                padding: "6px 10px",
                color: "#414141",
              }}
              value={examType}
              onChange={(e) => handleExamChange(e.target.value)}
            >
              <option value="">Exam Type</option>
              {examTypes?.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.exam_name}
                </option>
              ))}
            </select>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <select
              disabled={examTypes?.length === 0 || Subjects?.length === 0}
              style={{
                borderRadius: "5px",
                fontSize: "17px",
                padding: "6px 10px",
                color: "#414141",
              }}
              value={subject}
              onChange={(e) => setSubject(parseInt(e.target.value))}
            >
              <option value="" hidden>
                Subject
              </option>
              {Subjects?.map((s) => (
                <option
                  key={s.subject.subject_code}
                  value={s.subject.subject_code}
                >
                  {s.subject.subject_name}
                </option>
              ))}
            </select>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <select
              disabled={examTypes?.length === 0}
              style={{
                borderRadius: "5px",
                fontSize: "17px",
                padding: "6px 10px",
                color: "#414141",
              }}
              value={academicYear}
              onChange={(e) => setAcademicYear(parseInt(e.target.value))}
            >
              <option value="">Academic Year</option>
              {academicYears?.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <button className="applybtnprncpl" onClick={handleApplyFilter}>
                Apply
              </button>
              <a className="clearbtn" onClick={clearFilters}>
                clear
              </a>
            </div>
          </div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 250,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search By Rekor ID"
              inputProps={{ "aria-label": "search google maps" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="number"
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div style={{ marginTop: "30px" }}>
          <TableContainer component={Paper} style={{ height: "370px" }}>
            {tableData.length > 0 ? (
              <Table stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow
                    style={{
                      paddingLeft: "10px",
                      background:
                        "linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)",
                      border: "2px solid #A4A4A4",
                      boxSizing: "border-box",
                      borderRadius: "5px",
                    }}
                  >
                    <TableCell
                      style={{
                        paddingTop: "18px",
                        paddingBottom: "18px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "18px",
                        color: "#545454",
                        borderWidth: "2px 0 2px 2px",
                        borderStyle: "solid",
                        borderColor: "#A4A4A4",
                        background:
                          "linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)",
                        textAlign: "left",
                      }}
                    >
                      S no.
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        paddingTop: "18px",
                        paddingBottom: "18px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "18px",
                        color: "#545454",
                        background:
                          "linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)",
                        borderWidth: "2px 0",
                        borderStyle: "solid",
                        borderColor: "#A4A4A4",
                      }}
                    >
                      Academic Year
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        paddingTop: "18px",
                        paddingBottom: "18px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "18px",
                        color: "#545454",
                        background:
                          "linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)",
                        borderWidth: "2px 0",
                        borderStyle: "solid",
                        borderColor: "#A4A4A4",
                      }}
                    >
                      Class
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        paddingTop: "18px",
                        paddingBottom: "18px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "18px",
                        color: "#545454",
                        background:
                          "linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)",
                        borderWidth: "2px 0",
                        borderStyle: "solid",
                        borderColor: "#A4A4A4",
                      }}
                    >
                      Exam Type
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        paddingTop: "18px",
                        paddingBottom: "18px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "18px",
                        color: "#545454",
                        background:
                          "linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)",
                        borderWidth: "2px 0",
                        borderStyle: "solid",
                        borderColor: "#A4A4A4",
                      }}
                    >
                      Subject
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        paddingTop: "18px",
                        paddingBottom: "18px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "18px",
                        color: "#545454",
                        background:
                          "linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)",
                        borderWidth: "2px 0",
                        borderStyle: "solid",
                        borderColor: "#A4A4A4",
                      }}
                    >
                      Student Name
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        paddingTop: "18px",
                        paddingBottom: "18px",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "18px",
                        color: "#545454",
                        background:
                          "linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)",
                        borderWidth: "2px 2px 2px 0",
                        borderStyle: "solid",
                        borderColor: "#A4A4A4",
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
                  }}
                >
                  {tableData.length > 0 &&
                    tableData?.map((row, sno) => (
                      <TableRow
                        key={sno}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        style={{ paddingLeft: "10px" }}
                      >
                        <TableCell
                          style={{
                            paddingTop: "15px",
                            paddingBottom: "15px",
                            flex: "0.05",
                            fontFamily: "Lato",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "16px",
                            color: "#000000",
                            textAlign: "left",
                          }}
                        >
                          {sno + 1}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            paddingTop: "15px",
                            paddingBottom: "15px",
                            fontFamily: "Lato",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "16px",
                            color: "#000000",
                          }}
                        >
                          {row.exam.year}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            paddingTop: "15px",
                            paddingBottom: "15px",
                            fontFamily: "Lato",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "16px",
                            color: "#000000",
                          }}
                        >
                          {row.exam.class_code}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            paddingTop: "15px",
                            paddingBottom: "15px",
                            fontFamily: "Lato",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "16px",
                            color: "#000000",
                          }}
                        >
                          {row.exam.exam_type.exam_name}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            paddingTop: "15px",
                            paddingBottom: "15px",
                            fontFamily: "Lato",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "16px",
                            color: "#000000",
                          }}
                        >
                          {row.exam.subject.subject_name}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            paddingTop: "15px",
                            paddingBottom: "15px",
                            fontFamily: "Lato",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "16px",
                            color: "#000000",
                          }}
                        >{`${row.users_student.details.firstname} ${row.users_student.details.lastname}`}</TableCell>
                        <TableCell
                          align="left"
                          style={{
                            paddingTop: "15px",
                            paddingBottom: "15px",
                            fontFamily: "Lato",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "16px",
                            color: "#000000",
                            margin: "auto",
                          }}
                        >
                          <div style={{ display: "flex", gap: "1rem" }}>
                            <button
                              type="button"
                              className="passbtn"
                              onClick={() =>
                                handlePassChange(
                                  row.id,
                                  row.exam.passing_marks,
                                  row.marks_obtained
                                )
                              }
                              disabled={
                                row.marks_obtained >= row.exam.passing_marks ||
                                isStudentPassed(row.id)
                              }
                            >
                              Pass
                            </button>

                            <button
                              type="button"
                              className="entermarksbtn"
                              onClick={() => {
                                handleViewMarks({
                                  total_marks: row.exam.max_marks,
                                  marks_obtained: row.marks_obtained,
                                });
                              }}
                            >
                              View Marks
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            ) : (
              <h5 className={styles.div2h2}>
                "Please select all Filters to view available Data."
              </h5>
            )}
          </TableContainer>
          {isPopupOpen && (
            <Box sx={style}>
              <div class="d-flex pb-3">
                <div
                  onClick={() => setIsPopupOpen(false)}
                  class="ml-auto cursor-pointer"
                >
                  <CancelIcon style={{ fontSize: 30, color: "#ff2934" }} />
                </div>
              </div>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow
                      style={{
                        padding: "10px 14px",
                        height: "70px",
                        border: "2px solid #A4A4A4",
                        background:
                          "linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)",
                      }}
                    >
                      <TableCell
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "20px",
                          color: "#545454",
                          borderBottom: "none",
                          textAlign: "left",
                          paddingTop: "10px",
                          paddingBottom: "5px",
                        }}
                      >
                        Total Marks
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "20px",
                          color: "#545454",
                          borderBottom: "none",
                          paddingTop: "10px",
                          paddingBottom: "5px",
                        }}
                      >
                        Obtained Marks
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    style={{
                      border: "1px solid #A5A5A5",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      borderRadius: "5px",
                      overflowY: "auto",
                    }}
                  >
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ padding: "0px 14px" }}
                    >
                      <TableCell
                        style={{
                          fontFamily: "Lato",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "16px",
                          color: "#000000",
                          textAlign: "left",
                          paddingTop: "22px",
                        }}
                      >
                        {record.total_marks}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          fontFamily: "Lato",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "16px",
                          color: "#000000",
                        }}
                      >
                        {record.marks_obtained ? record.marks_obtained : "NA"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          <div
            style={{ textAlign: "right", margin: "30px 0px", width: "100%" }}
          >
            <div
              style={{
                gap: "1rem",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                style={{
                  fontSize: "16px",
                  padding: "10px 30px",
                  borderRadius: "5px",
                  border: "none",
                  color: "white",
                  backgroundColor: "green",
                  opacity: isAllPassed() ? 0.5 : 1,
                }}
                onClick={() => passAll()}
                disabled={isAllPassed()}
              >
                Pass All
              </button>

              <button
                onClick={handlePass}
                style={{
                  fontSize: "16px",
                  padding: "10px 30px",
                  borderRadius: "5px",
                  border: "none",
                  color: "white",
                  backgroundColor: "#214DF9",
                  opacity: passedStudents.length === 0 ? 0.5 : 1,
                }}
                disabled={passedStudents.length === 0}
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProgress;
