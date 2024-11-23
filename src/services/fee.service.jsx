import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"fee-details/";

const getUserFee = async (body) => {
  try {
    const response = await axios.post(`${API_URL}get-fees`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const allStudentFee = async (body) => {
  try {
    const response = await axios.post(`${API_URL}get-all-students`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


const FeeService = {
  getUserFee,
  allStudentFee
};

export default FeeService;
