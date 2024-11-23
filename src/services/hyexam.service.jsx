import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"hy-exams/";

const registerHYExam = async (schoolcode, schoolclassId, subjectId, syllabus, examdate, totalmarks, createdby) => {
  try {
    const response = await axios.post(`${API_URL}exams`, {schoolcode, schoolclassId, subjectId, syllabus, examdate, totalmarks, createdby});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserExamMarks = async (body) => {
  try {
    const response = await axios.post(`${API_URL}user-marks`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserExamDetails = async (body) => {
  try {
    const response = await axios.post(`${API_URL}exam-details`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getStudentExamDetails = async (body) => {
  try {
    const response = await axios.post(`${API_URL}student-exam-details`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



const HYExamService = {
  registerHYExam,
  getUserExamMarks,
  getUserExamDetails,
  getStudentExamDetails
};

export default HYExamService;
