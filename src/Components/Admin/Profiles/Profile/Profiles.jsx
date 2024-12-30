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
import {toast} from 'sonner'
 

function Profiles() {
  const [profileType, setProfileType] = useState("teachers");
  const location = useLocation();
  const { user: currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce delay
  const { allStudents, total: totalStudents } = useSelector((state) => state.student);
  const themeProperties = useSelector(selectThemeProperties);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    setProfileType(lastPart);
  }, [location.pathname]);

  // Fetch data on the first render without any filter or search string
  useEffect(() => {
    if (profileType === "students") {
      dispatch(
        fetchAllStudents({
          school_code: currentUser.schoolcode,
          class_code: classFilter,
          year: parseInt(academicYearFilter),
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
    setLoading(false);
  }, [profileType, currentUser.schoolcode, dispatch]);

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
  const [limit] = window.innerHeight > 850 ? window.innerHeight > 960 ? useState(9) : useState(7) : useState(5);
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    setFiltersApplied(!!classFilter || !!academicYearFilter);
  }, [classFilter, academicYearFilter]);


  const handleSearchAPI = async () => {
    setLoading(true);
    
    const body = {
      school_code: currentUser.schoolcode,
      year: parseInt(academicYearFilter),
      searchTerm: debouncedSearchTerm,
    };
  
    if (profileType === "students") {
      body.class_code = classFilter;
    } else {
      body.profile = profileType;
    }
  
    try {
      let result;
      switch (profileType) {
        case "students":
          result = await StudentService.searchStudents(body);
          
          break;
        case "teachers":
          result = await SchoolUsersService.getAllTeachersByYearSearch(body);
          break;
        case "principal":
        case "accountant":
        case "staff":
          result = await SchoolUsersService.getAllOtherManagementMembersByYearSearch(body);
          break;
        default:
          throw new Error("Invalid profile type");
      }
      setFilteredUsers(result);
      setLoading(false);
    } catch (error) {
      console.error(`Error fetching ${profileType}:`, error);
      setLoading(false);
    }
  };


  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearchAPI();
    }
  }, [debouncedSearchTerm]);

  const handleApplyFilter = () => {
    setLoading(true);
    setFiltersApplied(true);
    if (profileType === "students") {
      dispatch(
        fetchAllStudents({
          school_code: currentUser.schoolcode,
          class_code: classFilter,
          year: parseInt(academicYearFilter),
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
    setLoading(false);
  };

  useEffect(() => {
    dispatch(getDropdownClasses({ schoolcode: currentUser.schoolcode }));
    dispatch(getAcademicYearsDropdown({ schoolcode: currentUser.schoolcode }));
    handleApplyFilter(); 
  }, [currentUser.schoolcode, dispatch]);


  useEffect(() => {
    handleApplyFilter();
  }, [page]);

  // Automatically apply filter when classFilter or academicYearFilter changes
  useEffect(() => {
    handleApplyFilter();
  }, [classFilter, academicYearFilter]);
  
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
    
    setPage(value);
  };


  return (
    <div className="p-1 rounded-[20px] h-full">
      <div className="rounded-[18px] p-8 h-full flex flex-col gap-4"
      style={{
        // background: themeProperties?.boxBackgroundSolid,

      }}
      >
      <div className="flex justify-between items-center "
      style={{ color: themeProperties?.textColorAlt , 
      }}
      >

        <div>
        <h3 className="font-semibold text-2xl"
          style={{ color: themeProperties?.textColor }}
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

        <div className="flex max-md:flex-col gap-10 w-96 justify-center items-center relative">
            <SearchBarComponent
              searchString={searchTerm}
              setSearchString={setSearchTerm}
              handleChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your emails here..."
            />
        </div>

        <div className="">  
          <div className="flex gap-4">
            <Select
              value={academicYearFilter}
              onValueChange={setAcademicYearFilter}
              style = {{color: themeProperties?.textColorAlt}}
            >
              <SelectTrigger className="w-[140px]"
              style = {{color: themeProperties?.textColor}}
              >
                <SelectValue placeholder="Select an academic year">
                  {academicYearFilter}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className=" font-normal">Academic Year</SelectLabel>
                  {academicYearsDropdown?.map((year) => (
                    <SelectItem key={year} value={year}
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>


            {profileType === "students" && (
              <Select value={classFilter} onValueChange={setClassFilter}
              style = {{color: themeProperties?.textColorAlt, 
              }}
              >
                <SelectTrigger className="w-[140px]" 
                style ={{color: themeProperties?.textColor}}
                >
                  <SelectValue placeholder="Select a class" >
                    {classFilter}
                  </SelectValue>

                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className= " font-normal">Classes</SelectLabel>
                    {classes?.map((c) => (
                      <SelectItem key={c} value={c}                      >
                        {c}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>

      <div className=" flex-1 relative">
        <ProfileTable 
          profileType={profileType} 
          allUsers={filteredUsers}
          page={page}
          limit={limit}
          total={allUsers.count}
          onPageChange={handlePageChange} 
          themeProperties={themeProperties}
          isLaoding = {loading}
        />
      </div>
      </div>
    </div>
  );
}

export default Profiles;