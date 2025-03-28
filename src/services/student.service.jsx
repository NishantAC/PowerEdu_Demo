import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const powerEduAuthToken = localStorage.getItem('powerEduAuthToken');
const token = 'Bearer ' + JSON.parse(powerEduAuthToken);
const API_URL = API_BASE_URL + 'admin/users';


const getAllStudents = async ({class_code, page = 1, limit = 5}) => {
  try {
    const response = await axios.get(`${API_URL}?role=Student&class_code=${class_code}&page=${page}&limit=${limit}`, {
      headers: {
        Authorization: token
      }
    });
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

const searchStudents = async(body) => {
  try {
    const response = await axios.post(API_URL + "all/search", body);
    return response.data;

  } catch (error) {
    
    throw error;
  }
};



const getStudent = async (body) => {
  try {
    const { data } = await axios.post(API_URL + "details", body);
    return data;
  } catch (error) {
    
    throw error;
  }
};

const getCurrentStudentData = getStudent;


const updateStudentDetails = async (body) => {
  try {
    const { data } = await axios.post(API_URL + "update", body);
    return data;
  } catch (error) {
    
    throw error;
  }
};

const deleteStudentProfile = async (body) => {
  try {
    const { data } = await axios.post(API_URL + "delete", body);
    return data;
  } catch (error) {
    
    throw error;
  }
};

const getStudentAcademics = async (body) => {
  try {
    const { data } = await axios.post(API_URL + "academics", body);
    return data;
  } catch (error) {
    
    throw error;
  }
};

const getStudentsWithMarks = async (body) => {
  try {
    const { data } = await axios.post(API_URL + "studentmarks", body);
    return data;
  } catch (error) {
    
    throw error;
  }
};

const getStudentFeeDetails = async (body) => {
  try {
    const { data } = await axios.post(API_URL + "studentfeedetails", body);
    return data;
  } catch (error) {
    
    throw error;
  }
};

const StudentService = {
  getAllStudents,
  getCurrentStudentData,
  getStudent,
  updateStudentDetails,
  deleteStudentProfile,
  getStudentAcademics,
  getStudentsWithMarks,
  getStudentFeeDetails,
  searchStudents
};

export default StudentService;
