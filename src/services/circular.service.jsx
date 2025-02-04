import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"circular/";

const createCircular = async (body) => {
  try {
    const response = await axios.post(`${API_URL}add`, body);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCirculars = async (school_id) => {
  try {
    const response = await axios.get(`${API_URL}get/${school_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const editCircular = async (body) => {
  try {
    const response = await axios.put(`${API_URL}update`, body);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const deleteCircular = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const CircularService = {
  createCircular,
  getCirculars,
  deleteCircular,
  editCircular
};

export default CircularService;
