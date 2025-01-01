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
import AddSubjectForm from "./AddSubjectForm"; // Import the new component
import SearchBarComponent from "@/Components/SearcBar/SearchBar";
import SelectBox from "../../InputField/SelectBox";

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term as user types
  };

  return (
    <div className="subjectsContainer">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
            <div className="">
              
              <SelectBox
                options={classesDropdown}
                info={formValues.class}
                setInfo={(selectedValue) =>
                  setFormValues({ ...formValues, class: selectedValue })
                }
                placeHolder="Select Class"
              />
             
            </div>
          <div className="fixed left-1/2 top-0 transform -translate-x-1/2 z-[10000]">
            <SearchBarComponent
              searchTerm={searchTerm}
              placeholder="Search Subjects"
              handleChange={handleSearchChange}
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
