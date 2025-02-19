import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WestIcon from "@mui/icons-material/West";
import SubjectsTable from "./SubjectsTable";
import { useDispatch, useSelector } from "react-redux";
import classService from "../../../services/class.service";
import {
  getAllDropdownSubjectsByClass,
  getSubjectsOfClasses,
} from "../../../slices/subject";
import SubjectService from "../../../services/subject.service";
import useDebounce from "../../../Utils/debounce";
import AddSubjectForm from "./AddSubjectForm"; // Import the new component
import SearchBarComponent from "@/Components/SearcBar/SearchBar";
import { selectThemeProperties } from "@/slices/theme";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputField from "@/Components/InputField/InputField";

function Subjects() {
  const { user } = useSelector((state) => state.user);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce delay
  const { subjects, status } = useSelector((state) => state.subject);
  const { classes } = useSelector((state) => state.manageClasses);
  const themeProperties = useSelector(selectThemeProperties);
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const [classFilter, setClassFilter] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedSearchTerm) {
      const searchSubjectsAPI = async () => {
        try {
          const body = {
            school_code: user?.school_id,
            searchTerm: debouncedSearchTerm,
            limit,
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

  const getLimit = () => {
    const height = window.innerHeight;
    const intHeight = parseInt(height / 100);
    return intHeight - 1;
  };

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(getLimit());

  useEffect(() => {
    const intHeight = getLimit();
    setLimit(intHeight);
  }, [window.innerHeight, page, totalSubjects]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (user && user?.school_id !== undefined && classFilter !== null) {
      dispatch(getSubjectsOfClasses(classFilter));
    }
  }, [user, classFilter]);

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const [itemToDelete, setItemToDelete] = useState({
    class_code: null,
    subject_code: null,
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term as user types
  };

  const sortClassCodes = (a, b) => {
    const regex = /^(\d+)([A-Za-z]*)$/;
    const aMatch = a.class_code.match(regex);
    const bMatch = b.class_code.match(regex);

    if (aMatch && bMatch) {
      const aNum = parseInt(aMatch[1], 10);
      const bNum = parseInt(bMatch[1], 10);

      if (aNum !== bNum) {
        return aNum - bNum;
      }

      return aMatch[2].localeCompare(bMatch[2]);
    }

    return a.class_code.localeCompare(b.class_code);
  };

  useEffect(() => {
    if (classes?.data) {
      const sortedClasses = classes.data.slice().sort(sortClassCodes);
      setClassFilter(sortedClasses[0]?.class_code);
    }
  }, [classes]);

  const handleClassChange = (value) => {
    setClassFilter(value);
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
            <Select onValueChange={handleClassChange}>
              <SelectTrigger>
                <SelectValue placeholder={classFilter} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {classes?.data
                    ?.slice() // Create a shallow copy of the array
                    .sort(sortClassCodes)
                    .map((classItem) => (
                      <SelectItem
                        key={classItem.class_code}
                        value={classItem.class_code}
                      >
                        {classItem.class_code}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
          }}
        >
     
            <SubjectsTable
              showDeleteConfirmationModal={showDeleteConfirmationModal}
              setShowDeleteConfirmationModal={setShowDeleteConfirmationModal}
              setItemToDelete={setItemToDelete}
              subjects={subjects?.data}
              page={page}
              limit={limit}
              total={subjects.count}
              onPageChange={handlePageChange}
              themeProperties={themeProperties}
              isLoading={status === "loading"}
            />
        </div>
      </div>
    </div>
  );
}

export default Subjects;