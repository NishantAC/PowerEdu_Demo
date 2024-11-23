import axios from "axios";
import { API_BASE_URL } from "@/common/constant";
const API_URL = API_BASE_URL+ "principals/";

export const getClasses = async (body) => {
  try {
    const response = await axios.post(`${API_URL}classes`, body, {
      withCredentials: true,
    });
    return { response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error };
  }
};

export const getAcedemicYears = async (body) => {
  try {
    const response = await axios.post(`${API_URL}registeration-year`, body, {
      withCredentials: true,
    });
    return { response, error: null };
  } catch (error) {
    return { response: null, error };
  }
};

const getDropdownClasses = async (schoolcode) => {
  const res = await axios.get(`${API_URL}/dropdownclasses/${schoolcode}`);
  return res.data;
};

const getAllClasses = async (body) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}schools/classesdetails`,
      body
    );
    return response;
  } catch (error) {
    return { response: null, error };
  }
};

const getAvailableClasses = async (body) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}schools/availableclasses`,
      body
    );
    return response;
  } catch (error) {
    return { response: null, error };
  }
};

const updateClasses = async (school_code, updatedClasses) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}schools/updateclasses`,
      {
        school_code,
        updatedClasses,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data.message; // throw the error message
  }
};

const classService = {
  getClasses,
  getDropdownClasses,
  getAllClasses,
  updateClasses,
  getAvailableClasses,
};

export default classService;
