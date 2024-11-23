import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../Academic/AcademicFees.css";

// function createData(sno, name, studentclass, rollno, pendingamount, amountpaid, totalamount, lastpaid, duedate) {
//   return { sno, name, studentclass, rollno, pendingamount, amountpaid, totalamount, lastpaid, duedate };
// }

// const rows = [
//   createData('1.', 'Vinay Parida', '5 A', '23', '3000', '1,500', '4,500', '31-12-2021', '06-01-2022'),
//   createData('2.', 'Neha Jain', '6 A', '12', '9000', '3,500', '12,500', '31-12-2021', '14-03-2022'),
//   createData('3.', 'Anshika Rawat', '7 A', '03', '4500', '2,300', '6,800', '31-12-2021', '18-03-2022'),
//   createData('4.', 'Jaydeep Sarkar', '8 A', '18', '12,000', '3,000', '15,000', '31-12-2021', '19-04-2022'),
//   createData('5.', 'Jaydeep Sarkar', '9 A', '24', '3000', '1,000', '4,000', '31-12-2021', '18-03-2022'),
//   createData('6.', 'Jaydeep Sarkar', '9 A', '05', '9000', '4,000', '13,000', '31-12-2021', '19-04-2022'),
// ];

function PendingFeesTable({ data }) {
  return (
    <div>
      <TableContainer component={Paper} style={{ height: "320px" }}>
        <Table aria-label="simple table">
          <TableHead
            style={{
              backgroundColor: "#FaFaFa",
              position: "sticky",
              zIndex: 1,
              top: 0,
              border: "1px solid #A5A5A5",
              boxSizing: "border-box",
              borderRadius: "5px",
            }}
          >
            <TableRow className="tabrow ">
              <TableCell className="tabrowcell">Name</TableCell>
              <TableCell align="left" className="tabrowcell">
                Fee type
              </TableCell>
              <TableCell align="left" className="tabrowcell">
                Class
              </TableCell>
              <TableCell align="left" className="tabrowcell">
                Roll No.
              </TableCell>
              <TableCell align="left" className="tabrowcell">
                Pending Amount
              </TableCell>
              <TableCell align="left" className="tabrowcell">
                Amount Paid
              </TableCell>
              <TableCell align="left" className="tabrowcell">
                Total Amount
              </TableCell>
              <TableCell align="left" className="tabrowcell">
                Last Paid On
              </TableCell>
              <TableCell align="left" className="tabrowcell">
                Due Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="tabbody">
            {data?.map((row, i) => (
              <TableRow
                key={i}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="tabrow"
              >
                <TableCell className="tabrow2cell">{`${row?.users_student?.details?.firstname} ${row?.users_student?.details?.lastname}`}</TableCell>
                <TableCell align="left" className="tabrow2cell">
                  {row?.fee?.fee_type}
                </TableCell>
                <TableCell align="left" className="tabrow2cell">
                  {row?.fee?.class_code}
                </TableCell>
                <TableCell align="left" className="tabrow2cell">
                  {row?.users_student?.rollno[row?.fee?.academic_year]}
                </TableCell>
                <TableCell align="left" className="tabrow2cell">
                  &#8377;&nbsp;
                  <span style={{ color: "#FF2934" }}>{`${
                    row?.fee?.amount - row?.paid_amount
                  }`}</span>
                </TableCell>
                <TableCell align="left" className="tabrow2cell">
                  &#8377;&nbsp;{row?.paid_amount}
                </TableCell>
                <TableCell align="left" className="tabrow2cell">
                  &#8377;&nbsp;{row?.fee?.amount}
                </TableCell>
                <TableCell align="left" className="tabrow2cell">
                  {new Date(row?.updatedAt)?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell align="left" className="tabrow2cell">
                  {row?.fee?.due_date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PendingFeesTable;
