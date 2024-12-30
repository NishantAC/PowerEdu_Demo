import React, { useState } from "react";
import "./Folder.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DownloadFile from "./DownloadFile";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteModal from "./DeleteModal";
import { Link, useLocation } from "react-router-dom";
import { KeyboardBackspaceOutlined } from "@mui/icons-material";

function createData(sno, subject, academicYear, examType, action) {
  return { sno, subject, academicYear, examType, action };
}

const rows = [
  createData("1", "Maths", "2023", "Half-Yearly", ""),
  createData("2", "Science", "2022", "Annual", ""),
  createData("3", "Maths", "2020", "Half-Yearly", ""),
  createData("4", "Maths", "2023", "Annual", ""),
];

function FolderTable() {
  const location = useLocation();
  const papers = location.state?.papers;
  

  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState(null);

  const handleOpen = (id) => {
    setRowId(id);
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  return (
    <div className="foldertable">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "30px",
        }}
      >
        <h3>Download Question Papers</h3>
        <Link
          to="/teacher/upload-paper"
          style={{ textDecoration: "none", marginLeft: "auto" }}
        >
          <button
            style={{
              display: "flex",
              background: "transparent",
              fontSize: "20px",
              border: "none",
            }}
          >
            <KeyboardBackspaceOutlined
              style={{ verticalAlign: "middle", marginTop: "5px" }}
            />
            Back
          </button>
        </Link>
      </div>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "none", width: "85%", marginTop: "20px" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow style={{ padding: "2px" }}>
              <TableCell
                style={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#545454",
                  borderBottom: "none",
                  textAlign: "left",
                  padding: "18px 0px",
                }}
              >
                Subject
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
                  padding: "18px 10px",
                }}
              >
                Academic Year
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
                  padding: "18px 10px",
                }}
              >
                Exam Type
              </TableCell>
              {/* <TableCell align="left" style={{ fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '600', fontSize: '20px', color: '#545454', borderBottom: 'none', padding: '18px 0px' }}>Time</TableCell> */}
              <TableCell
                align="left"
                style={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "#545454",
                  borderBottom: "none",
                  padding: "18px 0px",
                  width: "20%",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {papers?.map((row) => (
              <TableRow
                key={row.sno}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={{ padding: "2px" }}
              >
                <TableCell
                  style={{
                    padding: "12px 0px",
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#000000",
                    textAlign: "left",
                  }}
                >
                  {row.subject}
                </TableCell>
                {/* <TableCell align="left" style={{ padding: '12px 0px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{row.subject}</TableCell> */}
                <TableCell
                  align="left"
                  style={{
                    padding: "12px 15px",
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#000000",
                  }}
                >
                  {row.academicyear}
                </TableCell>
                <TableCell
                  align="left"
                  style={{
                    padding: "12px 0px",
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#000000",
                  }}
                >
                  {row.examtype}
                </TableCell>

                {/* <TableCell align="left" style={{ padding: '12px 0px', fontFamily: 'Lato', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', color: '#000000' }}>{row.time}</TableCell> */}
                <TableCell
                  align="left"
                  style={{
                    padding: "12px 0px",
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "500",
                    color: "#000000",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    width: "20%",
                  }}
                >
                  <span style={{ display: "flex" }}>
                    <DownloadFile paperfile={row.paper}/>
                    <button
                      onClick={() => handleOpen(row.id)}
                      style={{
                        background: "#ff4122",
                        padding: "4px 8px",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        marginLeft: "8px",
                      }}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </button>
                    
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteModal paperId={rowId} open={open} handleClose={handleClose} />
    </div>
  );
}

export default FolderTable;
