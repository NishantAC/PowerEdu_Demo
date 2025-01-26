import axios from "axios";
import { API_BASE_NEW_URL } from "../common/constant";
import { setUser } from "../slices/user";
import store from "../store"; // Assuming you have a store.js file where you configure your Redux store
import {toast} from 'sonner';
const API_URL = API_BASE_NEW_URL + "auth/";

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
    const response = await axios.post(API_URL + "authuser", {

    }, 
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("powerEduAuthToken"))}`,
        },
    });
    const user = response?.data?.data?.userInfo;
    store.dispatch(setUser(user));
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// services by Abhishek

const getUniqueRekorId = async (body) => {
  try {
    const response = await axios.get(`${API_URL}getuniquerekorid`, {
      params: body,
    });
    // 
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUniqueRollNo = async (body) => {
  try {
    const response = await axios.get(`${API_URL}getuniquerollno`, {
      params: body,
    });
    // 
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUniqueAdmissionNo = async (body) => {
  try {
    const response = await axios.get(`${API_URL}getuniqueadmissionno`, {
      params: body,
    });
    // 
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
    const response = axios.post(API_URL+"auth/sendotp", body);
    return response;
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (body) => {
  try {
    
    const response = axios.post(
      API_BASE_URL+"auth/updatepassword",
      body
    );
    
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
  authUser, 
};

export default authService;
