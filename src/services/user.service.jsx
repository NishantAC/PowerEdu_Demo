import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE_URL } from "@/common/constant";

const API_URL = API_BASE_URL+"test/";

const getStudentBoard = () => {
  return axios.get(API_URL + "student", { headers: authHeader() });
};

const getTeacherBoard = () => {
  return axios.get(API_URL + "teacher", { headers: authHeader() });
};

const getClassTeacherBoard = () => {
  return axios.get(API_URL + "class_teacher", { headers: authHeader() });
};

const getPrincipalBoard = () => {
  return axios.get(API_URL + "principal", { headers: authHeader() });
};

const getAccountBoard = () => {
  return axios.get(API_URL + "account", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getMasterBoard = () => {
  return axios.get(API_URL + "master", { headers: authHeader() });
};


const userService = {
  getStudentBoard,
  getTeacherBoard,
  getClassTeacherBoard,
  getPrincipalBoard,
  getAccountBoard,
  getAdminBoard,
  getMasterBoard
};

export default userService;
