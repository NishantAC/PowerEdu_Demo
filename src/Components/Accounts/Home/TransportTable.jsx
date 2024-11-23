import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function TransportTable({
  feeList,
  setFeeList,
  editMode,
  setEditMode,
  selectedRows,
  setSelectedRows,
  handlePaidAmountChange,
  setSelectedStudentId,
  page,
  limit,
  total,
  onPageChange,
}) {
  console.log(feeList);
  const handleHeaderCheckboxChange = (event) => {
    if (event.target.checked) {
      const ids = feeList.map((row, index) => index);
      setSelectedRows(ids);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, id]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((rowId) => rowId !== id)
      );
    }
  };

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

  // const handlePaidAmountChange = (event, index) => {
  //   const { value } = event.target;
  //   setFeeList((prevFeeList) => {
  //     const updatedFeeList = [...prevFeeList];
  //     updatedFeeList[index].paid_amount = value === "" ? 0 : parseInt(value); // Assuming paid_amount is a numeric value
  //     return updatedFeeList;
  //   });
  // };

  const [isEditBtnOn, setEditBtnOn] = useState(false);

  return (
    <div>
      <TableContainer component={Paper} style={{ height: "420px" }}>
        <Table
          stickyHeader
          sx={{ maxHeight: "100%" }}
          // aria-label="striped table"
        >
          <TableHead
            style={
              {
                // border: "1px solid #A5A5A5",
                // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                // borderRadius: "5px",
                // overflowY: "auto",
                // padding: "0px 14px",
              }
            }
          >
            <TableRow>
              {editMode && (
                <TableCell
                  align="left"
                  style={{
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "17px",
                    borderRight: "1px solid #D7D7D7",
                    backgroundColor: editMode === true ? "#3A4B8D" : "",
                    color: editMode === true ? "white" : "#545454",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeContent: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="all"
                      value="all"
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                      }}
                      onChange={handleHeaderCheckboxChange}
                    />
                  </div>
                </TableCell>
              )}
              <TableCell
                align="left"
                style={{
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  fontFamily: "Lato",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "17px",
                  borderRight: "1px solid #D7D7D7",
                  backgroundColor: editMode === true ? "#3A4B8D" : "",
                  color: editMode === true ? "white" : "#545454",
                }}
              >
                Student Name
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
                  borderRight: "1px solid #D7D7D7",
                  backgroundColor: editMode === true ? "#3A4B8D" : "",
                  color: editMode === true ? "white" : "#545454",
                }}
              >
                Admission No.
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
                  borderRight: "1px solid #D7D7D7",
                  backgroundColor: editMode === true ? "#3A4B8D" : "",
                  color: editMode === true ? "white" : "#545454",
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
                  borderRight: "1px solid #D7D7D7",
                  backgroundColor: editMode === true ? "#3A4B8D" : "",
                  color: editMode === true ? "white" : "#545454",
                }}
              >
                <div
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  Paid Amount
                  {editMode && (
                    <div onClick={() => setEditBtnOn(!isEditBtnOn)}>
                      <CreateOutlinedIcon
                        style={{
                          color: isEditBtnOn ? "orange" : "white",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  )}
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
                  borderRight: "1px solid #D7D7D7",
                  backgroundColor: editMode === true ? "#3A4B8D" : "",
                  color: editMode === true ? "white" : "#545454",
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
                  borderRight: "1px solid #D7D7D7",
                  backgroundColor: editMode === true ? "#3A4B8D" : "",
                  color: editMode === true ? "white" : "#545454",
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feeList.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={{ padding: "0px 14px" }}
              >
                {editMode && (
                  <TableCell
                    align="left"
                    style={{
                      paddingTop: "15px",
                      paddingBottom: "15px",
                      fontFamily: "Lato",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "17px",
                      color: "#545454",
                      borderRight: "1px solid #D7D7D7",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "grid",
                        placeContent: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="all"
                        value="all"
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                        checked={selectedRows.includes(index)}
                        onChange={(event) =>
                          handleRowCheckboxChange(event, index)
                        }
                      />
                    </div>
                  </TableCell>
                )}
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
                  onClick={() => {
                    setSelectedStudentId(row.user_id);
                  }}
                >
                  {`${row.users_student.firstname} ${row.users_student.middlename} ${row.users_student.lastname}`}
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
                  {row.user_id}
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
                  {row?.total_amount}
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
                  <input
                    value={row.paid_amount}
                    onChange={(event) =>
                      handlePaidAmountChange(row.id, event.target.value)
                    }
                    {...(isEditBtnOn ? {} : { readOnly: true })}
                    style={{
                      height: "100%",
                      width: "100%",
                      border: "none",
                      outline: "none",
                      padding: "0px 20px",
                    }}
                  />
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
                  {row.total_amount - row.paid_amount}
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
                  <p style={row.pending_amount === 0 ? paidbtn : pendingbtn}>
                    {row.pending_amount === 0 ? "Paid" : "Pending"}
                  </p>
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
      <div style={{ textAlign: "center", marginTop: "10px", fontFamily: "Poppins", fontSize: "16px", color: "#545454", fontWeight:"bold"}}>
        {`You are on page ${page}`}
      </div>
    </div>
  );
}

export default TransportTable;
