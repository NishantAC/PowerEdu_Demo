import { API_BASE_URL } from "@/common/constant";
import axios from "axios";
import { toast } from "sonner";

const API_URL = API_BASE_URL;
const powerEduAuthToken = localStorage.getItem("powerEduAuthToken");
const token = "Bearer " + JSON.parse(powerEduAuthToken);


const createSchoolNotice = async (body) => {
  try {
    toast.info("Creating class notice...");
    const response = await axios.post(API_URL + "admin/school-notices", body, {
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

const getSchoolNoticeData = (school_id, academic_year_id) => {
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


const deleteSchoolNotice = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}admin/school-notices/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const updateSchoolNotice = async (id, body) => {
  try {
    const response = await axios.put(
      `${API_URL}admin/school-notices/${id}`,
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

const SchoolNoticeService = {
  createSchoolNotice,
  getSchoolNoticeData,
  deleteSchoolNotice,
  updateSchoolNotice,
};

export default SchoolNoticeService;
