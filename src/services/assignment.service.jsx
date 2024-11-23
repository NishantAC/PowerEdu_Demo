import axios from "axios";
import { API_BASE_URL } from "../common/constant";

const API_URL = `${API_BASE_URL}assignments/`;

const registerAssignment = (schoolCode, className, subjectName, assignDate, dueDate, title, createdBy) => {
  return axios.post(API_URL + "class-assignments", {
    schoolCode, 
    className, 
    subjectName, 
    assignDate, 
    dueDate, 
    title, 
    createdBy
  });
};

const getClassAssignments = async (body) => {
  const response = await axios.post(API_URL + "class-assignments", body);
  return response;
};

const getStudentsForEachAssignment = async (body) => {
  const response = await axios.post(API_URL + "getAssignmentStudents", body);
  return response.data;
}

const getSubjectTeacherAssignment = async (body) => {
  const response = await axios.post(API_URL + "getAllAssignment", body);
  return response.data;
};

const getInitialData = async (body) => {
  const response = await axios.post(API_URL + "initial-data", body);
  return response.data;
}

const saveAssignment = async (body) => {
  const response = await axios.post(API_URL + "save", body);
  return response.data;
};

const deleteAssignment = async (body) => {
  const response = await axios.post(API_URL + "delete", body);
  return response.data;
};

const updateAssignmentStatus = async (body) => {
  const response = await axios.post(API_URL + "update-status", body);
  return response.data;
};

const AssignmentService = {
  registerAssignment,
  getClassAssignments,
  getSubjectTeacherAssignment,
  saveAssignment,
  deleteAssignment,
  updateAssignmentStatus,
  getStudentsForEachAssignment,
  getInitialData
};

export default AssignmentService;
