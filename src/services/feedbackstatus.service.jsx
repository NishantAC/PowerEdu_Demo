import axios from "axios";
import { API_BASE_URL } from "../common/constant";

const API_URL = `${API_BASE_URL}feedback-statuses/`;

const registerFeedbackStatus = async (schoolCode, status) => {
  try {
    const response = await axios.post(`${API_URL}register-feedback-status`, {
      schoolCode,
      status,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFeedbackStatusData = async (code) => {
  try {
    const response = await axios.post(`${API_URL}list`, {
      code,
    });
    // if (response.data[0].school_id) {
    //   localStorage.setItem("feedbackStatus", JSON.stringify(response.data[0]));
    // }
    return response?.data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const FeedbackStatusService = {
  registerFeedbackStatus,
  getFeedbackStatusData,
};

export default FeedbackStatusService;
