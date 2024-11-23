import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE_URL } from "@/common/constant";

// Base URL configuration from environment variable
const API_URL = API_BASE_URL+"notifications/";

// Axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: authHeader(),
});

const createNotification = async (title, notiDesc, users) => {
  try {
    const response = await apiClient.post('/notifications/', { title, notiDesc, users });
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to create notification');
  }
};

const updateNotificationRead = async (notificationId, flag, userId) => {
  try {
    const response = await apiClient.put(`/notifications/${notificationId}`, { notificationId, flag, userId });
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to update notification status');
  }
};

const fetchNotificationByUserId = async (userId) => {
  try {
    const response = await apiClient.get(`/notifications/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to fetch notifications by user ID');
  }
};

const addNewDeviceToken = async (userId, newToken) => {
  try {
    const response = await apiClient.put('/addNewToken', { userId, newToken });
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to add new device token');
  }
};

const fetchDeviceTokens = async (userId) => {
  try {
    const response = await apiClient.get(`/getTokens/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to fetch device tokens');
  }
};

// Centralized error handler
const handleError = (error, message) => {
  console.error(`${message}: ${error.message}`);
  throw new Error(message);
};

const NotificationService = {
  createNotification,
  updateNotificationRead,
  fetchNotificationByUserId,
  addNewDeviceToken,
  fetchDeviceTokens
};

export default NotificationService;