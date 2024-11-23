import React, { useEffect, useState } from "react";
import "./PrincipalStudents.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudents } from "../../../slices/student";
import { getDropdownClasses } from "../../../slices/principal";
import useDebounce from "../../../Utils/debounce";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function PrincipalStudents() {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.user);
  const { allStudents = { students: [] } } = useSelector(
    (state) => state.student
  );
  const { classes } = useSelector((state) => state.principal);
  const dispatch = useDispatch();

  const [classFilter, setClassFilter] = useState("1A");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const currentYear = new Date().getFullYear();

  // Apply filters and fetch students
  const handleApplyFilter = () => {
    dispatch(
      fetchAllStudents({
        school_code: currentUser.schoolcode,
        class_code: classFilter,
        year: currentYear,
        searchTerm: debouncedSearchTerm,
        page,
        limit,
      })
    );
  };

  useEffect(() => {
    dispatch(getDropdownClasses({ schoolcode: currentUser.schoolcode }));
    handleApplyFilter();
  }, [dispatch, currentUser.schoolcode]);

  useEffect(() => {
    handleApplyFilter();
  }, [classFilter, debouncedSearchTerm, page]);

  const handlePageChange = (event, value) => setPage(value);

  const handleViewProfile = (studentId) => {
    navigate("/viewstudent", {
      state: { studentId: studentId, profileType: "students" },
    });
  };

  return (
    <div className="prncplstdnt">
      <div>
        <p
          style={{
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "18px",
            lineHeight: "21px",
            color: "#4D4D4D",
          }}
        >
          Home &gt;{" "}
          <b>
            <u>Student Profile</u>
          </b>
        </p>
      </div>
      <h3 style={{ marginTop: "40px" }}>Student Profile</h3>
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <p
          style={{
            fontFamily: "Rubik",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "20px",
            color: "#000000",
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
          onChange={(e) => setClassFilter(e.target.value)}
        >
          <option value="" hidden>
            Class
          </option>
          {classes?.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button className="applybtnprncpl" onClick={handleApplyFilter}>
            Apply
          </button>
          <button className="clearbtn" onClick={() => setClassFilter("")}>
            Clear
          </button>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <TableContainer component={Paper} style={{ height: "370px" }}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow
                style={{
                  background:
                    "linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)",
                  border: "2px solid #A4A4A4",
                  borderRadius: "5px",
                }}
              >
                <TableCell
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#545454",
                  }}
                >
                  S no.
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#545454",
                  }}
                >
                  Academic Year
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#545454",
                  }}
                >
                  Class
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#545454",
                  }}
                >
                  Admission No.
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#545454",
                  }}
                >
                  Roll No.
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#545454",
                  }}
                >
                  Student Name
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "600",
                    fontSize: "18px",
                    color: "#545454",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(allStudents.students) &&
              allStudents.students.length > 0 ? (
                allStudents.students.map((row, index) => {
                  return (
                    <TableRow key={row.user_id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.academicyear}</TableCell>
                      <TableCell>{row.class}</TableCell>
                      <TableCell>{row.admissionno}</TableCell>
                      <TableCell>{row.rollno}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <Link
                          to="/principal/view-profile"
                          state={{ userId: row.user_id, userType: "students" }}
                        >
                          <button
                            type="button"
                            onClick={() => handleViewProfile(row.user_id)}
                            style={{
                              fontFamily: "Rubik",
                              fontSize: "18px",
                              fontWeight: "500",
                              color: "white",
                              backgroundColor: "#9F8FFF",
                              width: "133px",
                              height: "42px",
                              display: "grid",
                              placeContent: "center",
                              border: "none",
                              outline: "none",
                            }}
                          >
                            View Profile
                          </button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No students found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Stack spacing={2} alignItems="center" marginTop={2}>
        <Pagination
          count={Math.ceil(allStudents.total / limit)}
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

export default PrincipalStudents;
