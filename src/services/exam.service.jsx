import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"exam/";

const addExam = async ({
  school_code,
  class_code,
  examtypeid,
  subject_code,
  syllabus,
  date,
  timing,
  max_marks,
  passing_marks,
}) => {
  try {
    const response = await axios.post(API_URL + "add", {
      examtypeid,
      subject_code,
      syllabus,
      date,
      timing,
      max_marks,
      passing_marks,
      school_code,
      class_code,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchExams = async ({ examtypeid, subject }) => {
  try {
    const response = await axios.post(API_URL + "get", {
      examtypeid,
      subject,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getStudentProgressData = async (body) => {
  try {
    const response = await axios.post(API_URL + "getStudentProgressData", body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getStudentProgressDataById = async (user_id) => {
  try {
    const response = await axios.get(
      `${API_URL}getStudentProgressDataById/${user_id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateExam = async (body) => {
  try {
    const response = await axios.put(API_URL + `update/${body.id}`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteExam = async (id) => {
  try {
    const response = await axios.delete(API_URL + `delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getExamDetailsByTeacher = async (body) => {
  try {
    const response = await axios.post(`${API_URL}examdetails`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllExamDetails = async (body) => {
  try {
    const response = await axios.post(`${API_URL}getAllExamDetails`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//use it for exam component in student dashboard
const getExamsForClass = async (body) => {
  try {
    const response = await axios.post(`${API_URL}getExamsForClass`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ExamService = {
  getStudentProgressDataById,
  getStudentProgressData,
  addExam,
  fetchExams,
  updateExam,
  deleteExam,
  getAllExamDetails,
  getExamDetailsByTeacher,
};

export default ExamService;
