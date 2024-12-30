import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"schoolusers/";

const getTotalStudentsNumber = async (schoolcode) => {
  try {
    const response = await axios.get(
      `${API_URL}get/totalstudents/${schoolcode}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTotalTeachersNumber = async (schoolcode) => {
  try {
    const response = await axios.get(
      `${API_URL}get/totalteachers/${schoolcode}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTotalStaffNumber = async (schoolcode) => {
  try {
    const response = await axios.get(`${API_URL}get/totalstaff/${schoolcode}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const newlyAddedUsers = async (schoolcode) => {
  try {
    const response = await axios.get(
      `${API_URL}get/newlyaddedusers/${schoolcode}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getStudentGenderCounts = async (schoolcode) => {
  try {
    const response = await axios.get(
      `${API_URL}get/studentgendercounts/${schoolcode}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAcademicYearsDropdown = async (schoolcode) => {
  try {
    const response = await axios.get(
      `${API_URL}/academicyearsdropdown/${schoolcode}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllTeachersByYear = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/getallteachersbyyear`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllTeachersByYearSearch = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/getallteachersbyyearsearch`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTeacher = async (body) => {
  try {
    const { data } = await axios.post(API_URL + "getteacherdetails", body);
    return data;
  } catch (error) {
    
    throw error;
  }
};

const updateTeacherDetails = async (body) => {
  try {
    const { data } = await axios.post(API_URL + "updateteacherdetails", body);
    return data;
  } catch (error) {
    
    throw error;
  }
};

const getAllOtherManagementMembersByYear = async (body) => {
  try {
    const response = await axios.post(
      `${API_URL}/getallothermanagementmembersbyyear`,
      body
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllOtherManagementMembersByYearSearch = async (body) => {
  try {
    const response = await axios.post(
      `${API_URL}/getallothermanagementmembersbyyearsearch`,
      body
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getOtherManagementMemeber = async (body) => {
  try {
    const { data } = await axios.post(
      API_URL + "getothermanagementmemberdetails",
      body
    );
    return data;
  } catch (error) {
    
    throw error;
  }
};

const updateOtherManagementMemeberDetails = async (body) => {
  try {
    const { data } = await axios.post(
      API_URL + "updateothermanagementmemberdetails",
      body
    );
    return data;
  } catch (error) {
    
    throw error;
  }
};

const SchoolUsersService = {
  getTotalStudentsNumber,
  getTotalTeachersNumber,
  getTotalStaffNumber,
  getStudentGenderCounts,
  newlyAddedUsers,
  getAcademicYearsDropdown,
  getAllTeachersByYear,
  getTeacher,
  updateTeacherDetails,
  getOtherManagementMemeber,
  getAllOtherManagementMembersByYear,
  updateOtherManagementMemeberDetails,
  getAllTeachersByYearSearch,
  getAllOtherManagementMembersByYearSearch
};

export default SchoolUsersService;
