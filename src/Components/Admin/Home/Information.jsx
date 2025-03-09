import React, { useEffect, useState, useContext, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "@/common/constant";
import { selectThemeProperties } from "@/slices/theme";
import SchoolUsersService from "../../../services/schoolusers.service";
import UserAndCirculars from "./UserAndCirculars";
import StatsAndCharts from "./StatsAndCharts";
import "./Information.css";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Spinner from "@/Components/Spinner/Spinner";
import { Skeleton } from "@/components/ui/skeleton";
import debounce from "lodash.debounce";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor:
    theme.properties?.inputBackground ||
    alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease-in-out",
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: theme.spacing(2),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
}));

const token = JSON.parse(localStorage.getItem("powerEduAuthToken"));

function Information() {
  const { user } = useSelector((state) => state.user);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const [studentGenderCounts, setStudentGenderCounts] = useState(0);
  const [newlyAddedUsersArray, setNewlyAddedUsersArray] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [options, setOptions] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    SchoolUsersService.getTotalStudentsNumber(user?.school_id).then((res) =>
      setTotalStudents(res.totalStudentsNumber)
    );

    SchoolUsersService.getTotalTeachersNumber(user?.school_id).then((res) =>
      setTotalTeachers(res.totalTeachersNumber)
    );

    SchoolUsersService.getTotalStaffNumber(user?.school_id).then((res) =>
      setTotalStaff(res.totalStaffNumber)
    );

    SchoolUsersService.getStudentGenderCounts(user?.school_id).then((res) => {
      setStudentGenderCounts(res);
    });

    SchoolUsersService.newlyAddedUsers().then((res) => {
      setNewlyAddedUsersArray(res?.data);
    });
  }, [user]);

  const [deviceSize, setDeviceSize] = useState("pc");

  const chartData = [
    {
      id: 0,
      value: parseInt(studentGenderCounts.male, 10),
      label: "Male",
      color: "#4B7BEC",
    },
    {
      id: 1,
      value: parseInt(studentGenderCounts.female, 10),
      label: "Female",
      color: "#D980FA",
    },
    {
      id: 2,
      value: parseInt(studentGenderCounts.others, 10),
      label: "Others",
      color: "#F6B93B",
    },
  ];

  const yearArray = [];
  for (let year = 1951; year <= 2050; year++) {
    yearArray.push(year.toString());
  }

  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const doubleDigit = (monthNo) => {
    if (monthNo < 10) {
      return `0${monthNo}`;
    } else return monthNo;
  };

  const formattedCurrentDate = `${currentYear}-${doubleDigit(
    currentMonth + 1
  )}-01`;
  const [initialDate, setInitialDate] = useState(formattedCurrentDate);
  useEffect(() => {
    setInitialDate(`${year}-${doubleDigit(parseInt(month) + 1)}-01`);
  }, [month, year]);


  const debouncedFetch = useCallback(
    debounce(async (value) => {
      if (value) {
        setShowDropdown(true);
        try {
          const response = await axios.get(
            `https://poweredu-backend.onrender.com/v1/admin/users?role=Student&page=1&limit=10&search=${value}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setOptions(response.data?.data);
          setOptionsLoading(false);
        } catch (error) {
          setOptionsLoading(false);
          console.error("Error fetching data: ", error);
        }
      } else {
        setShowDropdown(false);
      }
    }, 500),
    []
  );
  
  const handleChange = (e) => {
    const value = e.target.value;
    setOptionsLoading(true);
    setSearchString(value);
    debouncedFetch(value);
  };


  const handleOptionClick = (option) => {
    setSearchString(option);
    setShowDropdown(false);
    navigate(`/admin/profile/${option.name}-${option.poweredu_id}`);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const themeProperties = useSelector(selectThemeProperties);

  return (
    <div className=" max-xl:max-w-4/5 max-xl:mt-10 flex flex-col h-full ">
      <div
        className={`flex max-xl:flex-col-reverse flex-row justify-around items-center max-xl:py-4 rounded-[20px] `}
      >
        <div
          className="flex max-md:flex-col w-96 justify-center items-center absolute -top-1 right-[38%] z-50 "
          ref={searchRef}
        >
          <Box sx={{}}>
            <Toolbar>
              <Search
                style={{
                  background: themeProperties.inputBackground,
                  color: themeProperties.inputTextColor,
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon
                    style={{
                      color: themeProperties.inputTextColor,
                    }}
                  />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchString}
                  onChange={handleChange}
                  style={{
                    color: themeProperties.inputTextColor,
                    borderRadius: "20px",
                  }}
                />
              </Search>
            </Toolbar>
          </Box>
          {showDropdown && (
            <div
              className="p-[4px] absolute scrolling top-14 z-[100] w-full rounded-[20px] shadow-2xl overflow-hidden"
              style={{
                background: themeProperties.boxBackground,
              }}
            >
              <ul
                className="list-none p-0 m-0 w-full overflow-y-auto scrolling h-60 rounded-[18px] outline-none"
                style={{
                  background: themeProperties?.boxBackground,
                }}
              >
                {optionsLoading ? (
                  <div className=" h-20 px-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="w-full h-10 mt-2"
                        style={{
                          background: themeProperties.skeletonColor,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <>
                    { options.length > 0 ? options.map((option, index) => (
                      <div
                        className="flex justify-between items-center cursor-pointer py-2 px-4 text-sm optionsDiv"
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        style={{
                          "--hover-bg": themeProperties.boxHoverColor,
                          "--hover-text": themeProperties.boxHoverTextColor,
                        }}
                      >
                        <style>
                          {`
                        .scrolling::-webkit-scrollbar-thumb {
                          background: ${themeProperties.scrollColor};
                        }
                        .optionsDiv{
                         color: ${themeProperties?.textColor},
                        } 
                        .optionsDiv:hover {
                          background: var(--hover-bg);
                          color: var(--hover-text);
                        }
                      `}
                        </style>
                        <li className="">{option.name}</li>
                        <li className=" ">{option.poweredu_id}</li>
                      </div>
                    )) : (
                      <div className="flex justify-center items-center h-20">
                        <p className="text-sm">No results found for "{searchString}"</p>
                      </div>
                    )}
                  </>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* <StatsAndCharts
            totalStudents={totalStudents}
            totalTeachers={totalTeachers}
            totalStaff={totalStaff}
            chartData={chartData}
            deviceSize={deviceSize}
            monthArray={monthArray}
            yearArray={yearArray}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            initialDate={initialDate}
            themeProperties={themeProperties}
          /> */}
      </div>
      <div className="h-full relative  ">
        <UserAndCirculars
          newlyAddedUsersArray={newlyAddedUsersArray}
          deviceSize={deviceSize}
        />
      </div>
    </div>
  );
}

export default Information;
