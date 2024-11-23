import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"transports/";

const addTransport = async (body) => {
  try {
    const response = await axios.post(`${API_URL}add`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDriversList = async (body) => {
  try {
    const response = await axios.post(`${API_URL}drivers-list`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllTransports = async (body) => {
  try {
    const response = await axios.post(`${API_URL}all`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteTransports = async (body) => {
  try {
    const response = await axios.post(`${API_URL}delete`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const TransportService = {
  addTransport,
  getDriversList,
  getAllTransports,
  deleteTransports,
};

export default TransportService;
