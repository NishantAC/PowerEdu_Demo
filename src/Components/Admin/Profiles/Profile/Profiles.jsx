import React, { useEffect, useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WestIcon from "@mui/icons-material/West";
import { Link } from "react-router-dom";
import ProfileTable from "./ProfileTable";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchAllAccountant,
  fetchAllPrincipal,
  fetchAllStaff,
  fetchAllTeachers,
  getAcademicYearsDropdown,
} from "../../../../slices/admin";
import { fetchAllStudents } from "../../../../slices/student";
import { getDropdownClasses } from "../../../../slices/principal";
import useDebounce from "../../../../Utils/debounce";
import StudentService from "../../../../services/student.service";
import SchoolUsersService from "../../../../services/schoolusers.service";
import { selectThemeProperties } from "@/slices/theme";
import SearchBarComponent from "@/Components/SearcBar/SearchBar";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 

function Profiles() {
  const [profileType, setProfileType] = useState("teachers");
  const location = useLocation();
  const { user: currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce delay
  const { allStudents, total: totalStudents } = useSelector((state) => state.student);
  const themeProperties = useSelector(selectThemeProperties);

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    setProfileType(lastPart);
  }, [location.pathname]);

  const { 
    allTeachers, 
    total: totalTeachers,       // Assuming you have a total count for teachers
    allPrincipal, 
    total: totalPrincipal,      // Assuming you have a total count for principals
    allAccountant, 
    total: totalAccountant,     // Assuming you have a total count for accountants
    allStaff, 
    total: totalStaff           // Assuming you have a total count for staff
  } = useSelector((state) => state.admin);

  
  const { classes } = useSelector((state) => state.principal);
  const { academicYearsDropdown } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  const getCurrentAcademicYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    return currentMonth > 6 ? currentYear : currentYear - 1;
  };

  const [classFilter, setClassFilter] = useState("1A");
  const [academicYearFilter, setAcademicYearFilter] = useState(
    getCurrentAcademicYear()
  );

  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    setFiltersApplied(!!classFilter || !!academicYearFilter);
  }, [classFilter, academicYearFilter]);


  let total;
  if (profileType === "students") {
    total = totalStudents;
  } else if (profileType === "teachers") {
    total = allTeachers.length;
  } else if (profileType === "principal") {
    total = allPrincipal.length;
  } else if (profileType === "accountant") {
    total = allAccountant.length;
  } else if (profileType === "staff") {
    total = allStaff.length;
  } else {
    total = 0;
  }


  const handleSearchAPI = async () => {
    if (profileType === "students") {
      try {
        const body = {
          school_code: currentUser.schoolcode,
          class_code: classFilter,
          year: parseInt(academicYearFilter),
          searchTerm: debouncedSearchTerm,
        };
        console.log("beforeresultworks")
        const result = await StudentService.searchStudents(body);
        console.log(result.students,"resultconsole57457")
        setFilteredUsers(result); // Update filtered users
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
    else if (profileType === "teachers") {
      try {
        const body = {
          school_code: currentUser.schoolcode,
          class_code: classFilter,
          year: parseInt(academicYearFilter),
          searchTerm: debouncedSearchTerm,
        };
        const result = await SchoolUsersService.getAllTeachersByYearSearch(body);
        setFilteredUsers(result); // Update filtered users
      } catch (error) {
        console.error("Error fetching students:", error);
      }   
  }
  else if (profileType === "principal") {
    try {
      const body = {
        school_code: currentUser.schoolcode,
        year: parseInt(academicYearFilter),
        profile: "principal",
        searchTerm: debouncedSearchTerm,
      };
      const result = await SchoolUsersService.getAllOtherManagementMembersByYearSearch(body);
      setFilteredUsers(result); // Update filtered users
    } catch (error) {
      console.error("Error fetching students:", error);
    }   
  }
  else if (profileType === "accountant") {
    try {
      const body = {
        school_code: currentUser.schoolcode,
        year: parseInt(academicYearFilter),
        profile: "accountant",
        searchTerm: debouncedSearchTerm,
      };
      const result = await SchoolUsersService.getAllOtherManagementMembersByYearSearch(body);
      setFilteredUsers(result); // Update filtered users
    } catch (error) {
      console.error("Error fetching students:", error);
    }   
  }
  else if (profileType === "staff") {
    try {
      const body = {
        school_code: currentUser.schoolcode,
        year: parseInt(academicYearFilter),
        profile: "staff",
        searchTerm: debouncedSearchTerm,
      };
      const result = await SchoolUsersService.getAllOtherManagementMembersByYearSearch(body);
      setFilteredUsers(result); // Update filtered users
    } catch (error) {
      console.error("Error fetching students:", error);
    }   
  }
}


  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearchAPI();
    }
  }, [debouncedSearchTerm]);

  const handleApplyFilter = () => {
    setFiltersApplied(true);
    if (profileType === "students") {
      dispatch(
        fetchAllStudents({
          school_code: currentUser.schoolcode,
          class_code: classFilter,
          year: parseInt(academicYearFilter),
          // profile: "student",
          page,
          limit,
        })
      );
    } else if (profileType === "teachers") {
      dispatch(
        fetchAllTeachers({
          school_code: currentUser.schoolcode,
          year: parseInt(academicYearFilter),
          profile: "teacher",
          page,
          limit,
        })
      );
    } else if (profileType === "principal") {
      dispatch(
        fetchAllPrincipal({
          school_code: currentUser.schoolcode,
          year: parseInt(academicYearFilter),
          profile: "principal",
          page,
          limit,
        })
      );
    } else if (profileType === "accountant") {
      dispatch(
        fetchAllAccountant({
          school_code: currentUser.schoolcode,
          year: parseInt(academicYearFilter),
          profile: "accountant",
          page,
          limit,       
        })
      );
    } else if (profileType === "staff") {
      dispatch(
        fetchAllStaff({
          school_code: currentUser.schoolcode,
          year: parseInt(academicYearFilter),
          profile: "staff",
          page,
          limit,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getDropdownClasses({ schoolcode: currentUser.schoolcode }));
    dispatch(getAcademicYearsDropdown({ schoolcode: currentUser.schoolcode }));
    handleApplyFilter(); // Fetch the data based on initial filters
  }, [currentUser.schoolcode, dispatch]);


  useEffect(() => {
    handleApplyFilter();
  }, [page]);
  
  useEffect(() => {
    if (profileType === "students") {
      setAllUsers(allStudents);
    } else if (profileType === "teachers") {
      setAllUsers(allTeachers);
    } else if (profileType === "principal") {
      setAllUsers(allPrincipal);
    } else if (profileType === "accountant") {
      setAllUsers(allAccountant);
    } else if (profileType === "staff") {
      setAllUsers(allStaff);
    }
  }, [allStudents, allTeachers, allPrincipal, allAccountant, allStaff, profileType]);

  useEffect(() => {
    setFilteredUsers(allUsers);
  }, [allUsers]);

  const handlePageChange = (event, value) => {
    console.log(value,"vlaueofpage")
    setPage(value);
  };


  return (
    <div className="studentattendance p-4">
      <div>
        <h3 className="font-semibold mt-8 text-2xl"
          style={{ color: themeProperties?.textColorAlt }}
        >
          {`${
            profileType === "students"
              ? "Student"
              : profileType === "teachers"
              ? "Teacher"
              : profileType === "principal"
              ? "Principal"
              : "Staff"
          } Details`}
        </h3>
      </div>
      <br />
      <div className="flex flex-row-reverse justify-between items-center flex-wrap gap-2.5">
        <div className="filtersContainer">
          <p className=" font-medium text-xl text-black my-auto">
            Filters:
          </p>
          <div className="flex gap-4">
            <Select
              value={academicYearFilter}
              onValueChange={setAcademicYearFilter}
              style = {{color: themeProperties?.textColorAlt}}
            >
              <SelectTrigger className="w-[140px]"
              style = {{color: themeProperties?.textColorAlt}}
              >
                <SelectValue placeholder="Select an academic year">
                  {academicYearFilter}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className=" font-normal">Academic Year</SelectLabel>
                  {academicYearsDropdown?.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>


            {profileType === "students" && (
              <Select value={classFilter} onValueChange={setClassFilter}
              style = {{color: themeProperties?.textColorAlt}}
              >
                <SelectTrigger className="w-[140px]" 
                style ={{color: themeProperties?.textColorAlt}}
                >
                  <SelectValue placeholder="Select a class" >
                    {classFilter}
                  </SelectValue>

                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className= " font-normal">Classes</SelectLabel>
                    {classes?.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            <button
              className="rounded-md text-white p-1.5 text-lg"
              style = {{background: themeProperties?.primaryColor}}
              onClick={handleApplyFilter}
            >
              Apply
            </button>
          </div>
        </div>
        <div className="flex max-md:flex-col gap-10 w-96 justify-center items-center relative">
            <SearchBarComponent
              searchString={searchTerm}
              setSearchString={setSearchTerm}
              handleChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {!filtersApplied && (
        <div className="mt-8 text-center text-red-500">
          Please apply filters to see the results.
        </div>
      )}

      <div className="mt-8">
        <ProfileTable 
          profileType={profileType} 
          allUsers={filteredUsers}
          page={page}
          limit={limit}
          total={allUsers.count}
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
}

export default Profiles;
