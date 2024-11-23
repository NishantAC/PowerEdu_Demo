import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"homework/";

const getClassHomework = async (body) => {
  try {
    const response = await axios.post(`${API_URL}subject`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getInitialData = async (body) => {
  try {
    // const response = await axios.post(`${API_URL}initial-data`, body);
    const response = await axios.post(`${API_URL}getAllHomework`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteHomework = async (body) => {
  try {
    const response =  await axios.post(`${API_URL}delete`, body);
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const saveHomework = async (body) => {
  try {
    // const response = await axios.post(`${API_URL}save`, body);
    const response = await axios.post(`${API_URL}addhomework`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const HomeWorkService = {
  getClassHomework,
  getInitialData,
  deleteHomework,
  saveHomework,
};

export default HomeWorkService;
