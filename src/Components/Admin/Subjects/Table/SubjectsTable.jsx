import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const SubjectsTable = ({
  subjects,
  setItemToDelete,
  showDeleteConfirmationModal,
  setShowDeleteConfirmationModal,
  page,
  limit,
  total,
  onPageChange,
  searchSubjects
}) => {

  
  return (
    <div>
      <TableContainer component={Paper} style={{ height: "370px" }}>
        <Table aria-label="simple table">
          <TableHead style={{zIndex:999}}>
            <TableRow
              style={{
                position: "sticky",
                top: "0",
                paddingLeft: "10px",
                background: "white",
                // background:
                //   "linear-gradient(180deg, #FDFDFD 0%, rgba(245, 245, 245, 0.92) 100%)",
                border: "2px solid #A4A4A4",
                boxSizing: "border-box",
                borderRadius: "5px",
                zIndex: "10",
              }}
            >
              <TableCell
                style={{
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#545454",
                  borderBottom: "none",
                  textAlign: "left",
                }}
              >
                Code
              </TableCell>
              <TableCell
                align="left"
                style={{
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#545454",
                  borderBottom: "none",
                }}
              >
                Subject Name
              </TableCell>
              <TableCell
                align="left"
                style={{
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#545454",
                  borderBottom: "none",
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
            }}
          >
              
              
              {Array.isArray(subjects?.result) && subjects.result.map((subject, index) => (
               

              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                    fontSize: "18px",
                    color: "#000000",
                    textAlign: "left",
                  }}
                >
                  {subject?.subjectCode}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#000000",
                  }}
                >
                  {subject?.subjectName}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#000000",
                  }}
                >
                  {subject?.class}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    fontFamily: "Rubik",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "18px",
                    color: "#000000",
                    margin: "auto",
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      width: "133px",
                      height: "42px",
                      backgroundColor: "#DB212B",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() => {
                      setItemToDelete({
                        class_code: subject.class,
                        subject_code: subject.subjectCode,
                      });
                      setShowDeleteConfirmationModal(true);
                    }}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} alignItems="center" marginTop={2}>
      <Pagination
        count={Math.ceil(total / limit)}
        page={page}
        onChange={onPageChange}
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
};

export default SubjectsTable;
