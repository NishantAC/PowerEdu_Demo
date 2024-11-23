import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"class-tests/";

const registerclasstest = async ({
  schoolcode,
  schoolclassId,
  subjectId,
  syllabus,
  testdesc,
  examdate,
  totalmarks,
  createdby,
}) => {
  try {
    const response = await axios.post(API_URL + "create", {
      schoolcode,
      schoolclassId,
      subjectId,
      testdesc,
      syllabus,
      examdate,
      totalmarks,
      createdby,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getClassTestsByTeacher = async (body) => {
  try {
    const response = await axios.post(`${API_URL}teacher-tests`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUpcomingTest = async (body) => {
  try {
    const response = await axios.post(API_URL + "list", body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// use it for student dashboard class-test component in exam page.
const fetchClassTestforClass = async (body) => {
  try {
    const response = await axios.post(API_URL + "class-tests", body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ClassTestService = {
  registerclasstest,
  getClassTestsByTeacher,
  getUpcomingTest,
};

export default ClassTestService;
