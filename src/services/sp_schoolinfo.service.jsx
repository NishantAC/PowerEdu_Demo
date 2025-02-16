import { API_BASE_URL } from "@/common/constant";
import axios from "axios";

const API_URL = API_BASE_URL;
const powerEduAuthToken = localStorage.getItem("powerEduAuthToken");
const token = "Bearer " + JSON.parse(powerEduAuthToken);

const getInfoSchool = async (school_id) => {
  try {
    const response = await axios.get(`${API_URL}admin/schools/${school_id}`, {
      headers: {
        Authorization: token,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateSchoolInfo = async (schoolData, school_code) => {
  try {
    const response = await axios.put(
      `${API_URL}admin/schools/${school_code}`,
      schoolData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createSchool = async (schoolData, school_id) => {
  if (school_id !== null) {
    throw new Error("School ID must be null to create a new school.");
  }

  try {
    const response = await axios.post(
      `${API_URL}admin/schools`,
      schoolData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const SpSchoolInfoService = {
  getInfoSchool,
  updateSchoolInfo,
  createSchool,
};

export default SpSchoolInfoService;