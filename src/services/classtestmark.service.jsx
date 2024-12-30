import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+ "class-test-marks/";

const registerClassTestMark = async (marks, test_id, createdby) => {
  try {
    const response = await axios.post(`${API_URL}marks`, { marks, test_id, createdby });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getClassTestMarks = async (data) => {
  try {
    const response = await axios.post(API_URL + "list", data);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getStudentClassTestMarks = async (body) => {
  try {
    const response = await axios.post(`${API_URL}student-marks`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateStudentClassTestMarks = async (body) => {
  try {
    const response = await axios.put(`${API_URL}update-marks`, body);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ClassTestMarkService = {
  registerClassTestMark,
  getClassTestMarks,
  getStudentClassTestMarks,
  updateStudentClassTestMarks
};

export default ClassTestMarkService;
