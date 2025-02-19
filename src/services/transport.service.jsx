import { API_BASE_URL } from "@/common/constant";
import axios from "axios";
import { toast } from "sonner";
const powerEduAuthToken = localStorage.getItem("powerEduAuthToken");
const token = "Bearer " + JSON.parse(powerEduAuthToken);

const API_URL = API_BASE_URL + "admin/transports/";

const addTransport = async (body) => {
  try {
    const response = await axios.post(`${API_URL}add`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDriversList = async (body) => {
  try {
    const response = await axios.post(`${API_URL}drivers-list`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAllTransports = async (body) => {
  try {
    const response = await axios.post(`${API_URL}all`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteTransports = async (body) => {
  try {
    const response = await axios.post(`${API_URL}delete`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createTransportZone = async (body) => {
  try {
    const response = await axios.post(`${API_URL}zones`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateTransportZoneRoutes = async (id, body) => {
  try {
    const response = await axios.put(`${API_URL}zones/${id}`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createBusRoutesRoute = async (body) => {
  try {
    const response = await axios.post(`${API_URL}routes`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateBusRouter = async (id, body) => {
  try {
    const response = await axios.put(`${API_URL}routes/${id}`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createBus = async (body) => {
  try {
    const response = await axios.post(`${API_URL}buses`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateBus = async (id, body) => {
  try {
    const response = await axios.put(`${API_URL}buses/${id}`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createBusDriverRoute = async (body) => {
  try {
    const response = await axios.post(`${API_URL}drivers`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateDrivers = async (id, body) => {
  try {
    const response = await axios.put(`${API_URL}drivers/${id}`, body, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const TransportService = {
  addTransport,
  getDriversList,
  getAllTransports,
  deleteTransports,
  createTransportZone,
  updateTransportZoneRoutes,
  createBusRoutesRoute,
  updateBusRouter,
  createBus,
  updateBus,
  createBusDriverRoute,
  updateDrivers,
};

export default TransportService;