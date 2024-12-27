import React, { useEffect, useState } from "react";
import Papa from "papaparse"; // Import PapaParse library for CSV parsing
import ExcelJS from "exceljs"; // Import ExcelJS library for Excel file parsing
import { toast } from "sonner";

function UploadMarks({
  tableData,
  setTableData,
  setMsg,
  setNewMarks,
  validate,
}) {

  const checkColumnNames = (columnNames) => {
    const expectedColumns = [
      'user_id',
      'rollno', 
      'studentname', 
      'marks_obtained', 
      'grade'
    ];

    return JSON.stringify(columnNames) === JSON.stringify(expectedColumns);
  };


  const saveUploadedMarks = (uploadedData) => {
    if (uploadedData.length > 0) {
      const marksToBeAdded = [];

      uploadedData.forEach((data) => {
        const index = tableData.findIndex((item) => item.user_id === data.user_id);
        if (index !== -1) {
          marksToBeAdded.push(data);
        }
      });
  
      setTableData(uploadedData);
      if (validate()) {
        setNewMarks(marksToBeAdded);
      }
    }
  };
  
  const parseFileData = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(data);
      const sheet = workbook.worksheets[0];
      const jsonData = [];

      sheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          jsonData.push(row.values);
        }
      });

      const parsedData = [];
      let isError = false;
      for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i];
        const userId = row[1];
        const rollno = row[2];
        const studentname = row[3];

        // Check if studentname, and rollno are present and non-empty
        if (
          userId != undefined &&
          rollno !== undefined &&
          studentname !== undefined &&
          userId != "" &&
          rollno !== "" &&
          studentname !== ""
        ) {
          const obtainedmarks = row[4];
          const grade = row[5];

          parsedData.push({
            user_id: userId,
            rollno: Number(rollno),
            studentname,
            marks_obtained: obtainedmarks,
            grade,
          });
        } else {
          isError = true;
        }
      }

      if (isError) {
        setMsg("Error! Some rows have missing markid, studentid, or studentname.");
        return;
      }

      // Append parsedData to existing tableData
      saveUploadedMarks([...parsedData]);
    };

    // Read the file as array buffer
    reader.readAsArrayBuffer(file);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      event.target.value = null;
      if (file.type === "text/csv") {
        // Parse CSV file
        Papa.parse(file, {
          complete: (results) => {
            const columnNames = results.data[0];

            if (!checkColumnNames(columnNames)) {
              setMsg("Error! Columns must match");
              return;
            }

            const parsedData = [];

            for (let i = 1; i < results.data.length; i++) {
              const row = results.data[i];
              const userId = row[0]
              const rollno = row[1];
              const studentname = row[2];

              // Check if markid, studentid, and studentname are present and non-empty
              if (userId !== undefined && rollno !== undefined && studentname !== undefined &&
                userId !== "" && rollno !== "" && studentname !== "") {
                const obtainedmarks = row[3];
                const grade = row[4];

                parsedData.push({
                  user_id: userId,
                  rollno: Number(rollno),
                  studentname,
                  marks_obtained: obtainedmarks,
                  grade,
                });
              }
            }

            //saveUploadedMarks(parsedData);
            // Assuming setMsg is defined elsewhere
            setMsg("success");
          },
          error: () => {
            // Assuming setMsg is defined elsewhere
            setMsg("error");
          },
        });
      } else {
        parseFileData(file);
      }
    }
  };
  return (
    <div>
      <input
        type="file"
        accept=".csv, .xls, .xlsx"
        className="importinput"
        title=""
        onChange={handleFileUpload}
      />
    </div>
  );
}

export default UploadMarks;
