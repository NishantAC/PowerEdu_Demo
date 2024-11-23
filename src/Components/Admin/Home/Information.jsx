import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/common/constant";
import { selectThemeProperties } from "@/slices/theme";
import SchoolUsersService from "../../../services/schoolusers.service";
import UserAndCirculars from "./UserAndCirculars";
import StatsAndCharts from "./StatsAndCharts";
import "./Information.css";
import gsap from "gsap";

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

  useEffect(() => {
    SchoolUsersService.getTotalStudentsNumber(user?.schoolcode).then((res) =>
      setTotalStudents(res.totalStudentsNumber)
    );
    

    SchoolUsersService.getTotalTeachersNumber(user?.schoolcode).then((res) =>
      setTotalTeachers(res.totalTeachersNumber)
    );

    SchoolUsersService.getTotalStaffNumber(user?.schoolcode).then((res) =>
      setTotalStaff(res.totalStaffNumber)
    );

    SchoolUsersService.getStudentGenderCounts(user?.schoolcode).then((res) => {
      setStudentGenderCounts(res);
    });

    SchoolUsersService.newlyAddedUsers(user?.schoolcode).then((res) => {
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

  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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

  // Debounced function for API call
  const debouncedFetch = debounce(async (value) => {
    if (value) {
      try {
        const response = await axios.get(API_BASE_URL + `schoolusers/listofid/${value}`);

        console.log(response?.data, "response.data.userIds");
        const formattedOptions = response?.data?.userIds.map((id) => id);
        setOptions(formattedOptions);
        setShowDropdown(true); // Show dropdown when there are results
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    } else {
      setShowDropdown(false); // Hide dropdown if input is empty
    }
  }, 500); // 500ms debounce time

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchString(value);
    debouncedFetch(value); // Call the debounced fetch
  };

  const handleOptionClick = (option) => {
    console.log(option, "optiondetails");
    setSearchString(option); // Set the selected option as the input value
    setShowDropdown(false); // Hide dropdown after selection
    console.log(`Selected: ${option}`);

    history(`/admin/edit-profile`, {
      state: { userId: option.user_id, userType: option.userType },
    });
  };

  const themeProperties = useSelector(selectThemeProperties);

  const searchRef = useRef(null);

  useEffect(() => { 
    const searchTL = gsap.timeline();


    searchRef.current.addEventListener("click", (e) => {
      searchTL.to(searchRef.current, {
        duration: 0.4,
        width: "400px",
        ease: "power2.inOut",
      });
    })

    searchRef.current.addEventListener("focusout", (e) => {
      searchTL.to(searchRef.current, {
        duration: 0.4,
        width: "300px",
        ease: "power2.inOut",
      });
    }
    );

 }, []);
    
  return (
    <div className=" max-xl:max-w-4/5 max-xl:mt-10 relative">
      <div className={`flex max-xl:flex-col flex-row gap-10 justify-around items-center p-4 mb-2 rounded-[20px]  `}
        style={{
          background: themeProperties.secondaryColor,
        }}  
      >
        <div className="flex max-md:flex-col gap-10 w-96 justify-center items-center relative">
          <div className="flex gap-2 bg-white items-center w-60 shadow-md px-2 rounded-[50px] overflow-hidden" ref={searchRef}>
            <CiSearch color={themeProperties.primaryColor} size={25} />
            <div className="">
              {/* Input for search */}
              <input
                type="text"
                value={searchString}
                onChange={handleChange}
                style={{ color: themeProperties?.textColorAlt }}
                placeholder="Search "
                className="border-none outline-none p-2 flex-1" 
              />
              {/* Dropdown for showing search results */}
              {showDropdown && options.length > 0 && (
                <div className="p-[4px] absolute top-14 left-0 z-[100] rounded-[20px] shadow-lg"
                  style={{
                    background: themeProperties.textColor,
                  }}
                >
                  <ul className="list-none p-0 m-0 bg-[white] w-60 overflow-y-auto scrolling z-10 max-h-60 shadow-2xl rounded-[20px] backdrop-blur-lg">
                    {options.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className="p-2 cursor-pointer hover:bg-gray-200 text-[14px] font-thin"
                        style={{ color: themeProperties?.textColorAlt }}
                      >
                        {option.user_id}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <StatsAndCharts
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
          />
        </div>
      </div>

      <UserAndCirculars newlyAddedUsersArray={newlyAddedUsersArray} deviceSize={deviceSize} />
    </div>
  );
}

export default Information;