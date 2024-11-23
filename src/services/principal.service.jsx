import axios from "axios";
import { API_BASE_URL } from "../common/constant";

const API_URL = `${API_BASE_URL}principals/`;

const registerPrincipal = async (
  schoolCode,
  principalName,
  principalMessage
) => {
  try {
    const response = await axios.post(`${API_URL}registerprincipal`, {
      schoolCode,
      principalName,
      principalMessage,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDropdownTeachers = async (school_code) => {
  try {
    const response = await axios.get(
      `${API_URL}getDropdownTeachers/${school_code}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const editPrincipleNotice = async ({ id, body }) => {
  try {
    console.log(id);
    const response = await axios.put(`${API_URL}editprincipaldata/${id}`, body);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createPrincipalMsg = async (body) => {
  try {
    const response = await axios.post(`${API_URL}addprincipalmsg`, body);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPrincipalData = async (code) => {
  try {
    const response = await axios.post(`${API_URL}principal-data`, { code });
    if (response.data.schoolCode) {
      localStorage.setItem("principal", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getStudentsProfile = async (schoolcode) => {
  try {
    const response = await axios.post(`${API_URL}getStudentsProfile`, {
      schoolcode,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTeachersProfile = async (schoolcode) => {
  try {
    const response = await axios.post(`${API_URL}getTeachersProfile`, {
      schoolcode,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const sendPrincipalMessage = async (body) => {
  try {
    const response = await axios.post(`${API_URL}principalmessage`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPrincipalMessage = async (body) => {
  console.log(body,"vsdhfafshdjhdfsafdjasfjadf")
  try {
    console.log(`${API_URL}principalmessage`, body);
    const response = await axios.post(`${API_URL}principalmessage`, body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const editPrincipalMsg = async (user_id, id, data) => {
  try {
    const response = await axios.put(`${API_URL}/principalmessage/${id}`, { ...data, user_id });
    return response.data;
  } catch (error) {
    console.error("Error editing principal message:", error);
    throw error;
  }
};


const getPrincipalPhoto = async (body) => {
  try {
    const response = await axios.post(`${API_URL}getphoto`, body, {
      responseType: "json",
    });
    console.log(response.data,"6453654")

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const principalService = {
  getDropdownTeachers,
  registerPrincipal,
  getPrincipalData,
  getStudentsProfile,
  getTeachersProfile,
  sendPrincipalMessage,
  getPrincipalMessage,
  getPrincipalPhoto,
  editPrincipleNotice,
  editPrincipalMsg,
  createPrincipalMsg,
};

export default principalService;
