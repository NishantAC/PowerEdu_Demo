import axios from "axios";
import { API_BASE_URL } from "../common/constant";

const API_URL = API_BASE_URL + "auth/";


const login = async (user_id, password, rememberMe) => {
  try {
    const response = await axios.post(API_URL + "signin", {
      user_id,
      password,
      rememberMe,
    });
    const { accessToken, ...user } = response.data;
    const tokenExpiry = rememberMe
      ? Date.now() + 7 * 24 * 60 * 60 * 1000
      : Date.now() + 24 * 60 * 60 * 1000; // set token expiry to 7 days if rememberMe is checked, otherwise 24 hours
    localStorage.setItem("user", JSON.stringify(user)); // stores the user data in the browser's local storage for persistent use.
    localStorage.setItem("token", JSON.stringify(accessToken));
    localStorage.setItem("tokenExpiry", JSON.stringify(tokenExpiry));
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
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
};

// services by Abhishek

const getUniqueRekorId = async (body) => {
  try {
    const response = await axios.get(`${API_URL}/getuniquerekorid`, {
      params: body,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUniqueRollNo = async (body) => {
  try {
    const response = await axios.get(`${API_URL}/getuniquerollno`, {
      params: body,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUniqueAdmissionNo = async (body) => {
  try {
    const response = await axios.get(`${API_URL}/getuniqueadmissionno`, {
      params: body,
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const register = async (formData) => {
  try {
    const response = axios.post(
      API_BASE_URL+"auth/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const sendOTP = async (body) => {
  try {
    const response = axios.post(API_BASE_URL+"auth/sendotp", body);
    return response;
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (body) => {
  try {
    console.log("body is:", body);
    const response = axios.post(
      API_BASE_URL+"auth/updatepassword",
      body
    );
    console.log(response);
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
  getUniqueRekorId,
  getUniqueAdmissionNo,
  getUniqueRollNo,
  sendOTP,
  updatePassword,
};

export default authService;
