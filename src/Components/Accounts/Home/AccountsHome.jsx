import React, { useContext, useEffect, useState } from "react";
import "./AccountsHome.css";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AcademicTable from "./AcademicTable";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import classService from "../../../services/class.service";
import { getAcademicYearsDropdown } from "../../../slices/admin";
import AcademicFeesService from "../../../services/academicfees.service";
import AcademicFeePaidService from "../../../services/academicfeepaid.service";
import * as XLSX from "xlsx";
import UserFeeDetailsModal from "./UserFeeDetailsModal";
import TransportFeePaidService from "../../../services/transportfeepaid.service";
import ExtracurricularFeePaidService from "../../../services/extracurricularfeepaid.service";
import TransportTable from "./TransportTable";
import ExtracurricularTable from "./ExtracurricularTable";

function AccountsHome() {
  const { user } = useSelector((state) => state.user);
  const [classesDropdown, setClassesDropdown] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user?.schoolcode !== undefined) {
      classService
        .getDropdownClasses(user?.schoolcode)
        .then((res) => setClassesDropdown(res));
      dispatch(getAcademicYearsDropdown({ schoolcode: user?.schoolcode }));
    }
  }, [user]);

  const [classFilter, setClassFilter] = useState("all");

  const { academicYearsDropdown } = useSelector((state) => state.admin);
  const [academicYearFilter, setAcademicYearFilter] = useState("all");
  const [intervalsDropdown, setIntervalsDropdown] = useState([]);
  const [intervalFilter, setIntervalFilter] = useState("all");
  const [selectedFeeType, setSelectedFeeType] = useState("academic");

  useEffect(() => {
    if (
      user &&
      user?.schoolcode !== undefined &&
      classFilter &&
      academicYearFilter
    ) {
      AcademicFeesService.uniqueFrequencies({
        school_code: user?.schoolcode,
        class_code: classFilter === "all" ? null : classFilter,
        year: academicYearFilter === "all" ? null : academicYearFilter,
      }).then((data) => {
        setIntervalsDropdown(data);
      });
    }
  }, [classFilter, academicYearFilter, user]);

  const [feeList, setFeeList] = useState([]);

  const handleApplyFilter = () => {
    if (selectedFeeType === "academic") {
      AcademicFeePaidService.getAllFeesPaid({
        school_code: user?.schoolcode,
        class_code: classFilter === "all" ? null : classFilter,
        year:
          academicYearFilter === "all" ? null : parseInt(academicYearFilter),
        interval: intervalFilter === "all" ? null : intervalFilter,
      }).then((res) => {
        console.log(res.data);
        setFeeList(res.data);
      });
    }

    if (selectedFeeType === "transport") {
      TransportFeePaidService.getAllFeesPaid({
        school_code: user?.schoolcode,
        year:
          academicYearFilter === "all" ? null : parseInt(academicYearFilter),
        interval: intervalFilter === "all" ? null : intervalFilter,
      }).then((res) => {
        console.log(res.data);
        setFeeList(res.data);
      });
    }

    if (selectedFeeType === "extracurricular") {
      ExtracurricularFeePaidService.getAllFeesPaid({
        school_code: user?.schoolcode,
        class_code: classFilter === "all" ? null : classFilter,
        year:
          academicYearFilter === "all" ? null : parseInt(academicYearFilter),
        interval: intervalFilter === "all" ? null : intervalFilter,
      }).then((res) => {
        console.log(res.data);
        setFeeList(res.data);
      });
    }
  };

  const [updatedFeeList, setUpdatedFeeList] = useState([]);

  const handlePaidAmountChange = (id, newAmount) => {
    setFeeList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? { ...item, paid_amount: newAmount === "" ? 0 : parseInt(newAmount) }
          : item
      )
    );

    setUpdatedFeeList((prevList) => {
      const isExisting = prevList.find((item) => item.id === id);
      if (isExisting) {
        return prevList.map((item) =>
          item.id === id
            ? {
                ...item,
                paid_amount: newAmount === "" ? 0 : parseInt(newAmount),
              }
            : item
        );
      } else {
        const updatedItem = feeList.find((item) => item.id === id);
        return [
          ...prevList,
          {
            ...updatedItem,
            paid_amount: newAmount === "" ? 0 : parseInt(newAmount),
          },
        ];
      }
    });
  };

  const updatePaidAmount = () => {
    if (selectedFeeType === "academic") {
      AcademicFeePaidService.updatePaidAmounts(updatedFeeList)
        .then(() => {
          console.log("Updated Successfully");
          setEditMode(false);
          setSelectedRows([]);
          handleApplyFilter(); // Refresh the list after update
        })
        .catch((error) => {
          console.error("Error updating paid amounts:", error);
        });
    }

    if (selectedFeeType === "transport") {
      TransportFeePaidService.updatePaidAmounts(updatedFeeList)
        .then(() => {
          console.log("Updated Successfully");
          setEditMode(false);
          setSelectedRows([]);
          handleApplyFilter(); // Refresh the list after update
        })
        .catch((error) => {
          console.error("Error updating paid amounts:", error);
        });
    }

    if (selectedFeeType === "extracurricular") {
      ExtracurricularFeePaidService.updatePaidAmounts(updatedFeeList)
        .then(() => {
          console.log("Updated Successfully");
          setEditMode(false);
          setSelectedRows([]);
          handleApplyFilter(); // Refresh the list after update
        })
        .catch((error) => {
          console.error("Error updating paid amounts:", error);
        });
    }
  };

  const [editMode, setEditMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(-1);

  useEffect(() => {
    console.log(selectedStudentId);
  }, [selectedStudentId]);

  const exportToExcel = (exportOption) => {
    let filteredFeeList = feeList;
    if (exportOption === "paid") {
      filteredFeeList = filteredFeeList.filter(
        (fee) => fee.total_amount - fee.paid_amount === 0
      );
    } else if (exportOption === "unpaid") {
      filteredFeeList = filteredFeeList.filter(
        (fee) => fee.total_amount - fee.paid_amount > 0
      );
    }
    const workbook = XLSX.utils.book_new();
    const worksheetData = filteredFeeList.map((fee) => ({
      "Student Name": `${fee.users_student.firstname} ${fee.users_student.middlename} ${fee.users_student.lastname}`,
      "School Code": fee.school_code,
      "Class Code": fee.class_code,
      "Academic Year": fee.academic_year,
      "Frequency Time": fee.frequency,
      "Total Amount": fee.total_amount,
      "Paid Amount": fee.paid_amount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fees");
    XLSX.writeFile(workbook, `${exportOption}_fee_data.xlsx`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <>
        {!editMode && selectedStudentId === -1 ? (
          <div
            style={{
              color: "#4D4D4D",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "18px",
                fontWeight: "400",
              }}
            >
              Home
            </div>
            <KeyboardArrowRightIcon />
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "18px",
                fontWeight: "700",
                textDecoration: "underline",
              }}
            >
              School
            </div>
          </div>
        ) : (
          <div
            style={{
              color: "#4D4D4D",
              display: "flex",
              alignItems: "center",
            }}
          >
            <KeyboardArrowRightIcon style={{ transform: "rotate(180deg)" }} />
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "18px",
                fontWeight: "700",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                setEditMode(false);
                setSelectedStudentId(-1);
                setSelectedRows([]);
                handleApplyFilter();
              }}
            >
              Back
            </div>
          </div>
        )}
      </>

      {selectedStudentId !== -1 ? (
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <UserFeeDetailsModal selectedStudentId={selectedStudentId} />
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            <p
              style={{
                fontFamily: "Rubik",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "20px",
                color: "#000000",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              Filters:-
            </p>
            <div style={{ display: "flex", gap: "20px" }}>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                style={{
                  borderRadius: "5px",
                  fontSize: "17px",
                  padding: "4px 10px",
                  color: "#414141",
                }}
              >
                <option value="all">All</option>
                {classesDropdown?.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={academicYearFilter}
                onChange={(e) => setAcademicYearFilter(e.target.value)}
                style={{
                  borderRadius: "5px",
                  fontSize: "17px",
                  padding: "4px 10px",
                  color: "#414141",
                }}
              >
                <option value="all">All</option>
                {academicYearsDropdown?.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              {/* Frequency select */}
              <select
                value={intervalFilter}
                onChange={(e) => setIntervalFilter(e.target.value)}
                style={{
                  borderRadius: "5px",
                  fontSize: "17px",
                  padding: "4px 10px",
                  color: "#414141",
                }}
              >
                <option value="all">All</option>
                {intervalsDropdown?.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <button
                className="stdntAttndnceApplyBtn"
                onClick={handleApplyFilter}
              >
                Apply
              </button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              <button
                style={{
                  backgroundColor:
                    selectedFeeType === "academic" ? "#214DF9" : "transparent",
                  color: selectedFeeType === "academic" ? "white" : "#7E7E7E",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                }}
                onClick={() => setSelectedFeeType("academic")}
              >
                Academic
              </button>
              <button
                style={{
                  backgroundColor:
                    selectedFeeType === "transport" ? "#214DF9" : "transparent",
                  color: selectedFeeType === "transport" ? "white" : "#7E7E7E",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                }}
                onClick={() => setSelectedFeeType("transport")}
              >
                Transport
              </button>
              <button
                style={{
                  backgroundColor:
                    selectedFeeType === "extracurricular"
                      ? "#214DF9"
                      : "transparent",
                  color:
                    selectedFeeType === "extracurricular" ? "white" : "#7E7E7E",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                }}
                onClick={() => setSelectedFeeType("extracurricular")}
              >
                Extracurricular
              </button>
            </div>

            {!editMode ? (
              <button
                style={{
                  backgroundColor: "white",
                  border: "1px solid #214DF9",
                  color: "#214DF9",
                  borderRadius: "5px",
                  padding: "5px 10px",
                }}
                onClick={() => setEditMode(true)}
              >
                <CreateOutlinedIcon
                  style={{
                    fontSize: "18px",
                  }}
                />
                Update Fees
              </button>
            ) : (
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                {selectedRows.length > 0 && (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #214DF9",
                        color: "#214DF9",
                        borderRadius: "5px",
                        padding: "5px 10px",
                      }}
                      onClick={() => {
                        setFeeList(() => {
                          return feeList.map((fee, index) => {
                            if (selectedRows.includes(index)) {
                              console.log("id", fee.id);
                              handlePaidAmountChange(fee.id, fee.total_amount);
                            }
                            return fee;
                          });
                        });
                      }}
                    >
                      <CreateOutlinedIcon
                        style={{
                          verticalAlign: "middle",
                          marginRight: "3px",
                          fontSize: "18px",
                        }}
                      />{" "}
                      Mark Paid
                    </button>
                    <button
                      style={{
                        backgroundColor: "white",
                        border: "1px solid #214DF9",
                        color: "#214DF9",
                        borderRadius: "5px",
                        padding: "5px 10px",
                      }}
                      onClick={() => {
                        setFeeList(() => {
                          return feeList.map((fee, index) => {
                            if (selectedRows.includes(index)) {
                              handlePaidAmountChange(fee.id, 0);
                            }
                            return fee;
                          });
                        });
                      }}
                    >
                      <CreateOutlinedIcon
                        style={{
                          verticalAlign: "middle",
                          marginRight: "3px",
                          fontSize: "18px",
                        }}
                      />{" "}
                      Mark Unpaid
                    </button>
                  </div>
                )}

                <div style={{ position: "relative" }}>
                  <button
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #214DF9",
                      color: "#214DF9",
                      borderRadius: "5px",
                      padding: "5px 10px",
                    }}
                    onClick={() => setShowExportOptions(!showExportOptions)}
                  >
                    <CreateOutlinedIcon
                      style={{
                        verticalAlign: "middle",
                        marginRight: "3px",
                        fontSize: "18px",
                      }}
                    />
                    Export
                  </button>
                  {showExportOptions && (
                    <div
                      style={{
                        position: "absolute",
                        left: "0px",
                        top: "105%",
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "white",
                        zIndex: "5",
                      }}
                    >
                      <div
                        onClick={() => {
                          exportToExcel("all");
                        }}
                      >
                        All
                      </div>
                      <div
                        onClick={() => {
                          exportToExcel("paid");
                        }}
                      >
                        Paid
                      </div>
                      <div
                        onClick={() => {
                          exportToExcel("unpaid");
                        }}
                      >
                        Unpaid
                      </div>
                    </div>
                  )}
                </div>

                <button
                  disabled={!(updatedFeeList.length > 0)}
                  style={{
                    border:
                      updatedFeeList.length > 0 ? "1px solid #214DF9" : "none",
                    backgroundColor:
                      updatedFeeList.length > 0 ? "#214DF9" : "#E2E2E2",
                    color: updatedFeeList.length > 0 ? "white" : "#878787",
                    borderRadius: "5px",
                    padding: "5px 10px",
                  }}
                  onClick={updatePaidAmount}
                >
                  <CreateOutlinedIcon
                    style={{
                      verticalAlign: "middle",
                      marginRight: "3px",
                      fontSize: "18px",
                    }}
                  />
                  Save & Close
                </button>
              </div>
            )}
          </div>

          <div style={{ marginTop: "15px" }}>
            {selectedFeeType === "academic" && (
              <AcademicTable
                feeList={feeList}
                setFeeList={setFeeList}
                editMode={editMode}
                setEditMode={setEditMode}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                handlePaidAmountChange={handlePaidAmountChange}
                setSelectedStudentId={setSelectedStudentId}
              />
            )}

            {selectedFeeType === "transport" && (
              <TransportTable
                feeList={feeList}
                setFeeList={setFeeList}
                editMode={editMode}
                setEditMode={setEditMode}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                handlePaidAmountChange={handlePaidAmountChange}
                setSelectedStudentId={setSelectedStudentId}
              />
            )}

            {selectedFeeType === "extracurricular" && (
              <ExtracurricularTable
                feeList={feeList}
                setFeeList={setFeeList}
                editMode={editMode}
                setEditMode={setEditMode}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                handlePaidAmountChange={handlePaidAmountChange}
                setSelectedStudentId={setSelectedStudentId}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AccountsHome;
