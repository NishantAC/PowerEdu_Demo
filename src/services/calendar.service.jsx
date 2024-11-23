import axios from "axios";
import { API_BASE_URL } from "../common/constant";
import authHeader from "./auth-header";

const API_URL = API_BASE_URL + "calendar/";

//get all events
const getEvents = async (body) => {
  const events = await axios.post(API_URL + "getevents", body);
  return events;
};

const getEventsForManagement = async (school_code) => {
  const events = await axios.get(
    `${API_URL}getEventsForManagement/${school_code}`
  );
  return events;
};

const addEvent = async (body) => {
  const res = await axios.post(API_URL + "create", body);
  return res;
};

const editEvent = async (id, body) => {
  const res = await axios.put(`${API_URL}update/${id}`, body);
  return res;
};

const deleteEvent = async (id) => {
  const res = await axios.delete(`${API_URL}delete/${id}`);
  return res;
};

const getGoogleEvents = async () => {
  const events = await axios.get(`${API_URL}getevents`, {
    headers: authHeader(),
    withCredentials: true,
  });
  return events;
};

const CalendarServices = {
  getEvents,
  getEventsForManagement,
  addEvent,
  editEvent,
  deleteEvent,
  getGoogleEvents,
};

export default CalendarServices;
