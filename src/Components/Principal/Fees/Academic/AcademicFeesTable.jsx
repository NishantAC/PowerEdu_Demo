import React, { useState } from "react";
import "./AcademicFees.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "./Modal";
import FeeTypeService from "../../../../services/feetyp.service";

// function createData(sno, feestype, amount, duedate, latepayment) {
//   return { sno, feestype, amount, duedate, latepayment };
// }

// const rows = [
//   createData('1.', 'Academic Q1', '3000', '25-08-2021', '3000', 'Anvi Saxena'),
//   createData('2.', 'Academic Q2', '3000', '25-08-2021', '3000', 'Anvi Saxena'),
//   createData('3.', 'Academic Q3', '3000', '25-08-2021', '3000', 'Anvi Saxena'),
//   createData('4.', 'Academic Q4', '3000', '25-08-2021', '3000', 'Anvi Saxena'),
//   createData('5.', 'Academic Q5', '3000', '25-08-2021', '3000', 'Anvi Saxena'),
//   createData('6.', 'Academic Q6', '3000', '25-08-2021', '3000', 'Anvi Saxena'),
// ];

function AcademicFeesTable({ data }) {
  const [modalData, setModalData] = useState([]);

  //get fee breakdown data for modal
  const setRowData = (data) => {
    FeeTypeService.getFeeStructure({ feeTypeId: data.fee_type_id })
      .then((res) => {
        setModalData(res);
      })
      .catch((err) => console.error(err));
  };

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
              <TableCell className="tabrowcell">Fees Type</TableCell>
              <TableCell align="left" className="tabrowcell">
                Amount
              </TableCell>
              <TableCell align="left" className="tabrowcell">
                Due Date
              </TableCell>
              <TableCell align="left" className="tabrowcell">
                Late Payment
              </TableCell>
              <TableCell align="left" className="tabrowcell">
                Class
              </TableCell>
              <TableCell align="left" className="tabrowcell">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="tabbody">
            {data?.map((row) => (
              <TableRow
                key={row.rollno}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="tabrow"
              >
                <TableCell className="tabrow2cell">
                  {`${row?.fee_type} ${row?.frequency}`}
                </TableCell>
                <TableCell align="left" className="tabrow2cell">
                  &#8377;&nbsp;{row?.amount}
                </TableCell>
                <TableCell align="left" className="tabrow2cell">
                  {row?.due_date}
                </TableCell>
                <TableCell align="left" className="tabrow2cell">
                  &#8377;&nbsp;{row?.late_payment}
                </TableCell>
                <TableCell align="left" className="tabrow2cell">
                  {row?.class_code}
                </TableCell>
                <TableCell
                  align="left"
                  className="tabrow2cell"
                  onClick={() => setRowData(row)}
                >
                  {" "}
                  <Modal data={modalData} total={row.amount} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AcademicFeesTable;
