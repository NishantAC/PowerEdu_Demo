import React, { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import "./TestMarksTable.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DownloadSheet from "./DownloadSheet";
import { useDispatch, useSelector } from "react-redux";
import { updateStudentClassTestMarks, addTestMarks } from "../../../../../slices/classtest";
import UploadMarks from "./UploadMarks";
import { toast } from "react-toastify";

function TestMarksTable({ hide, test }) {
  const {user} = useSelector(state => state.user)
  const { studentTestMarks, isLoading, error } = useSelector((state) => state.classtest);
  const [tableData, setTableData] = useState(studentTestMarks);
  const [newMarks, setNewMarks] = useState();
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const [errorCells, setErrorCells] = useState([]);
  const [msg, setMsg] = useState("");
  console.log('classtest', tableData )
  useEffect(() => {
    setTableData(studentTestMarks);
  }, [studentTestMarks]);

  const validate = async () => {
    const errorCells = [];
    let errorMsg = "";

    await tableData.forEach((row, index) => {
      if (
        isNaN(row.marks_obtained) ||
        row.marks_obtained === "" ||
        Number.parseInt(row.marks_obtained) > Number.parseInt(test.max_marks) ||
        Number.parseInt(row.marks_obtained) < 0
      ) {
        errorCells.push(index);
      }
    });

    setErrorCells(errorCells);

    if (errorCells.length === 0) {
      errorMsg = "success";
    } else {
      errorMsg = "error";
    }

    setMsg(errorMsg);
  };

  const handleCellChange = (index, key, value) => {
    const newData = [...tableData];
    const updatedRow = { ...newData[index], [key]: value };
    newData[index] = updatedRow;
    setTableData(newData);
  };

  const handleUpdate = async () => {
    validate();
    if (msg !== "error" && errorCells?.length === 0) {
      if (newMarks?.length > 0) {
        await dispatch(
          addTestMarks({marks: newMarks, test_id: test.id })
        ).then((result) => {
          if (result.payload && result.payload.data) {
            // Dispatch succeeded, show success message
            setEdit(false);
            hide();
            toast.success(result.payload.message, {
              autoClose: 1000,
              position: "bottom-right",
            });
          } else {
            // Dispatch failed, show error message
            toast.error(result.payload.message || result.error.message, {
              autoClose: 1000,
              position: "bottom-right",
            });
            return
          }
        });
      }
      await dispatch(
        updateStudentClassTestMarks({ testMarks: tableData, test_id: test.id })
      ).then((result) => {
        if (result.payload && result.payload.successMessage) {
          // Dispatch succeeded, show success message
          setEdit(false);
          hide();
          toast.success(result.payload.successMessage, {
            autoClose: 1000,
            position: "bottom-right",
          });
        } else {
          // Dispatch failed, show error message
          toast.error(result.payload?.message || "Please enter the fields correctly!", {
            autoClose: 1000,
            position: "bottom-right",
          });
          return
        }
      });
    }
  };

  return (
    <div>
      <p className="backbtn">
        <button onClick={hide}>
          <b>
            <KeyboardBackspaceIcon
              style={{
                verticalAlign: "middle",
                fontSize: "18px",
                marginRight: "5px",
              }}
            />
            Back
          </b>
        </button>
      </p>

      <TableContainer component={Paper} style={{ maxHeight: "400px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                paddingLeft: "10px",
                background: "#3D628E",
                border: "1px solid #CECECE",
                boxSizing: "border-box",
                borderRadius: "5px",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <TableCell
                className="fixedcell"
                style={{
                  backgroundColor: "#3d628e",
                  border: "1px solid #CECECE",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fonstSize: "15px",
                  color: "white",
                  borderBottom: "none",
                  textAlign: "left",
                }}
              >
                Roll no.
              </TableCell>
              <TableCell
                align="center"
                className="fixedcell2"
                style={{
                  backgroundColor: "#3d628e",
                  border: "1px solid #CECECE",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fonstSize: "15px",
                  color: "white",
                  borderBottom: "none",
                }}
              >
                Student Name
              </TableCell>
              <TableCell
                align="center"
                className="scrollablecontainer"
                style={{
                  border: "1px solid #CECECE",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fonstSize: "15px",
                  color: "white",
                  borderBottom: "none",
                }}
              >
                Total Marks
              </TableCell>
              <TableCell
                align="center"
                className="scrollablecontainer"
                style={{
                  border: "1px solid #CECECE",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fonstSize: "15px",
                  color: "white",
                  borderBottom: "none",
                }}
              >
                Obtained Marks
              </TableCell>
              <TableCell
                align="center"
                className="scrollablecontainer"
                style={{
                  border: "1px solid #CECECE",
                  paddingTop: "18px",
                  paddingBottom: "18px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fonstSize: "15px",
                  color: "white",
                  borderBottom: "none",
                }}
              >
                Grades (Optional)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            style={{
              background: "#FFFFFF",
              border: "1px solid #CECECE",
              boxSizing: "border-box",
              borderRadius: "5px",
              overflowY: "auto",
              maxHeight: "100%",
            }}
          >
            {tableData.map((row, index) => (
              <TableRow
                key={row.user_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                style={{ paddingLeft: "10px", border: "1px solid #CECECE" }}
              >
                <TableCell
                  // className="fixedcell"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #CECECE",
                    paddingTop: "16px",
                    paddingBottom: "16px",
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "15px",
                    color: "#000000",
                    textAlign: "left",
                  }}
                >
                  {row.rollno}
                </TableCell>
                <TableCell
                  // className="fixedcell2"
                  size="small"
                  align="center"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #CECECE",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    fontFamily: "Roboto",
                    fontWeight: "400",
                    fontStyle: "normal",
                    fonstSize: "15px",
                    color: "#545454",
                    borderBottom: "none",
                  }}
                >
                  {row.studentname}
                </TableCell>
                <TableCell
                  size="small"
                  align="center"
                  style={{
                    backgroundColor: `${
                      test.max_marks === "" ? "#F53131" : " "
                    }`,
                    border: "1px solid #CECECE",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fonstSize: "15px",
                    color: "#545454",
                    borderBottom: "none",
                  }}
                >
                {test.max_marks}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: `${
                      errorCells.includes(index) ? "#F53131" : " "
                    }`,
                    border: "1px solid #CECECE",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fonstSize: "15px",
                    color: "#545454",
                    borderBottom: "none",
                  }}
                >
                  {edit ? (
                    <TextField
                      sx={{ width: "100px" }}
                      className="scrollablecontainer"
                      required
                      onChange={(e) => {
                        handleCellChange(
                          index,
                          "marks_obtained",
                          e.target.value
                        );
                      }}
                      error={errorCells.includes(index)}
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      //value={row.marks_obtained}
                      defaultValue={row.marks_obtained}
                    />
                  ) : (
                    <>{row.marks_obtained}</>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    border: "1px solid #CECECE",
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fonstSize: "15px",
                    color: "#545454",
                    borderBottom: "none",
                  }}
                >
                  {edit ? (
                    <TextField
                      sx={{ width: "100px" }}
                      className="scrollablecontainer"
                      required
                      onChange={(e) => {
                        handleCellChange(index, "grade", e.target.value);
                      }}
                      // error={!grade} // Assuming `obtMarks` is a non-empty string or a number
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      // value={grade}
                      defaultValue={row.grade}
                    />
                  ) : (
                    <>{row.grade}</>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="footerbutton">
        {msg === "success" && (
          <p
            style={{
              color: "green",
              marginTop: "-25px",
              left: "50%",
              position: "absolute",
            }}
          >
            No Error Found
          </p>
        )}
        {msg === "error" && (
          <p
            style={{
              color: "red",
              marginTop: "-25px",
              left: "50%",
              position: "absolute",
            }}
          >
            Validation Error
          </p>
        )}

        <label className="importlabel">
         <UploadMarks tableData={tableData} setTableData={setTableData} setErrorCells={setErrorCells} setMsg={setMsg} validate={validate} setNewMarks={setNewMarks}/>
          <FileUploadOutlinedIcon
            style={{ verticalAlign: "middle", marginRight: "5px" }}
          />
          Upload File
        </label>
        <label className="exportlabel" onClick={handleOpen}>
          <FileDownloadOutlinedIcon
            style={{ verticalAlign: "middle", marginRight: "5px" }}
          />
          Download
        </label>
        {!edit ? (
          <button className="verifybtn" onClick={() => setEdit(true)}>
            Edit
          </button>
        ) : (
          <button className="verifybtn" onClick={validate}>
            Validate
          </button>
        )}
        <button
          // disabled={tableData.some(
          //   (data) => data.totalmarks === "" || data.obtainedmarks === ""
          // )}
          onClick={handleUpdate}
          className="savendclosebtn"
        >
          Save & Close
        </button>
        <DownloadSheet
          open={open}
          handleClose={handleClose}
          tableData={studentTestMarks}
        />
      </div>
    </div>
  );
}

export default TestMarksTable;
