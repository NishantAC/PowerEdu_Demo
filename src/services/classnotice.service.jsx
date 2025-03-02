import axios from "axios";
import { API_BASE_URL } from "../common/constant";
import { toast } from "sonner";

const API_URL = API_BASE_URL;
const powerEduAuthToken = localStorage.getItem("powerEduAuthToken");
const token = "Bearer " + JSON.parse(powerEduAuthToken);

const registerClassNotice = async (body) => {
  try {
    toast.info("Creating class notice...");
    const response = await axios.post(API_URL + "admin/class-notices", body, {
      headers: {
        Authorization: token,
      },
    });
    toast.success("Class notice created successfully");
    return response.data;
  } catch (error) {
    toast.error("Error creating class notice");
    throw error;
  }
};

const getClassNoticeData = async (body) => {
  const response = await axios.post(API_URL + "classnoticedata", body);
  localStorage.setItem("classnotice", JSON.stringify(response.data));
  return response.data;
};

const getClassNotices = (body) => {
  return axios.post(API_URL + "class", body);
};

const getAllNotices = (school_id, academic_year_id) => {
  try {
    const response = axios.get(
      API_URL +
        `admin/school-notices?school_id=${school_id}&academic_year_id=${academic_year_id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response;
  } catch (error) {
    toast.error("Error fetching notices");
    console.error(error);
  }
};

const getPdf = async (body) => {
  try {
    const response = await axios.post(API_URL + "getPdf", body, {
      responseType: "blob",
    });
    //
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteClassNotice = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}admin/class-notices/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const updateClassNotice = async (id, body) => {
  try {
    const response = await axios.put(
      `${API_URL}admin/class-notices/${id}`,
      body,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const ClassNoticeService = {
  registerClassNotice,
  getClassNoticeData,
  getAllNotices,
  deleteClassNotice,
  updateClassNotice,
};

export default ClassNoticeService;
