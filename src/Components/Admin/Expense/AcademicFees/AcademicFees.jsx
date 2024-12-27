import React, { useEffect, useState } from "react";
import "./AcademicFees.css";
import { toast } from "sonner";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WestIcon from "@mui/icons-material/West";
import { Link } from "react-router-dom";
import InputParent from "./InputParent";
import Select from "./Select";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";
import RangeDateSelector from "./RangeDateSelector";
import SingleDateSelector from "./SingleDateSelector";
import ExpenseTable from "./Table/ExpenseTable";
import TimePeriodSelector from "./TimePeriodSelector";
import { useDispatch, useSelector } from "react-redux";
import classService from "../../../../services/class.service";
import AcademicFeesService from "../../../../services/academicfees.service";
import { getAcademicYearsDropdown } from "../../../../slices/admin";

function AcademicFees() {
  const { user } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const [formValues, setFormValues] = useState({
    school_code: user?.schoolcode,
    academic_year: null,
    class_code: "",
    start_date: null,
    end_date: null,
    amount: "",
    due_date: "",
    time_period: "",
    late_payment: "",
    after_due_date: "",
    late_time_period: "",
  });

  const clearForm = () => {
    setFormValues({
      school_code: user?.schoolcode,
      academic_year: null,
      class_code: "",
      start_date: null,
      end_date: null,
      amount: "",
      due_date: "",
      time_period: "",
      late_payment: "",
      after_due_date: "",
      late_time_period: "",
    });
  };

  const [classesDropdown, setClassesDropdown] = useState([]);
  const [allFees, setAllFees] = useState([]);

  // const totalRecords = allFees.count

  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user?.schoolcode !== undefined) {
      classService
        .getDropdownClasses(user.schoolcode,page,limit)
        .then((res) => setClassesDropdown(res));

      // classService.getDropdownClasses(user?.schoolcode).then((res) => {
      //   const uniqueClasses = [
      //     ...new Set(res.map((cls) => cls.replace(/[A-Z]/g, ""))),
      //   ];
      //   setClassesDropdown(uniqueClasses);
      // });

      dispatch(
        getAcademicYearsDropdown({ schoolcode: user?.schoolcode, page, limit })
      );
      AcademicFeesService.getAllFees({
        school_code: user?.schoolcode,
        page,
        limit,
      }).then((res) => {
        setAllFees(res);
      });
    }
  }, [user, page]);

  const { academicYearsDropdown } = useSelector((state) => state.admin);

  const [classFilter, setClassFilter] = useState("all");
  const [academicYearFilter, setAcademicYearFilter] = useState("all");

  const handleApplyFilter = () => {
    AcademicFeesService.getAllFees({
      school_code: user?.schoolcode,
      class_code: classFilter === "all" ? null : classFilter,
      year:
        parseInt(academicYearFilter) === "all"
          ? null
          : parseInt(academicYearFilter),
    }).then((res) => {
      setAllFees(res);
    });
  };

  const [filteredFees, setFilteredFees] = useState(allFees);

  useEffect(() => {
    setFilteredFees(allFees);
  }, [allFees, page]);

  const searchFees = (event) => {
    const searchValue = event.target.value;
    // const filteredResults = subjects?.filter(
    //   (fee) =>
    //     subject.subjectCode.toString().includes(searchValue) ||
    //     subject.subjectName.includes(searchValue)
    // );
    // setFilteredSubjects(filteredResults);
    console.log(searchValue);
  };

  const [itemToDelete, setItemToDelete] = useState(-1);
  const [isEditMode, setEditMode] = useState(false);

  const switchToEditMode = (id) => {
    setEditMode(true);
    clearForm();
    AcademicFeesService.getFee({ id: id }).then((data) => {
      console.log(data);
      setFormValues({
        ...formValues,
        id: data.id,
        academic_year: data.academic_year,
        class_code: data.class_code,
        start_date: data.start_date,
        end_date: data.end_date,
        amount: data.amount,
        due_date: data.due_date,
        time_period: data.time_period,
        late_payment: data.late_payment,
        after_due_date: data.after_due_date,
        late_time_period: data.late_time_period,
      });
    });
  };

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  function correctFormatDate(date) {
    if (date) {
      const dateArray = date.split("-");
      const year = dateArray[0];
      const month = dateArray[1];
      const day = dateArray[2];
      return `${day}-${month}-${year}`;
    }
  }

  return (
    <div className="subjectsContainer">
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "20px",
        }}
      >
        {/* left area */}
        <div
          style={{ color: "#4D4D4D", display: "flex", alignItems: "center" }}
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
            Expense
          </div>
        </div>

        {/* right area */}
        <Link to="/home" style={{ textDecoration: "none" }}>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <WestIcon style={{ color: "#5F5F5F" }} />
            <div
              style={{
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "24px",
                letterSpacing: "4%",
                color: "#414141",
              }}
            >
              Back
            </div>
          </div>
        </Link>
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div>
          <h3
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              marginTop: "30px",
              fontSize: "25px",
            }}
          >
            Expense
          </h3>
        </div>

        <div
          style={{
            width: "100%",
            minHeight: "280px",
            boxShadow: "0 2px 7px 0 rgba(52, 52, 52, 0.35)",
            borderRadius: "5px",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "64px",
              backgroundColor: "#F9F9F9",
              borderRadius: "5px 5px 0px 0px",
              paddingLeft: "10px",
              fontFamily: "Poppins",
              fontSize: "20px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
            }}
          >
            Academic Fees
          </div>
          <form>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "30px",
                padding: "20px 20px 60px 20px",
              }}
            >
              <div className="classAcademicFees">
                <Select
                  text="Class"
                  options={classesDropdown}
                  placeHolder="Select Class"
                  info={formValues.class_code}
                  setInfo={(selectedClassCode) =>
                    setFormValues({
                      ...formValues,
                      class_code: selectedClassCode,
                    })
                  }
                />
              </div>

              <div className="academicYear">
                <Select
                  text="Academic Year *"
                  options={academicYearsDropdown}
                  placeHolder="Select year"
                  info={formValues.academic_year}
                  setInfo={(selectedYear) =>
                    setFormValues({
                      ...formValues,
                      academic_year: selectedYear,
                    })
                  }
                />
              </div>

              <RangeDateSelector
                correctFormatDate={correctFormatDate}
                isEditMode={isEditMode}
                info={{
                  start_date: formValues.start_date,
                  end_date: formValues.end_date,
                }}
                setInfo={(selectedDates) =>
                  setFormValues({
                    ...formValues,
                    start_date: selectedDates.start_date,
                    end_date: selectedDates.end_date,
                  })
                }
              />
              {/* Due Date */}

              {/* <SingleDateSelector
                correctFormatDate={correctFormatDate}
                isEditMode={isEditMode}
                info={formValues.due_date}
                setInfo={(selectedDueDate) =>
                  setFormValues({
                    ...formValues,
                    due_date: selectedDueDate,
                  })
                }
              /> */}

              <div className="amount">
                <InputParent text="Amount *">
                  <input
                    placeholder="Enter Amount"
                    value={formValues.amount}
                    onChange={(e) => {
                      const input = e.target.value;
                      // Validate if input is numeric or empty
                      if (/^\d*$/.test(input) || input === "") {
                        setFormValues({
                          ...formValues,
                          amount: input === "" ? "" : parseInt(input),
                        });
                      }
                    }}
                    className="inputBox"
                  />
                </InputParent>
              </div>

              {/* Due Date */}

              <SingleDateSelector
                correctFormatDate={correctFormatDate}
                isEditMode={isEditMode}
                info={formValues.due_date}
                setInfo={(selectedDueDate) =>
                  setFormValues({
                    ...formValues,
                    due_date: selectedDueDate,
                  })
                }
              />

              <div className="timePeriod">
                <TimePeriodSelector
                  text="Time Period *"
                  // text="Due Day *"
                  placeHolder="Select Period"
                  options={["Monthly", "Quarterly", "Half-Yearly", "Annually"]}
                  // formValues={formValues}
                  // setFormValues={setFormValues}
                  info={formValues.time_period}
                  setInfo={(selectedTimePeriod) =>
                    setFormValues({
                      ...formValues,
                      time_period: selectedTimePeriod,
                    })
                  }
                />
              </div>

              {/* late payment */}

              <div className="latePayment">
                <InputParent text="Late Payment *">
                  <input
                    placeholder="Enter Amount"
                    value={formValues.late_payment}
                    onChange={(e) => {
                      const input = e.target.value;
                      // Validate if input is numeric or empty
                      if (/^\d*$/.test(input) || input === "") {
                        setFormValues({
                          ...formValues,
                          late_payment: input === "" ? "" : parseInt(input),
                        });
                      }
                    }}
                    className="inputBox"
                  />
                </InputParent>
              </div>

              <div className="afterDueDate">
              <InputParent text="Amount (after due date)*">

                {/* <InputParent text="Fine Amount *"> */}
                  <input
                    placeholder="Enter Amount"
                    value={formValues.after_due_date}
                    onChange={(e) => {
                      const input = e.target.value;
                      // Validate if input is numeric or empty
                      if (/^\d*$/.test(input) || input === "") {
                        setFormValues({
                          ...formValues,
                          after_due_date: input === "" ? "" : parseInt(input),
                        });
                      }
                    }}
                    className="inputBox"
                  />
                </InputParent>
              </div>

              <div className="timePeriod">
                <TimePeriodSelector
                  // text="Fine Frequency *"
                  text="Time Period *"

                  placeHolder="Select Period"
                  options={["Day", "Week", "Month", "Year"]}
                  // formValues={formValues}
                  // setFormValues={setFormValues}
                  info={formValues.late_time_period}
                  setInfo={(selectedTimePeriod) =>
                    setFormValues({
                      ...formValues,
                      late_time_period: selectedTimePeriod,
                    })
                  }
                />
              </div>
            </div>
          </form>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "40px",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              fontFamily: "Rubik",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            <button
              style={{
                width: "96px",
                height: "36px",
                backgroundColor: "white",
                border: "1px solid #C14D4D",
                color: " #C14D4D",
                borderRadius: "5px",
              }}
              onClick={clearForm}
            >
              Reset
            </button>
            <button
              style={{
                width: "96px",
                height: "36px",
                backgroundColor: "#204DF9",
                border: "none",
                color: "white",
                borderRadius: "5px",
              }}
              onClick={() => {
                console.log(formValues);
                if (isEditMode) {
                  AcademicFeesService.updateFees(formValues).then((data) => {
                    console.log("updated", data);
                    clearForm();
                    handleApplyFilter();
                    setEditMode(false);
                  });
                } else {
                  AcademicFeesService.addFees(formValues).then((data) => {
                    console.log("Added", data);
                    clearForm();
                    handleApplyFilter();
                  });
                }
              }}
            >
              {isEditMode ? "Update" : "Add"}
            </button>
          </div>
        </div>
        {/* Filters */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div className="filtersContainer">
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
            <div className="filters">
              <select
                value={academicYearFilter}
                onChange={(e) => {
                  setAcademicYearFilter(e.target.value);
                }}
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
              <button
                className="stdntAttndnceApplyBtn"
                onClick={handleApplyFilter}
              >
                Apply
              </button>
            </div>
          </div>
          {/* <div className="searchBar">
            <SearchRoundedIcon />
            <input
              type="text"
              onChange={searchFees}
              placeholder="Search by subject name or code"
            />
          </div> */}
        </div>

        <div
          style={{
            width: "100%",
            height: "300px",
            backgroundColor: "red",
          }}
        >
          <ExpenseTable
            correctFormatDate={correctFormatDate}
            feesList={allFees}
            setItemToDelete={setItemToDelete}
            switchToEditMode={switchToEditMode}
            showDeleteConfirmationModal={showDeleteConfirmationModal}
            setShowDeleteConfirmationModal={setShowDeleteConfirmationModal}
            page={page}
            limit={limit}
            total={allFees.count}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {showDeleteConfirmationModal && (
        <DeleteConfirmationModal
          itemToDelete={itemToDelete}
          setItemToDelete={setItemToDelete}
          onClick={() => setShowDeleteConfirmationModal(false)}
        />
      )}
    </div>
  );
}

export default AcademicFees;
