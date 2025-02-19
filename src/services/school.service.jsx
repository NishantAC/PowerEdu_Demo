import { API_BASE_URL } from "@/common/constant";
import axios from "axios";
import { setSchoolDetail } from "@/slices/schooldetail"; // Import the action
import store from "../store";

const API_URL = API_BASE_URL;
const powerEduAuthToken = localStorage.getItem("powerEduAuthToken");
const token = "Bearer " + JSON.parse(powerEduAuthToken);

const registerSchool = async (
  schoolCode,
  schoolName,
  status,
  view_performance_button
) => { 
  try {
    const response = await axios.post(`${API_URL}register-school`, {
      schoolCode,
      schoolName, 
      status,
      view_performance_button,
    }, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAcademicYears = async (school_code) => {
  try {
    const response = await axios.post(`${API_URL}academic-years`, {
      school_code,
    }, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSchoolData = async (school_id) => {
  try {
    const response = await axios.get(`${API_URL}admin/schools/${school_id}`, {
      headers: {
        Authorization: token,
      },
    });

    if (response.data.school_code) {
      localStorage.setItem("school", JSON.stringify(response.data));
      store.dispatch(setSchoolDetail(response.data)); // Dispatch the action with the fetched data
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchSchoolClasses = async (code) => {
  try {
    const response = await axios.get(`${API_URL}schools/${code}/classes/`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSchoolLogo = async (school_id) => {
  try {
    const response = await axios.post(`${API_URL}/${school_id}`, {
      responseType: "arraybuffer",
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSchoolStatus = async (school_id) => {
  try {
    const response = await axios.post(`${API_URL}/${school_id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getManagementProfileDetails = async (body) => {
  try {
    const response = await axios.post(API_URL + "all", body, {
      headers: {
        Authorization: token,
      },
    });
    return { response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error };
  }
};

const schoolService = {
  getAcademicYears,
  registerSchool,
  getSchoolData,
  fetchSchoolClasses,
  getSchoolLogo,
  getSchoolStatus,
  getManagementProfileDetails,
};

export default schoolService;