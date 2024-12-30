import axios from "axios";
import { API_BASE_URL } from "../common/constant";

const API_URL = API_BASE_URL + "class-notices/";

const registerClassNotice = async (body) => {
  try {
    const response = await axios.post(API_URL + "add", body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error for handling in the caller function
  }
};

const getClassNoticeData = async (body) => {
  const response = await axios.post(API_URL + "classnoticedata", body);
  localStorage.setItem("classnotice", JSON.stringify(response.data));
  return response.data;
};

const getClassNotices = (body) => {
  return axios.post(API_URL + "class", body);
};

const getAllNotices = (body) => {
  return axios.post(API_URL + "all", body);
};

const getPdf = async (body) => {
  try {
    const response = await axios.post(API_URL + "getPdf", body, {
      responseType: 'blob'
    })
    // 
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteClassNotice = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}remove/${id}`)
    return response;
  } catch (error) {
    console.error(error);
  }
}

const getNoticeDropdownClasses = async (school_code) => {
  try {
    const response = await axios.get(`${API_URL}getclasses/${school_code}`)
    return response;
  } catch (error) {
    console.error(error);
  }
}


const ClassNoticeService = {
  registerClassNotice,
  getClassNoticeData,
  getAllNotices,
  getClassNotices,
  getPdf,
  deleteClassNotice,
  getNoticeDropdownClasses
};

export default ClassNoticeService;
