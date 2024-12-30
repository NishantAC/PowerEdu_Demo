import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

function UserFeeDetailsTable({ studentDetails }) {
  
  let paidbtn = {
    background: "#3CB532",
    color: "white",
    padding: "5px 12px",
    borderRadius: "5px",
    border: "none",
    width: "60px",
    margin: "0",
    textAlign: "center",
    fontSize: "15px",
  };
  let pendingbtn = {
    background: "#CF232C",
    color: "white",
    padding: "5px 12px",
    borderRadius: "5px",
    border: "none",
    width: "80px",
    margin: "0",
    textAlign: "center",
    fontSize: "15px",
  };

  const [isEditBtnOn, setEditBtnOn] = useState(false);

  return (
    <div>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "500px", backgroundColor: "#F9F9F9" }}
      >
        <Table
          stickyHeader
          sx={{ maxHeight: "100%" }}
          aria-label="striped table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "17px",
                  color: "inherit",
                  borderRight: "1px solid #D7D7D7",
                  width: "100px",
                }}
              ></TableCell>
              <TableCell
                align="left"
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "17px",
                  color: "inherit",
                  borderRight: "1px solid #D7D7D7",
                }}
              >
                Fees
              </TableCell>
              <TableCell
                align="left"
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "17px",
                  color: "inherit",
                  borderRight: "1px solid #D7D7D7",
                }}
              >
                Amount
              </TableCell>
              <TableCell
                align="left"
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "17px",
                  color: "inherit",
                  borderRight: "1px solid #D7D7D7",
                }}
              >
                Date Generated
              </TableCell>
              <TableCell
                align="left"
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "17px",
                  color: "inherit",
                  borderRight: "1px solid #D7D7D7",
                }}
              >
                Due Date
              </TableCell>
              <TableCell
                align="left"
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "17px",
                  color: "inherit",
                  borderRight: "1px solid #D7D7D7",
                }}
              >
                <div
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  Paid Amount
                </div>
              </TableCell>
              <TableCell
                align="left"
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "17px",
                  color: "inherit",
                  borderRight: "1px solid #D7D7D7",
                  // backgroundColor: editMode === true ? "#3A4B8D" : "",
                  // color: editMode === true ? "white" : "#545454",
                }}
              >
                Pending Amount
              </TableCell>
              <TableCell
                align="left"
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "17px",
                  color: "inherit",
                  borderRight: "1px solid #D7D7D7",
                  // backgroundColor: editMode === true ? "#3A4B8D" : "",
                  // color: editMode === true ? "white" : "#545454",
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell
              rowSpan={studentDetails?.studentAcademicFeeData.length + 1}
              align="left"
              style={{
                paddingTop: "15px",
                paddingBottom: "15px",
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "17px",
                color: "inherit",
                borderRight: "1px solid #D7D7D7",
                width: "100px",
              }}
            >
              <div
                style={{
                  transform:
                    studentDetails?.studentAcademicFeeData.length > 2
                      ? "rotate(-90deg)"
                      : "",
                }}
              >
                Academics
              </div>
            </TableCell>
            {studentDetails?.studentAcademicFeeData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={{ padding: "0px 14px" }}
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
                    borderRight: "1px solid #D7D7D7",
                    cursor: "pointer",
                  }}
                >
                  {row?.fee?.fee_type}
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
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  {row?.fee?.amount}
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
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  NA
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#000000",
                    borderRight: "1px solid #D7D7D7",
                    padding: "0px",
                    width: "200px",
                  }}
                >
                  {row?.fee?.due_date}
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
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  {row?.paid_amount}
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
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  {row?.fee?.amount - row?.paid_amount}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  <p
                    style={
                      row?.fee?.amount - row?.paid_amount === 0
                        ? paidbtn
                        : pendingbtn
                    }
                  >
                    {row?.fee?.amount - row?.paid_amount === 0
                      ? "Paid"
                      : "Pending"}
                  </p>
                </TableCell>
              </TableRow>
            ))}

            <TableCell
              rowSpan={studentDetails?.studentTransportFeeData.length + 1}
              align="left"
              style={{
                paddingTop: "15px",
                paddingBottom: "15px",
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "17px",
                color: "inherit",
                borderRight: "1px solid #D7D7D7",
                width: "100px",
              }}
            >
              <div
                style={{
                  transform:
                    studentDetails?.studentAcademicFeeData.length > 2
                      ? "rotate(-90deg)"
                      : "",
                }}
              >
                Transport
              </div>
            </TableCell>
            {studentDetails?.studentTransportFeeData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={{ padding: "0px 14px" }}
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
                    borderRight: "1px solid #D7D7D7",
                    cursor: "pointer",
                  }}
                >
                  {row?.fee?.fee_type}
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
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  {row?.fee?.amount}
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
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  NA
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#000000",
                    borderRight: "1px solid #D7D7D7",
                    padding: "0px",
                    width: "200px",
                  }}
                >
                  {row?.fee?.due_date}
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
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  {row?.paid_amount}
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
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  {row?.fee?.amount - row?.paid_amount}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  <p
                    style={
                      row?.fee?.amount - row?.paid_amount === 0
                        ? paidbtn
                        : pendingbtn
                    }
                  >
                    {row?.fee?.amount - row?.paid_amount === 0
                      ? "Paid"
                      : "Pending"}
                  </p>
                </TableCell>
              </TableRow>
            ))}

            <TableCell
              rowSpan={studentDetails?.studentExtracurricularFeeData.length + 1}
              align="left"
              style={{
                paddingTop: "15px",
                paddingBottom: "15px",
                fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "17px",
                color: "inherit",
                borderRight: "1px solid #D7D7D7",
                width: "100px",
              }}
            >
              <div
                style={{
                  transform:
                    studentDetails?.studentExtracurricularFeeData.length > 2
                      ? "rotate(-90deg)"
                      : "",
                }}
              >
                Extracurricular
              </div>
            </TableCell>
            {studentDetails?.studentExtracurricularFeeData.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={{ padding: "0px 14px" }}
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
                    borderRight: "1px solid #D7D7D7",
                    cursor: "pointer",
                  }}
                >
                  {row?.fee?.fee_type}
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
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  {row?.fee?.amount}
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
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  NA
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#000000",
                    borderRight: "1px solid #D7D7D7",
                    padding: "0px",
                    width: "200px",
                  }}
                >
                  {row?.fee?.due_date}
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
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  {row?.paid_amount}
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
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  {row?.fee?.amount - row?.paid_amount}
                </TableCell>
                <TableCell
                  style={{
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    borderRight: "1px solid #D7D7D7",
                  }}
                >
                  <p
                    style={
                      row?.fee?.amount - row?.paid_amount === 0
                        ? paidbtn
                        : pendingbtn
                    }
                  >
                    {row?.fee?.amount - row?.paid_amount === 0
                      ? "Paid"
                      : "Pending"}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserFeeDetailsTable;
