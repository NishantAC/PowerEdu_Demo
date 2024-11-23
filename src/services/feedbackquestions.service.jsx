import axios from "axios";
import { API_BASE_URL } from "../common/constant";

const API_URL = `${API_BASE_URL}feedback-questions/`;

const registerFeedbackQuestions = async (schoolcode, questions, subject_id, teacher_id) => {
  try {
    const response = await axios.post(`${API_URL}create`, {
      schoolcode, questions, subject_id, teacher_id
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFeedbackQuestions = async (class_id, schoolcode) => {
  try {
    const response = await axios.post(`${API_URL}list`, {
      schoolcode, class_id
    });
    // console.log({class_id, schoolcode})
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
