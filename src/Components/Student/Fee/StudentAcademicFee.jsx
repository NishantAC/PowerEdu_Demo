import * as React from "react";
import FeeTypeService from "../../../services/feetyp.service";
import style from "./Fees.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FeesStructure from "./FeesStructure";
import FeesSlip from "./FeeSlip";

import styles from "./Student.module.css";

export default function AcademicFeeTable(props) {
  
  //Table data
  let row = props.rows[0];

  /**
   * TO download pdf
   */
  const downloadPdf = async () => {
    FeeTypeService.getPdf({ feeTypeId: row.pdfFile })
      .then(async (response) => {
        
        const contentDisposition = response.headers["content-disposition"];
        const match = contentDisposition.match(/filename="(.+)"/);
        const fetchedFilename = match ? match[1] : "file.pdf";
        const blob = new Blob([response.data], { type: "application/pdf" });
        saveAs(blob, fetchedFilename);
      })
      .catch((error) => {
        
      });
  };

  return (
    <TableContainer className={styles.tableCon}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.tabCell}>Fees Type</TableCell>
            <TableCell className={styles.tabCell}>Amount</TableCell>
            <TableCell className={styles.tabCell}>Due Date</TableCell>
            <TableCell className={styles.tabCell}>Late Payment</TableCell>
            <TableCell className={styles.tabCell}>Date Submitted</TableCell>
            <TableCell className={styles.tabCell}>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.rows.map((row) => (
            <TableRow
              key={row.feestype}
              sx={{
                "&:last-child td, &:last-child th": {
                  borderBottom: "1px solid #D7D7D7",
                },
              }}
            >
              <TableCell
                className={styles.tabCell2}
              >{`${row?.fee_type} ${row?.frequency}`}</TableCell>
              <TableCell className={styles.tbCell2}>₹ {row?.amount}</TableCell>
              <TableCell className={styles.tabCell2}>
                {" "}
                {row?.due_date}
              </TableCell>
              <TableCell
                className={styles.tbCell2}
                style={{ color: "#FF2934" }}
              >
                ₹ {row?.late_payment}
              </TableCell>
              <TableCell className={styles.tbCell2}>
                {row.payment_date ? row.payment_date : "---"}
              </TableCell>
              <TableCell className={styles.tbCell2}>
                <button
                  className={style.feebutton1}
                  onClick={() => {
                    props?.setRowData(row, false);
                  }}
                >
                  View Fee Structure
                </button>
                {/* if fee submitted then show download button - (onclick sending table data) */}
                {row?.payment_date && (
                  <button
                    className={style.feebutton2}
                    onClick={() => {
                      props?.setRowData(row, true);
                    }}
                  >
                    Download
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
