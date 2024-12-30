import axios from "axios";
import { API_BASE_URL } from "../common/constant";

// const API_URL = API_BASE_URL + "schools/schools";

const API_URL = API_BASE_URL+'schools/schools/'

const API_URL1 = API_BASE_URL+'schools/school';


const API_URL2 = API_BASE_URL+'schools'

const registerSchool = async (
  schoolCode,
  schoolName,
  status,
  view_performance_button
) => {
  try {
    const response = await axios.post(`${API_URL}register-school`, {
      schoolCode,
      schoolName,
      status,
      view_performance_button,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAcademicYears = async (school_code) => {
  try {
    const response = await axios.post(`${API_URL}academic-years`, {
      school_code,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSchoolData = async (code) => {
  try {
    

    // const response = await axios.post(`${API_URL}school`, { code: code });
    const response = await axios.post(`${API_URL1}`,{code:code});

    if (response.data.school_code) {
      localStorage.setItem("school", JSON.stringify(response.data));
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchSchoolClasses = async (code) => {
  try {
    const response = await axios.get(`${API_URL}schools/${code}/classes/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSchoolLogo = async (code) => {
  
  try {
    const response = await axios.get(`${API_URL2}/schoollogo/${code}`, {
      responseType: "arraybuffer",
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSchoolStatus = async (code) => {
  try {
    const response = await axios.get(`${API_URL}schoolstatus/${code}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getManagementProfileDetails = async (body) => {
  try {
    const response = await axios.post(API_URL + "all", body);
    return { response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error };
  }
};

const schoolService = {
  getAcademicYears,
  registerSchool,
  getSchoolData,
  fetchSchoolClasses,
  getSchoolLogo,
  getSchoolStatus,
};

export default schoolService;
