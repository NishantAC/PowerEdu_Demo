import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "@/common/constant";
import { selectThemeProperties } from "@/slices/theme";
import SchoolUsersService from "../../../services/schoolusers.service";
import UserAndCirculars from "./UserAndCirculars";
import StatsAndCharts from "./StatsAndCharts";
import "./Information.css";
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Spinner from "@/Components/Spinner/Spinner";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: theme.properties?.inputBackground || alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out',
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: theme.spacing(2),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

function Information() {
  const { user } = useSelector((state) => state.user);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const [studentGenderCounts, setStudentGenderCounts] = useState(0);
  const [newlyAddedUsersArray, setNewlyAddedUsersArray] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [options, setOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const history = useNavigate();
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

    SchoolUsersService.newlyAddedUsers(user?.school_id).then((res) => {
      const updatedUsersArray = res.map((user) => ({
        imgSrc: user.profileImage || "",
        firstName: user.firstname,
        lastName: user.lastname,
        designation: user.userType,
        dateOfJoining: user.dateOfJoining,
      }));

      setNewlyAddedUsersArray([...updatedUsersArray]);
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

  const formattedCurrentDate = `${currentYear}-${doubleDigit(currentMonth + 1)}-01`;
  const [initialDate, setInitialDate] = useState(formattedCurrentDate);
  useEffect(() => {
    setInitialDate(`${year}-${doubleDigit(parseInt(month) + 1)}-01`);
  }, [month, year]);

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const debouncedFetch = debounce(async (value) => {
    if (value) {
      setShowDropdown(true);
      try {
        const response = await axios.get(API_BASE_URL + `schoolusers/listofid/${value}`);
        const formattedOptions = response?.data?.userIds.map((id) => id);
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    } else {
      setShowDropdown(false);
    }
  }, 500);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchString(value);
    debouncedFetch(value);
  };

  const handleOptionClick = (option) => {
    setSearchString(option);
    setShowDropdown(false);
    history(`/admin/edit-profile`, {
      state: { userId: option.user_id, userType: option.userType },
    });
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
    <div className=" max-xl:max-w-4/5 max-xl:mt-10 flex flex-col h-full " >
      <div className={`flex max-xl:flex-col-reverse flex-row justify-around items-center max-xl:py-4 rounded-[20px] `}
      >
        <div className="flex max-md:flex-col w-96 justify-center items-center absolute top-2 right-[33%] z-50 " ref={searchRef}>
          <Box sx={{ }}>
            <Toolbar>
              <Search
                style={{
                  background: themeProperties.inputBackground,
                  color: themeProperties.inputTextColor,
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon style={{
                    color: themeProperties.inputTextColor,
                   }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchString}
                  onChange={handleChange}
                  style={{
                    color: themeProperties.inputTextColor,
                    borderRadius: '20px',
                  }}
                />
              </Search>
            </Toolbar>
          </Box>
          {showDropdown && options.length > 0 ? (
            <div className="p-[4px] absolute scrolling top-14 z-[100] w-full rounded-[20px] shadow-2xl overflow-hidden"
              style={{
                background: themeProperties.boxBackground,
              }}
            >
              <ul className="list-none p-0 m-0 w-full overflow-y-auto scrolling h-60 rounded-[18px] outline-none"
              style={{
                background: themeProperties?.boxBackground

              }}
              >
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="p-2 px-4 cursor-pointer text-[14px] font-thin "
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
                        li{
                         color: ${themeProperties?.textColor},
                        } 
                        li:hover {
                          background: var(--hover-bg);
                          color: var(--hover-text);
                        }
                      `}
                    </style>

                    {option.user_id}
                  </li>
                ))}
              </ul>
            </div>
          ) : 
          <div className="p-[4px] absolute scrolling top-14 z-[100] w-full rounded-[20px] shadow-2xl overflow-hidden h-60 flex justify-center items-center "
          style={{
            background: themeProperties.boxBackground,
            display: searchString.length > 0 && showDropdown? "flex" : "none",
          }}
        >
          No results found for "{searchString}"
          </div>
          }
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
        <UserAndCirculars newlyAddedUsersArray={newlyAddedUsersArray} deviceSize={deviceSize} />

      </div>
    </div>
  );
}

export default Information;