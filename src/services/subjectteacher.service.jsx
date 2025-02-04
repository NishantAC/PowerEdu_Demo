import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"subject-teachers/";

const registerSubjectTeacher = async (schoolCode, className, firstName, lastName, subjectName, details) => {
  try {
    const response = await axios.post(`${API_URL}register-subject-teacher`, {
      schoolCode,
      className,
      firstName,
      lastName,
      subjectName,
      details,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSubjectTeacherData = async (classId, school_id) => {
  try {
    const response = await axios.post(`${API_URL}subject-teachers`, { classId, school_id });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCurrentTeacherData = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}subject-teachers/${userId}`,);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getClassIds = async (userId) => {
  try {
    // const response = await axios.get(`${API_URL}/getAllClasses/${userId}`);
    const response = await axios.get(`${API_URL}${userId}/class-ids`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const saveClassNotice = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/class-notice`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//delete notice according to the id
const deleteNotice = async(Id) => {
  try{
   const response = await axios.delete(`${API_URL}`)
   return response.data;
  }catch{
    console.error(error);
    throw error;
  }
}

const getAllTeachersBySchool = async (body) => {
  try {
    const response = await axios.post(`${API_URL}getAllTeachersBySchool`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const SubjectTeacherService = {
  registerSubjectTeacher,
  getSubjectTeacherData,
  getCurrentTeacherData,
  getClassIds,
  saveClassNotice,
  deleteNotice,
  getAllTeachersBySchool,
};

export default SubjectTeacherService;
