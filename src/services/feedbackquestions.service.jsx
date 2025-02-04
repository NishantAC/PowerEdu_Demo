import axios from "axios";
import { API_BASE_URL } from "../common/constant";

const API_URL = `${API_BASE_URL}feedback-questions/`;

const registerFeedbackQuestions = async (school_id, questions, subject_id, teacher_id) => {
  try {
    const response = await axios.post(`${API_URL}create`, {
      school_id, questions, subject_id, teacher_id
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFeedbackQuestions = async (class_id, school_id) => {
  try {
    const response = await axios.post(`${API_URL}list`, {
      school_id, class_id
    });
    // 
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const FeedbackQuestionService = {
  registerFeedbackQuestions,
  getFeedbackQuestions,
};

export default FeedbackQuestionService;
