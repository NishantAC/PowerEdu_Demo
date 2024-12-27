import React, { useEffect, useState } from "react";
import "./Subjects.css";
import { toast } from "sonner";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WestIcon from "@mui/icons-material/West";
import { Link } from "react-router-dom";
import InputParent from "../Profiles/EditProfile/InputParent";
import MultiSelectBox from "./Select";
import SubjectsTable from "./Table/SubjectsTable";
import DeleteConfirmationModal from "./Modal/DeleteConfirmationModal";
import SelectBox from "./SelectBox";
import { useDispatch, useSelector } from "react-redux";
import classService from "../../../services/class.service";
import {
  getAllDropdownSubjectsByClass,
  getSubjectsOfClasses,
} from "../../../slices/subject";
import SubjectService from "../../../services/subject.service";
import SubjectsListClassService from "../../../services/subjectslist_class.service";
import { resetSubjectsDropdown } from "../../../slices/subject";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useDebounce from "../../../Utils/debounce";


function Subjects() {
  const { user } = useSelector((state) => state.user);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce delay
  const { alldropdownClassSubjects, subjects } = useSelector(
    (state) => state.subject
  );

  const [filteredSubjects, setFilteredSubjects] = useState(subjects);

  useEffect(() => {
    // Perform the API call only when debouncedSearchTerm changes
    if (debouncedSearchTerm) {
      const searchSubjectsAPI = async () => {
        try {
          const body = {
            school_code: user?.schoolcode,
            searchTerm: debouncedSearchTerm,
          };
          const result = await SubjectService.getSearchSubjectsOfClasses(body);
          setFilteredSubjects(result); // Update the filtered subjects with API response
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      };

      searchSubjectsAPI();
    }
  }, [debouncedSearchTerm, user]);

  const [formValues, setFormValues] = useState({
    class: "",
    subjectName: [],
    subjectCode: [],
    noOfChapters: [],
  });

  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [classesDropdown, setClassesDropdown] = useState([]);

  // useEffect(() => {
  //   console.log(subjects);
  // }, [subjects]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user?.schoolcode !== undefined) {
      classService
        .getDropdownClasses(user?.schoolcode)
        .then((res) => setClassesDropdown(res));

      dispatch(
        getSubjectsOfClasses({
          school_code: user?.schoolcode,
          page,
          limit,
        })
      );
    }
  }, [user, page]);

  useEffect(() => {
    if (formValues.class.length > 0) {
      setFormValues({
        ...formValues,
        subjectName: [],
        subjectCode: [],
        noOfChapters: [],
      });

      dispatch(
        getAllDropdownSubjectsByClass({
          class_code: formValues.class,
        })
      );

      dispatch(
        getSubjectsOfClasses({
          school_code: user?.schoolcode,
          page,
          limit,
        })
      );
    }
  }, [formValues.class, user, page]);

  useEffect(() => {
    if (subjects) {
      setFilteredSubjects(subjects);
      setTotalSubjects(subjects.length); // Set total length here
    }
  }, [subjects, page]);

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const [itemToDelete, setItemToDelete] = useState({
    class_code: null,
    subject_code: null,
  });

  const [classFilter, setClassFilter] = useState("All");

  const handleApplyFilter = () => {
    setPage(1); // Reset page to 1 when applying a new filter

    dispatch(
      getSubjectsOfClasses({
        school_code: user?.schoolcode,
        class_code: classFilter === "All" ? null : classFilter,
        page,
        limit,
      })
    );
  };

  // useEffect(() => {
  //   setFilteredSubjects(subjects);
  // }, [subjects]);

  //   const searchSubjects = (event) => {
  //   const searchValue = event.target.value.toLowerCase();
  //   if (subjects?.result) {
  //     const filteredResults = subjects.result.filter((subject) => {
  //       const subjectCode = subject.subjectCode.toString();
  //       const subjectName = subject.subjectName.toLowerCase();
  //       return subjectCode.includes(searchValue) || subjectName.includes(searchValue);
  //     });

  //     // setFilteredSubjects(filteredResults); // Filter the subjects.result array
  //     setPage(1); // Reset pagination when filtering
  //   }
  // };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term as user types
  };

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
            Subjects
          </div>
        </div>

        {/* right area */}
        <Link to="/admin/home" style={{ textDecoration: "none" }}>
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
              Home
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
            All Subjects
          </h3>
        </div>
        <div
          style={{
            width: "100%",
            minHeight: "260px",
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
            Add Subject
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
              <div className="classNo" style={{ backgroundColor: "white" }}>
                <SelectBox
                  text="Class"
                  options={classesDropdown}
                  placeHolder=""
                  info={formValues.class}
                  setInfo={(selectedClass) =>
                    setFormValues({
                      ...formValues,
                      class: selectedClass,
                    })
                  }
                />
              </div>

              <div className="subjectName" style={{ position: "relative" }}>
                <MultiSelectBox
                  text="Subject(s) *"
                  placeholder="Enter Subject(s)"
                  options={alldropdownClassSubjects}
                  formValues={formValues}
                  setFormValues={setFormValues}
                />
              </div>

              <div className="subjectCode">
                <InputParent text="Subject Code">
                  <div
                    className="inputBox"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {formValues?.subjectCode?.join(", ")}
                  </div>
                </InputParent>
              </div>

              <div className="NoOfChapters">
                <InputParent text="No. Of Chapter(s)">
                  <div
                    className="inputBox"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {formValues?.noOfChapters?.join(", ")}
                  </div>
                </InputParent>
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
              onClick={() => {
                setFormValues({
                  class: "",
                  subjectName: [],
                  subjectCode: [],
                  noOfChapters: [],
                });
                dispatch(resetSubjectsDropdown()); // Clear the dropdown subjects
              }}
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
                const body = {
                  school_code: user?.schoolcode,
                  class_code: formValues.class,
                  newSubjects: formValues.subjectCode,
                };
                SubjectService.updateSubjectsOfClasses(body).then(() => {
                  console.log("Subjects Added");
                  setFormValues({
                    class: "",
                    subjectName: [],
                    subjectCode: [],
                    noOfChapters: [],
                  });
                  dispatch(
                    getSubjectsOfClasses({
                      school_code: user?.schoolcode,
                      page,
                      limit,
                    })
                  );
                });
              }}
            >
              Add
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
          <div className="searchBar">
            <SearchRoundedIcon />
            <input
              type="text"
              onChange={handleSearchChange}
              placeholder="Search by subject name or code"
            />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "300px",
            backgroundColor: "red",
          }}
        >
          <SubjectsTable
            showDeleteConfirmationModal={showDeleteConfirmationModal}
            setShowDeleteConfirmationModal={setShowDeleteConfirmationModal}
            setItemToDelete={setItemToDelete}
            subjects={filteredSubjects}
            // serachSubjects={filteredSubjectsSearch}
            page={page}
            limit={limit}
            total={subjects.count}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {showDeleteConfirmationModal && (
        <DeleteConfirmationModal
          itemToDelete={itemToDelete}
          onClick={() => setShowDeleteConfirmationModal(false)}
        />
      )}
    </div>
  );
}

export default Subjects;
