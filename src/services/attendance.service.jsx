import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+ "attendances/";

const getAllStudentsOfClass = async (body) => {
  try {
    const { data } = await axios.post(API_URL + "class-students", body);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserAttendance = async (body) => {
  try {
    const { data } = await axios.post(`${API_URL}user`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("Error making API request:", error.message);
    console.error(
      "Error details:",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

const markUserAttendance = async (body) => {
  try {
    const { data } = await axios.post(API_URL + "mark", body);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAcademicYearFilter = async (body) => {
  try {
    const { data } = await axios.post(API_URL + "acedemic-years", body);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getStudentsAcedemicYears = async (body) => {
  try {
    const { data } = await axios.post(API_URL + "students-years", body);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTeachersWithAttendance = async (body) => {
  try {
    const { data } = await axios.post(API_URL + "teacherattendance", body);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const AttendanceService = {
  getAllStudentsOfClass,
  getUserAttendance,
  markUserAttendance,
  getStudentsAcedemicYears,
  getAcademicYearFilter,
  getTeachersWithAttendance,
};

export default AttendanceService;
