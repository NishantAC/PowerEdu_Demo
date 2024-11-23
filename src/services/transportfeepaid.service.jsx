import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"transport-fee-paids/";

const getAllFeesPaid = async (body) => {
  try {
    console.log("body", body);
    const response = await axios.post(`${API_URL}all`, body);
    console.log("response",response);
    return response.data;
  } catch (error) {
    console.error(error);
    // handle error
    throw error;
  }
};

const updatePaidAmounts = async (body) => {
  try {
    const response = await axios.post(`${API_URL}update`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    // handle error
    throw error;
  }
};

const TransportFeePaidService = {
  getAllFeesPaid,
  updatePaidAmounts,
};

export default TransportFeePaidService;
