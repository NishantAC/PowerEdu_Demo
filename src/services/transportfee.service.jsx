import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"transport-fees/";

const addFees = async (body) => {
  try {
    const response = await axios.post(`${API_URL}create`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllFees = async (body) => {
  try {
    const response = await axios.post(`${API_URL}all`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPendingFees = async (body) => {
  try {
    const response = await axios.post(`${API_URL}pendingfee`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFee = async (body) => {
  try {
    const response = await axios.post(`${API_URL}one`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateFees = async (body) => {
  try {
    const response = await axios.post(`${API_URL}update`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteFees = async (body) => {
  try {
    const response = await axios.post(`${API_URL}delete`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const TransportFeesService = {
  getPendingFees,
  addFees,
  getAllFees,
  getFee,
  updateFees,
  deleteFees,
};

export default TransportFeesService;
