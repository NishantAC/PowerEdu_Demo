import * as React from 'react';
import style from './Fees.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FeesStructure from './FeesStructure';
import FeesSlip from './FeeSlip';

import styles from './Student.module.css';

function createData(feestype, amount, duedate, latepayment, datesubmitted) {
  return {feestype, amount, duedate, latepayment, datesubmitted};
}

const rows = [
  createData('Transport Q1', '₹  '+4000, '25-8-2021', '₹  '+5000, '25-8-2021'),
  createData('Transport Q2', '₹  '+4000, '25-8-2021', '₹  '+5000, '__'),
];

export default function TransportFeeTable() {
  
  return (
    <TableContainer className={styles.tableCon} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className={styles.pdLeft}>
            <TableCell className={styles.tabCell}>Fees Type</TableCell>
            <TableCell className={styles.tabCell}>Amount</TableCell>
            <TableCell className={styles.tabCell}>Due Date</TableCell>
            <TableCell className={styles.tabCell}>Late Payment</TableCell>
            <TableCell className={styles.tabCell}>Date Submitted</TableCell>
            <TableCell className={styles.tabCell}>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.feestype}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className={styles.pdLeft}
            >
              <TableCell className={styles.tabCell2}>{row.feestype}</TableCell>
              <TableCell className={styles.tbCell2}>{row.amount}</TableCell>
              <TableCell className={styles.tabCell2}>{row.duedate}</TableCell>
              <TableCell className={styles.tbCell2}>{row.latepayment}</TableCell>
              <TableCell className={styles.tbCell2}>{row.datesubmitted}</TableCell>
              <TableCell className={styles.tbCell2}>
              {row.duedate === '__' ? (
                  <button disabled style={{ cursor: "not-allowed" }} className={style.feebutton}>View Fees Structure</button>
                ): 
                  <button disabled className={style.feebutton1}><FeesStructure/></button>
                }
                {row.datesubmitted === '__' ? (
                  <button style={{ cursor: "not-allowed" }} className={style.feebutton}>Download Receipt</button>
                ):
                  <button className={style.feebutton2}><FeesSlip/></button>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
