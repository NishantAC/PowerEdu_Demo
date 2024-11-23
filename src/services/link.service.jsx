import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"links/";

const registerLink = async (schoolCode, className, subjectName, chapterName, linkName, createdBy) => {
  try {
    const response = await axios.post(`${API_URL}register-link`, {
      schoolCode,
      className,
      subjectName,
      chapterName,
      linkName,
      createdBy,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteLinkById = async (body) => {
  try {
    console.log("this is data ",body)
    const response = await axios.post(`${API_URL}deletelink`, body);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createLink = async (body) => {
  try {
    // console.table(body)
    const response = await axios.post(`${API_URL}links`, body);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const LinkService = {
  registerLink,
  deleteLinkById,
  createLink
};

export default LinkService;
