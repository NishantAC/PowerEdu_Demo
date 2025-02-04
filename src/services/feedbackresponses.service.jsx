import axios from "axios";
import { API_BASE_URL } from "../common/constant";

const API_URL = `${API_BASE_URL}feedback-responses/`;

const registerFeedbackResponses = async (user_id, question_id, teacher_id, responses, comment) => {
  try {
    const response = await axios.post(`${API_URL}create`, {
      user_id, question_id, teacher_id, responses, comment
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFeedbackResponses = async (user_id, school_id) => {
  try {
    const response = await axios.post(`${API_URL}list`, {
      school_id, user_id
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateFeedbackResponses =  async (response_id, responses, comment) => {
  try {
    const response = await axios.put(`${API_URL}update`, {
      response_id, responses, comment
    })
    return response.data;
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}

const FeedbackRepsonseService = {
  registerFeedbackResponses,
  getFeedbackResponses,
  updateFeedbackResponses
};

export default FeedbackRepsonseService;
