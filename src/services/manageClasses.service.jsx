import axios from "axios";
import { API_BASE_URL } from "../common/constant";

const API_URL = API_BASE_URL + "admin/classes/";
const powerEduAuthToken = localStorage.getItem("powerEduAuthToken");
const token = "Bearer " + JSON.parse(powerEduAuthToken);

const createClass = async (classData) => {
  const response = await axios.post(API_URL, classData, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const updateClass = async (id, classData) => {
  const response = await axios.put(`${API_URL}${id}`, classData, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const fetchClasses = async (school_id, academic_year_id) => {
  const response = await axios.get(
    `${API_URL}?school_id=${school_id}&academic_year_id=${academic_year_id}`, 
    {
      headers: {
        Authorization: token,
      },
    }
  );



  return response?.data;
};

const fetchClassDetail = async (id) => {
  const response = await axios.get(`${API_URL}${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const deleteClass = async (id) => {
  const response = await axios.delete(`${API_URL}${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const ManageClassesService = {
  createClass,
  updateClass,
  fetchClasses,
  fetchClassDetail,
  deleteClass,
};

export default ManageClassesService;
