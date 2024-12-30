import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE_URL } from "@/common/constant";

const API_URL = API_BASE_URL+"mail/";

export const googleAuth = async (body) => {
  try {
    const response = await axios.post(`${API_URL}auth/google`, body, {
      
      withCredentials: true,
    });
    
    return response;
  } catch (error) {
    
    throw error;
  }
};

export const logoutGoogle = async () => {
  try {
    const response = await axios.get(`${API_URL}logout/google`, {
      headers: authHeader(),
      withCredentials: true,
    });
    return response;
  } catch (error) {
    
    throw error;
  }
};

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}check-auth`, {
      headers: authHeader(),
      withCredentials: true,
    });
    return response;
  } catch (error) {
    
    
    throw error;
    
  }
};

export const getInbox = async (body) => {
  try {
    const response = await axios.post(`${API_URL}get-inbox`, body, {
      headers: authHeader(),
      withCredentials: true,
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
    const response = await axios.post(`${API_URL}get-sent`, body, {
      headers: authHeader(),
      withCredentials: true,
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

export const fetchAllUsername = async ({ name, schoolcode }) => {
  try {
    const result = await axios.get(
      `${API_URL}fetchallname/${name}/?schoolcode=${schoolcode}`
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
