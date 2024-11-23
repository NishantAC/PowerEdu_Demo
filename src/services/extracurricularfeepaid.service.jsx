import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"extracurricular-fee-paids/";

const getAllFeesPaid = async (body) => {
  try {
    const response = await axios.post(`${API_URL}all`, body);
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

const ExtracurricularFeePaidService = {
  getAllFeesPaid,
  updatePaidAmounts,
};

export default ExtracurricularFeePaidService;
