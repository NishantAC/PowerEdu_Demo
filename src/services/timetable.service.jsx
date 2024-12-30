import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"timetable/";

const getDayWiseSubjects = async (classid, schoolcode, day) => {
  try {
    const response = await axios.post(`${API_URL}day-subjects`, {
      classid,
      schoolcode,
      day,
    });
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTeacherSchedule = async (body) => {
  try {
    const response = await axios.post(`${API_URL}getlectures`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTimetableByClass = async (class_code, school_code) => {
  try {
    const response = await axios.get(
      `${API_URL}getTimetableByClass/${school_code}/${class_code}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createTimetable = async (body) => {
  try {
    const response = await axios.post(`${API_URL}create`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const TimeTableService = {
  getDayWiseSubjects,
  getTeacherSchedule,
  getTimetableByClass,
  createTimetable,
};

export default TimeTableService;
