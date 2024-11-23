import axios from "axios";

const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;
const API_URL = `${API_BASE_URL}/assignment`;

const registerAssignment = (schoolCode, className, subjectName, assignDate, dueDate, title, createdBy) => {
  return axios.post(`${API_URL}/register-assignment`, {
    schoolCode,
    className,
    subjectName,
    assignDate,
    dueDate,
    title,
    createdBy,
  });
};

const getClassAssignments = (body) => {
  return axios.post(`${API_URL}/class-assignments`, body);
};

const getSubjectTeacherAssignment = (body) => {
  return axios.post(`${API_URL}/subject-teacher-assignments`, body);
};

const saveAssignment = (body) => {
  return axios.post(`${API_URL}/save-assignment`, body);
};

const deleteAssignment = (body) => {
  return axios.post(`${API_URL}/delete-assignment`, body);
};

const updateAssignmentStatus = (body) => {
  return axios.post(`${API_URL}/update-assignment-status`, body);
};

const AssignmentService = {
  registerAssignment,
  getClassAssignments,
  getSubjectTeacherAssignment,
  saveAssignment,
  deleteAssignment,
  updateAssignmentStatus,
};

export default AssignmentService;
