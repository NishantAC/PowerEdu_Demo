import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL+"school-notices/";

const registerSchoolNotice = async (body) => {
  try {
    const response = await axios.post(`${API_URL}register-school-notice`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSchoolNoticeData = async (code) => {
  try {
    const response = await axios.post(`${API_URL}school-notice-data`, { code });
    if (response.data.classname) {
      localStorage.setItem("classnotice", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const SchoolNoticeService = {
  registerSchoolNotice,
  getSchoolNoticeData,
};

export default SchoolNoticeService;
