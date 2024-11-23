import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AttendanceModel = ({ openAttendence, handleClose, data }) => {
  const getRemark = (remark) => {
    let buttonText;
    let buttonClass;

    switch (remark) {
      case "p":
        buttonText = "P";
        buttonClass = "attendancebtn1";
        break;
      case "a":
        buttonText = "A";
        buttonClass = "attendancebtn2";
        break;
      case "l":
        buttonText = "L";
        buttonClass = "attendancebtn3";
        break;
      default:
        buttonText = "Unknown";
        buttonClass = "attendancebtn";
    }

    return <button className={buttonClass}>{buttonText}</button>;
  };

  return (
    <Modal
      open={openAttendence}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <TableContainer component={Paper} sx={style}>
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
                Date
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
                Status
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
            {data.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={{ padding: "0px 14px" }}
              >
                <TableCell
                  align="left"
                  style={{
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#000000",
                  }}
                >{`${row.date}`}</TableCell>
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
                  {getRemark(row?.remark)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Modal>
  );
};

export default AttendanceModel;
