import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE_URL } from "@/common/constant";

const API_URL = API_BASE_URL;


export const googleAuth = async () => {
  const googleAccessToken = localStorage.getItem("googleAccessToken");
  try {
    const response = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    });
    
    return response;
  } catch (error) {
    throw error;
  }
};

export const logoutGoogle = async () => {
  const token = JSON.parse(localStorage.getItem("powerEduAuthToken"));
  try {
    const response = await axios.get(`${API_URL}admin/gmail/logout/google`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Logout response", response?.data?.data);
    localStorage.removeItem("googleAccessToken");
    return response;
  } catch (error) {
    
    throw error;
  }
};

export const checkAuth = async () => {
  const powerEduAuthToken = JSON.parse(localStorage.getItem("powerEduAuthToken"));

  try {
    const response = await axios.get(`${API_URL}admin/gmail/check-auth`, {
      headers: {
        Authorization: `Bearer ${powerEduAuthToken}`,
      },
    });
    console.log("Check auth response", response?.data?.data);
    return response;
  } catch (error) {
    console.error("Check auth error:", error); // Ensure error is logged properly
  }
};

export const getInbox = async () => {
  try {
    const response = await axios.post(`${API_URL}admin/gmail/get-inbox`,{}, 
{
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("powerEduAuthToken"))}`,
      }
    });
    return { response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error };
  }
};


export const sendMail = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}send`, formData, {
      headers: authHeader(),
      withCredentials: true,
    });
    return { response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error };
  }
};

export const createDraft = async (body) => {
  try {
    const response = await axios.post(`${API_URL}add-draft`, body, {
      headers: authHeader(),
      withCredentials: true,
    });
    return { response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error };
  }
};

export const forwardMail = async (body) => {
  try {
    const response = await axios.post(`${API_URL}forward`, body, {
      headers: authHeader(),
      withCredentials: true,
    });
    return { response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error };
  }
};

export const addStarred = async (id) => {
  try {
    const response = await axios.post(`${API_URL}add-starred`, 
      
      { id }
      , {
      headers: authHeader(),
      withCredentials: true,
      
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getStarred = async (body) => {
  try {
    const response = await axios.post(`${API_URL}get-starred`, body, {
      headers: authHeader(),
      withCredentials: true,
    });
    return { response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error };
  }
};

export const getDraftMails = async (body) => {
  try {
    const response = await axios.post(`${API_URL}get-drafts`, body, {
      headers: authHeader(),
      withCredentials: true,
    });
    return { response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error };
  }
};

export const getSentMails = async (body) => {
  try {
    const response = await axios.post(`${API_URL}admin/gmail/get-sent`,{}, 
{
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("powerEduAuthToken"))}`,
      }
    });
    return { response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error };
  }
};

export const getTrashMails = async (body) => {
  try {
    const response = await axios.post(`${API_URL}get-trashed`, body, {
      headers: authHeader(),
      withCredentials: true,
    });
    return { response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error };
  }
};

export const getThread = async (body) => {
  try {
    const response = await axios.post(`${API_URL}get-thread`, body, {
      headers: authHeader(),
      withCredentials: true,
    });
    return { response, error: null };
  } catch (error) {
    console.error(error);
    return { response: null, error };
  }
};

export const replyToMail = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}reply`, formData, {
      headers: authHeader(),
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllUsername = async ({ name, school_id }) => {
  try {
    const result = await axios.get(
      `${API_URL}fetchallname/${name}/?school_id=${school_id}`
    );
    return result.data;
  } catch (err) {
    
  }
};

export const fetchAllReceivedMail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}fetchreceivedmail/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllSentMail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}fetchsentmail/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllDraftMail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}fetchdraftmail/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const MakefavouriteMail = async (id) => {
  try {
    const response = await axios.put(`${API_URL}makemailfav/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllFavMail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}fetchfavmail/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteMail = async (id) => {
  try {
    const response = await axios.put(`${API_URL}delete-mail/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllDeletedMail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}fetchdeletedmail/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const undoDeletedMail = async (id) => {
  try {
    const response = await axios.put(`${API_URL}undodeletedmail/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchRecentContact = async (id) => {
  try {
    const response = await axios.get(`${API_URL}fetchrecentcontact/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllMails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}fetchallmaildata/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const setReadMail = async (id) => {
  try {
    const response = await axios.put(`${API_URL}setreadmail/${id}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMail = async (body) => {
  try {
    const response = await axios.post(`${API_URL}get`, body, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    
    throw error;
  }
};

export const getMails = async (body) => {
  try {
    const response = await axios.post(`${API_URL}get-all`, body, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    
    throw error;
  }
};

export const draftMail = () => {};
