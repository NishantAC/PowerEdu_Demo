import axios from "axios";
import { API_BASE_NEW_URL } from "../common/constant";
import { setUser } from "../slices/user";
import store from "../store"; // Assuming you have a store.js file where you configure your Redux store
import { toast } from "sonner";
import { RollerShades } from "@mui/icons-material";
const API_URL = API_BASE_NEW_URL + "auth/";
const API_URL_TOKENIZED = API_BASE_NEW_URL + "admin/";

const login = async (user_id, password, rememberMe) => {
  try {
    const response = await axios.post(API_URL + "login", {
      poweredu_id: user_id,
      password,
      remember_me: rememberMe,
    });
    console.log(response?.data?.data);
    const user = response?.data?.data?.userInfo;
    const accessToken = response?.data?.data?.token;
    localStorage.setItem("powerEduAuthToken", JSON.stringify(accessToken));
    return response;
  } catch (error) {
    console.error(error);
    throw error.response.data.message; // throw the error message
  }
};

const updateUser = async (user_id, userData) => {
  try {
    const response = await axios.post(API_URL + `update`, {
      user_id,
      userData,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data.message; // throw the error message
  }
};

const logout = () => {
  localStorage.removeItem("powerEduAuthToken");
};

const authUser = async () => {
  try {
    const response = await axios.post(
      API_URL + "authuser",
      {},
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("powerEduAuthToken")
          )}`,
        },
      }
    );
    const user = response?.data?.data?.userInfo;
    store.dispatch(setUser(user));
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// services by Abhishek

const getUniquePowerEduId = async (role) => {
  try {
    const response = await axios.get(
      `${API_URL_TOKENIZED}users/generate-poweredu-id?role=${role}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("powerEduAuthToken")
          )}`,
        },
      }
    );
    //
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUniqueRollNo = async (class_id) => {
  try {
    const response = await axios.get(
      `${API_URL_TOKENIZED}users/generate-roll-number?class_id=${class_id}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("powerEduAuthToken")
          )}`,
        },
      }
    );
    //
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUniqueAdmissionNo = async (school_id) => {
  try {
    const response = await axios.get(
      `${API_URL_TOKENIZED}users/generate-admission-number?school_id=${school_id}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("powerEduAuthToken")
          )}`,
        },
      }
    );
    //
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const register = async (formData) => {
  console.log("formData", formData);
  try {
    const response = axios.post(API_BASE_NEW_URL + "admin/admin/register", formData, {
      headers: {
        Authorization : `Bearer ${JSON.parse(localStorage.getItem("powerEduAuthToken"))}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const sendOTP = async (body) => {
  try {
    const response = axios.post(API_URL + "auth/sendotp", body);
    return response;
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (body) => {
  try {
    const response = axios.post(API_BASE_URL + "auth/updatepassword", body);

    return response;
  } catch (error) {
    throw error;
  }
};

const authService = {
  register,
  updateUser,
  login,
  logout,
  getUniquePowerEduId,
  getUniqueAdmissionNo,
  getUniqueRollNo,
  sendOTP,
  updatePassword,
  authUser,
};

export default authService;
