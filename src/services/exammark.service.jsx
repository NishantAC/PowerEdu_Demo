import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+ "exam-mark/";

const registerExamMark = async (marks, exam_id, createdby) => {
  try {
    const response = await axios.post(`${API_URL}marks`, { marks, exam_id, createdby });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getStudentMarks = async (body) => {
  try {
    const response = await axios.post(`${API_URL}student-marks`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateStudentMarks = async (body) => {
  try {
    const response = await axios.put(`${API_URL}update-marks`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const passStudents = async (body) => {
  try {
    const response = await axios.put(`${API_URL}pass`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteStudentMarks = async (markId) => {
  try {
    const response = await axios.delete(`${API_URL}delete-marks/${markId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ExamMarkService = {
  passStudents,
  registerExamMark,
  getStudentMarks,
  updateStudentMarks,
  deleteStudentMarks
};

export default ExamMarkService;
