import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "@/common/constant";

function TabAcademics1({ userId }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [classCode, setClassCode] = useState(null);
  const [viewMarks, setViewMarks] = useState({}); // Track which rows have marks visible
  const [filters, setFilters] = useState({
    class: "",
    examType: "",
    subject: ""
  });

  const { user: currentUser } = useSelector((state) => state.user) ;
  const schoolCode = currentUser.schoolcode;

  useEffect(() => {
    const fetchClassCodeAndExamData = async () => {
      try {
        const response = await axios.get( `${API_BASE_URL}exam/getClassId/${userId}`);
        const extractedClassCode = response.data.class_code?.[Object.keys(response.data.class_code)[0]];
        setClassCode(extractedClassCode);

        if (extractedClassCode && schoolCode) {
          const examResponse = await axios.post(API_BASE_URL+"exam/getExamDataForStudent", {
            userId,
            page,
            limit,
            filters,
            class_code: extractedClassCode,
            school_code: schoolCode,
          });
          setData(examResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userId) {
      fetchClassCodeAndExamData();
    }
  }, [page, filters, userId, schoolCode]);

  const handlePageChange = (event, value) => setPage(value);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    setPage(1); // Reset to page 1 when filters are applied
  };

  // Toggle visibility of marks columns for a specific row
  const toggleViewMarks = (examId) => {
    setViewMarks((prev) => ({ ...prev, [examId]: !prev[examId] }));
  };

  return (
    <div className="tab-academics">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <p>Filters:</p>
        <select name="class" onChange={handleFilterChange}>
          <option value="" hidden>Class</option>
          <option value="5 A">5 A</option>
          <option value="6 A">6 A</option>
        </select>
        <select name="examType" onChange={handleFilterChange}>
          <option value="" hidden>Exam Type</option>
          <option value="Class Test 1">Class Test 1</option>
          <option value="Final Exam">Final Exam</option>
        </select>
        <select name="subject" onChange={handleFilterChange}>
          <option value="" hidden>Subject</option>
          <option value="English">English</option>
          <option value="Math">Math</option>
        </select>
        <button className="applybtn" onClick={applyFilters}>Apply</button>
      </div>
      <TableContainer component={Paper} style={{ marginTop: "20px", height: "370px" }}>
        <Table stickyHeader aria-label="academics table">
          <TableHead>
            <TableRow style={{ background: "#F5F5F5", border: "2px solid #A4A4A4" }}>
              <TableCell style={{ fontWeight: "600", fontSize: "18px", color: "#545454" }}>S no.</TableCell>
              <TableCell style={{ fontWeight: "600", fontSize: "18px", color: "#545454" }}>Exam Date</TableCell>
              <TableCell style={{ fontWeight: "600", fontSize: "18px", color: "#545454" }}>Exam Type</TableCell>
              <TableCell style={{ fontWeight: "600", fontSize: "18px", color: "#545454" }}>Subject</TableCell>
              <TableCell style={{ fontWeight: "600", fontSize: "18px", color: "#545454" }}>Action</TableCell>
              {/** Marks columns will be conditionally shown **/}
              {Object.values(viewMarks).includes(true) && (
                <>
                  <TableCell style={{ fontWeight: "600", fontSize: "18px", color: "#545454" }}>Total Marks</TableCell>
                  <TableCell style={{ fontWeight: "600", fontSize: "18px", color: "#545454" }}>Passing Marks</TableCell>
                  <TableCell style={{ fontWeight: "600", fontSize: "18px", color: "#545454" }}>Obtained Marks</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.exam_id}>
                <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                <TableCell>{row.exam_date}</TableCell>
                <TableCell>{row.exam_type}</TableCell>
                <TableCell>{row.subject_name}</TableCell>
                <TableCell>
                  <button
                    onClick={() => toggleViewMarks(row.exam_id)}
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "white",
                      backgroundColor: "#9F8FFF",
                      borderRadius: "5px",
                      padding: "8px 16px",
                      border: "none",
                    }}
                  >
                    {viewMarks[row.exam_id] ? "Hide Marks" : "View Marks"}
                  </button>
                </TableCell>
                {viewMarks[row.exam_id] && (
                  <>
                    <TableCell>{row.total_marks}</TableCell>
                    <TableCell>{row.passing_marks}</TableCell>
                    <TableCell>{row.obtained_marks !== null ? row.obtained_marks : "N/A"}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} alignItems="center" marginTop={2}>
        <Pagination
          count={Math.ceil(data.total / limit)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
          fontFamily: "Poppins",
          fontSize: "16px",
          color: "#545454",
          fontWeight: "bold",
        }}
      >
        {`You are on page ${page}`}
      </div>
    </div>
  );
}

export default TabAcademics1;
