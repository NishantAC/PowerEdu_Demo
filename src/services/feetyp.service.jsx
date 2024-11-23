import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"academic-fee-paids/";

const getUserFeeType = async (body) => {
  try {
    const response = await axios.post(`${API_URL}get-academic-fees`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFeeStructure = async (body) => {
  console.log(body);
  try {
    const response = await axios.post(`${API_BASE_URL}fee-types/fee-structure`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPdf = async (body) => {
  try {
    const response = await axios.post(API_URL + "getPdf", body, {
      responseType: 'blob'
    })
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const FeeTypeService = {
  getUserFeeType,
  getFeeStructure,
  getPdf,
};

export default FeeTypeService;
